import { Request, Response } from 'express';
import * as codes from 'http-status-codes';

import { MeetingDTO, UserDTO } from 'common';
import { apiMessages } from 'common';
import { db } from '../../store';

interface AddPresenceRequest extends Request {
  body: {
    meeting_id: MeetingDTO['id'];
    student_id: UserDTO['id'];
  };
}
export const addPresence = (req: AddPresenceRequest, res: Response) => {
  const { meeting_id, student_id } = req.body;

  db.addPresence({ userId: student_id, meetingId: meeting_id }, err => {
    if (err) {
      console.error(err);
      res
        .status(codes.INTERNAL_SERVER_ERROR)
        .send({ error: apiMessages.internalError });
      return;
    }
    res.status(codes.OK).send({ message: apiMessages.presenceAdded });
  });
};
