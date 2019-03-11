import { apiMessages, ApiResponse, GroupType } from 'common';
import * as codes from 'http-status-codes';
import * as t from 'io-ts';

import { BackendResponse, handleBadRequest, PostRequest } from '../../lib';
import { db } from '../../store';

const CreateGroupBodyV = t.type({
  academic_year: t.union([t.string, t.undefined]),
  group_name: t.string,
  group_type: t.union([
    t.literal(GroupType.Exercise),
    t.literal(GroupType.Lab),
    t.literal(GroupType.Lecture),
  ]),
  lecturer_id: t.number,
});

type CreateGroupRequest = PostRequest<typeof CreateGroupBodyV>;

export const create = (
  req: CreateGroupRequest,
  res: BackendResponse<ApiResponse | { group_id: string }>
) => {
  handleBadRequest(CreateGroupBodyV, req.body, res).then(() => {
    const group = req.body;

    db.addGroup(group, (err, result) => {
      if (err) {
        return res.status(codes.INTERNAL_SERVER_ERROR).send({
          error: apiMessages.internalError,
          error_details: err.message,
        });
      }

      return res
        .status(codes.OK)
        .send({ message: apiMessages.groupCreated, group_id: result.insertId });
    });
  });
};