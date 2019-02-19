import { GroupDTO, GroupWithLecturer, TaskDTO, UserDTO } from 'common';
import { Omit } from 'lodash';

import { connection } from '../connection';

import { QueryCallback } from './QueryCallback';

type DbExtractedGroup = Omit<GroupWithLecturer, 'data'> & { data: string };

export const getGroup = (
  { groupId }: { groupId: GroupDTO['id'] },
  callback: QueryCallback<[DbExtractedGroup]>
) =>
  connection.query(
    {
      sql: `
      SELECT g.*, u.user_name as lecturer_name
      FROM \`groups\` g
      JOIN
        users u ON (g.lecturer_id = u.id)
      WHERE
        g.id = ?;`,
      values: [groupId],
    },
    callback
  );

export const addGroup = (
  group: Pick<
    GroupDTO,
    'group_name' | 'group_type' | 'academic_year' | 'lecturer_id'
  >,
  callback: QueryCallback
) =>
  connection.query(
    {
      sql: `INSERT INTO
        \`groups\` (group_name, group_type, academic_year, lecturer_id)
      VALUES (?, ?, ?, ?)`,
      values: [
        group.group_name,
        group.group_type,
        group.academic_year,
        group.lecturer_id,
      ],
    },
    callback
  );

export const updateGroup = (
  group: Pick<
    GroupDTO,
    | 'group_name'
    | 'group_type'
    | 'academic_year'
    | 'lecturer_id'
    | 'id'
    | 'data'
  >,
  callback: QueryCallback
) =>
  connection.query(
    {
      sql: `
  UPDATE \`groups\` SET
    group_name = ?,
    group_type = ?,
    academic_year = ?,
    lecturer_id = ?,
    data = ?
  WHERE id = ?;
  `,
      values: [
        group.group_name,
        group.group_type,
        group.academic_year,
        group.lecturer_id,
        JSON.stringify(group.data),
        group.id,
      ],
    },
    callback
  );

export const deleteGroup = (
  { groupId }: { groupId: GroupDTO['id'] },
  callback: QueryCallback
) =>
  connection.query(
    {
      sql: 'DELETE FROM `groups` WHERE id = ?',
      values: [groupId],
    },
    callback
  );

export const listUsersWithGroup = (
  callback: QueryCallback<(UserDTO & { group_ids: string })[]>
) =>
  connection.query(
    {
      sql: `
      SELECT
        DISTINCT id, user_name, email, student_index, GROUP_CONCAT(group_id) as group_ids
      FROM
        users AS u
      LEFT JOIN user_belongs_to_group AS ug
      ON (u.id = ug.user_id)
      WHERE user_role = "student"
      GROUP BY u.id;
      `,
    },
    callback
  );

export const deleteFromGroup = (
  {
    userId,
    groupId,
  }: {
    userId: UserDTO['id'];
    groupId: GroupDTO['id'];
  },
  callback: QueryCallback
) =>
  connection.query(
    {
      sql:
        'DELETE FROM user_belongs_to_group WHERE user_id = ? AND group_id = ?;',
      values: [userId, groupId],
    },
    callback
  );

export const listGroups = (callback: QueryCallback<GroupDTO[]>) =>
  connection.query(
    {
      sql: `
  SELECT
    *
  FROM
    \`groups\`
  ORDER BY created_at DESC`,
    },
    callback
  );

export const listTasksForGroup = (
  {
    groupId,
  }: {
    groupId: GroupDTO['id'];
  },
  callback: QueryCallback<TaskDTO[]>
) =>
  connection.query(
    {
      sql: `
  SELECT t.*
  FROM tasks t
  JOIN group_has_task ght
  ON (t.id = ght.task_id)
  WHERE ght.group_id =?`,
      values: [groupId],
    },
    callback
  );

export const deleteTaskFromGroup = (
  {
    groupId,
    taskId,
  }: {
    groupId: GroupDTO['id'];
    taskId: TaskDTO['id'];
  },
  callback: QueryCallback
) =>
  connection.query(
    {
      sql: 'DELETE FROM group_has_task WHERE task_id = ? AND group_id = ?;',
      values: [taskId, groupId],
    },
    callback
  );

export const insertTask = (
  task: Omit<TaskDTO, 'id' | 'weight'>,
  callback: QueryCallback
) =>
  connection.query(
    {
      sql: `
    INSERT INTO
      tasks(name, description, kind, max_points, verify_upload, results_date, end_upload_date, start_upload_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `,
      values: [
        task.name,
        task.description,
        task.kind,
        task.max_points,
        task.verify_upload,
        task.results_date,
        task.end_upload_date,
        task.start_upload_date,
      ],
    },
    callback
  );

export const attachTaskToGroup = (
  {
    taskId,
    groupId,
    weight,
  }: {
    taskId: TaskDTO['id'];
    groupId: GroupDTO['id'];
    weight: TaskDTO['weight'];
  },
  callback: QueryCallback
) =>
  connection.query(
    {
      sql:
        'INSERT INTO group_has_task(group_id, task_id, weight) VALUES (?, ?, ?);',
      values: [groupId, taskId, weight],
    },
    callback
  );
