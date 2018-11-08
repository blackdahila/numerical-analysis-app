import * as qs from 'query-string';
import { ApiResponse, ROUTES, UserDTO } from '../../../common/api';
import { SERVER_URL } from './urls';

const { USERS } = ROUTES;

export const listUsers = async (
  search_param: string | undefined,
  roles: string[] | undefined
): Promise<UserDTO[]> => {
  const response = await fetch(
    SERVER_URL +
      ROUTES.USERS.list +
      qs.stringify({
        search_param: search_param,
        role: roles,
      }),
    {
      method: 'GET',
    }
  );
  return response.json();
};

export const addUser = async (user: UserDTO): Promise<ApiResponse> => {
  const response = await fetch(SERVER_URL + USERS.add, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const deleteUser = async (email: string): Promise<ApiResponse> => {
  const response = await fetch(SERVER_URL + USERS.delete + qs.stringify({ email }), {
    method: 'GET',
  });
  return response.json();
};

export const updateUser = async (user: UserDTO): Promise<ApiResponse> => {
  const response = await fetch(SERVER_URL + USERS.update, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};