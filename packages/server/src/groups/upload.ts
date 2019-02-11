import { apiMessages, CSV_DELIMITER, UserDTO, UserRole } from 'common';
import { NextFunction, Response } from 'express';
import * as codes from 'http-status-codes';
import * as t from 'io-ts';

import { GetRequest } from '../lib/request';
import { db } from '../store';
import { connection } from '../store/connection';

const UploadBodyV = t.type({
  data: t.string,
  group_id: t.string,
});

type UploadRequest = GetRequest<typeof UploadBodyV>;

export const upload = (
  req: UploadRequest,
  res: Response,
  next: NextFunction
) => {
  const { users, isValid } = readCSV(req.body.data);
  if (!isValid) {
    res
      .status(codes.PRECONDITION_FAILED)
      .send({ error: apiMessages.invalidCSV });
    return;
  }
  if (!users || !users.length) {
    res.status(codes.PRECONDITION_FAILED).send({ error: apiMessages.emptyCSV });
    return;
  }

  const groupId = req.body.group_id;
  connection.beginTransaction(beginError => {
    if (beginError) {
      res
        .status(codes.INTERNAL_SERVER_ERROR)
        .send({ error: apiMessages.internalError });
      return;
    }
    users.forEach(user => {
      db.upsertUser(user, upsertErr => {
        if (upsertErr) {
          connection.rollback(() =>
            res
              .status(codes.INTERNAL_SERVER_ERROR)
              .send({ error: apiMessages.internalError })
          );
          return;
        }
        db.attachStudentToGroup(
          { email: user.email, groupId: groupId },
          attachErr => {
            if (attachErr) {
              console.error(attachErr);
              connection.rollback(() =>
                res
                  .status(codes.INTERNAL_SERVER_ERROR)
                  .send({ error: apiMessages.internalError })
              );
              return;
            }
          }
        );
      });
    });
    connection.commit(commitErr => {
      if (commitErr) {
        console.error(commitErr);
        connection.rollback(() =>
          res
            .status(codes.INTERNAL_SERVER_ERROR)
            .send({ error: apiMessages.internalError })
        );
      }
      res.status(codes.OK).send({ message: apiMessages.usersUploaded });
      return next();
    });
  });
};

const isCSVRowValid = (line: string) => {
  const values = line.split(CSV_DELIMITER);
  return values.length === 4 && values.every(value => value !== '');
};

// csv format: name, surname, index, email
type NewUser = Pick<
  UserDTO,
  'email' | 'student_index' | 'user_name' | 'user_role'
>;
const readCSV = (
  csvString: string
): { users?: NewUser[]; isValid: boolean } => {
  const lines = csvString.trim().split('\n');
  if (!lines.every(isCSVRowValid)) {
    return { isValid: false };
  }

  const users: NewUser[] = [];
  lines.forEach(line => {
    const values = line.split(CSV_DELIMITER);
    const user = {
      email: values[3],
      student_index: values[2],
      user_name: `${values[0]} ${values[1]}`,
      user_role: UserRole.student,
    };
    users.push(user);
  });
  return { users, isValid: true };
};