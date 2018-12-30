import { GROUPS } from './groups';

export interface ApiResponse {
  message?: string;
  error?: string;
}

// TODO: function l<T extends string>(s: T): T;

export const Routes = {
  Accounts: {
    Login: '/accounts/login',
    New: '/accounts/new',
  },
  Groups: {
    Create: '/groups/create',
    Delete: '/groups/delete',
    Get: '/groups/:id',
    List: '/groups',
    Meetings: {
      Create: '/groups/meetings.create',
      Delete: '/groups/meetings.delete',
      Details: '/groups/meetings.details',
      List: '/groups/meetings',
    },
    Students: {
      AddToGroup: '/groups/students.add',
      List: '/groups/students',
      RemoveFromGroup: '/groups/students.delete',
    },
    Upload: '/groups/upload',
  },
  Users: {
    Create: '/users/create',
    Delete: '/users/delete',
    List: '/users',
    Update: '/users/update',
  },
};

export type UserDTO = {
  id: string;
  user_name: string;
  email: string;
  student_index?: string;
  user_role: string;
};

export type Pagination = {
  offset: number;
  limit: number;
};

export type GroupDTO = {
  id: string;
  group_name: string;
  group_type: GROUPS;
  academic_year?: string;
  data?: Record<string, unknown>;
};

export enum GroupEnumUI { // TODO: Move this to component / presentational helper or sth like that
  Exercise = 'Ćwiczenia',
  Lab = 'Pracownia',
  Lecture = 'Wykład',
}

export type MeetingDTO = {
  id: number;
  meeting_name: string;
  date: string;
  group_id: number;
};
