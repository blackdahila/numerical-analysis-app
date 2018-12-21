export const upsertUserQuery = `
  INSERT IGNORE INTO
    users (
      user_name,
      email,
      user_role,
      student_index
    )
  VALUES ?
`;

export const getUserRoleQuery = `
  SELECT user_role FROM users WHERE email = ?;
`;

export const listGroupsQuery = `
  SELECT
    id,
    group_name,
    group_type,
    academic_year,
    class,
    data
  FROM
    \`groups\`
  ORDER BY created_at DESC
`;

export const listStudentsForGroupQuery = `
  SELECT
    id, user_name, email, student_index
  FROM
    users as u
  WHERE id IN (
    SELECT
      user_id
    FROM
      user_belongs_to_group
    WHERE
      group_id = ?
  );
`;

export const deleteStudentFromGroupQuery = `
  DELETE FROM user_belongs_to_group WHERE user_id = ?;
`;

export const prepareAttachStudentToGroupQuery = (userEmails: string[], groupId: string) => `
  INSERT IGNORE INTO user_belongs_to_group(user_id, group_id)
  VALUES ${userEmails
    .map(email => `((SELECT id FROM users WHERE email = "${email}"), ${groupId})`)
    .join(',')};
`;
