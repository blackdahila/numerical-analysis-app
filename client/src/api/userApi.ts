import * as qs from 'query-string';

import { ROUTES, UserDTO } from '../../../common/api';
import { showMessage } from '../utils/message';

import { SERVER_URL } from './urls';

const { USERS } = ROUTES;

const LIMIT = 10;

export const listUsers = async (
  searchParam: string | undefined,
  roles: string[] | undefined,
  currentPage: number
): Promise<{ users: UserDTO[]; total: string }> => {
  const response = await fetch(
    `${SERVER_URL}${ROUTES.USERS.list}?${qs.stringify({
      roles,
      limit: LIMIT,
      offset: (currentPage - 1) * LIMIT,
      search_param: searchParam,
    })}`,
    {
      method: 'GET',
    }
  );
  return response.json();
};

export const addUser = async (user: UserDTO) => {
  const response = await fetch(SERVER_URL + USERS.add, {
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  response.json().then(res => showMessage(res));
};

export const deleteUser = async (id: string) => {
  const response = await fetch(SERVER_URL + USERS.delete, {
    body: JSON.stringify({ id }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
  response.json().then(res => showMessage(res));
};

export const updateUser = async (user: UserDTO) => {
  const response = await fetch(SERVER_URL + USERS.update, {
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  response.json().then(res => showMessage(res));
};

export const uploadUsers = async (base64file: string) => {
  const response = await fetch(SERVER_URL + USERS.upload, {
    body: JSON.stringify({ data: base64file }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  return response.json();
};
