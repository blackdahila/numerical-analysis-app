import { GroupDTO, MeetingDTO, UserDTO } from 'common';
import { MysqlError } from 'mysql';

import { connection } from '../connection';

import { QueryCallback } from './QueryCallback';

type GetPresencesCallback = (
  err: MysqlError | null,
  results: {
    id: UserDTO['id'];
    user_name: UserDTO['user_name'];
    student_index: UserDTO['student_index'];
    presences: string;
  }[]
) => void;
export const getPresencesInGroup = (
  { groupId }: { groupId: GroupDTO['id'] },
  callback: GetPresencesCallback
) =>
  connection.query(
    {
      sql: /* sql */ `
        SELECT
          id,
          user_name,
          student_index,
          GROUP_CONCAT(user_attended_in_meeting.meeting_id) AS presences
        FROM
          users
          LEFT JOIN user_attended_in_meeting ON (users.id = user_attended_in_meeting.user_id)
        WHERE
          id IN (SELECT user_id from user_belongs_to_group where group_id = ?)
        GROUP BY
          id;
      `,
      values: [groupId],
    },
    callback
  );

export const getActivitiesInGroup = (
  { groupId }: { groupId: GroupDTO['id'] },
  callback: QueryCallback<
    { id: UserDTO['id']; meeting_id: MeetingDTO['id']; points: string }[]
  >
) =>
  connection.query(
    {
      sql: /* sql */ `
        SELECT
          id,
          meeting_id,
          points
        FROM
          users
          LEFT JOIN user_was_active_in_meeting ON (users.id = user_was_active_in_meeting.user_id)
        WHERE
          id IN (SELECT user_id FROM user_belongs_to_group where group_id = ?);
      `,
      values: [groupId],
    },
    callback
  );

export const addPresence = (
  { userId, meetingId }: { userId: UserDTO['id']; meetingId: MeetingDTO['id'] },
  callback: QueryCallback
) =>
  connection.query(
    {
      sql: /* sql */ `INSERT IGNORE INTO user_attended_in_meeting (user_id, meeting_id) VALUES (?, ?);`,
      values: [userId, meetingId],
    },
    callback
  );

export const deletePresence = (
  { userId, meetingId }: { userId: UserDTO['id']; meetingId: MeetingDTO['id'] },
  callback: QueryCallback
) =>
  connection.query(
    {
      sql: /* sql */ `DELETE FROM user_attended_in_meeting WHERE user_id = ? AND meeting_id = ?`,
      values: [userId, meetingId],
    },
    callback
  );
