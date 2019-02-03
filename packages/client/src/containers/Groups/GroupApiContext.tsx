import {
  ApiResponse,
  GroupDTO,
  MeetingDetailsModel,
  MeetingDTO,
  UserDTO,
} from 'common';
import { Moment } from 'moment';
import * as React from 'react';

export type GroupContextState = {
  apiActions: {
    listSuperUsers: () => void;
    createGroup: ({
      academic_year,
      group_name,
      group_type,
      lecturer_id,
    }: Pick<
      GroupDTO,
      'academic_year' | 'group_name' | 'group_type' | 'lecturer_id'
    >) => void;
    getGroup: () => void;
    listGroups: () => void;
    deleteGroup: (groupId: GroupDTO['id']) => void;
    setActivity: (
      studentId: number,
      meetingId: number,
      points: number
    ) => Promise<ApiResponse>;
    addPresence: (studentId: number, meetingId: number) => Promise<ApiResponse>;
    deletePresence: (
      studentId: number,
      meetingId: number
    ) => Promise<ApiResponse>;
    listMeetings: () => void;
    getMeetingsDetails: () => void;
    addMeeting: (values: { name: string; date: Moment }) => Promise<void>;
    deleteMeeting: (id: MeetingDTO['id']) => Promise<void>;
    updateMeeting: (
      values: Pick<MeetingDTO, 'id' & 'name' & 'date'>
    ) => Promise<void>;
  };
  actions: {
    goToGroupsPage: () => void;
    setMeetingDetails: (details: MeetingDetailsModel[]) => void;
  };
  meetings?: MeetingDTO[];
  meetingsDetails?: MeetingDetailsModel[];
  groups?: GroupDTO[];
  currentGroup?: GroupDTO;
  isLoading: boolean;
  error: boolean;
  errorMessage?: string;
  superUsers: UserDTO[];
};

export const GroupApiContext = React.createContext<GroupContextState>({
  actions: {
    goToGroupsPage: console.log.bind(console, 'goToGroupsPage'),
    setMeetingDetails: console.log.bind(console, 'setMeetingDetails'),
  },
  apiActions: {
    addMeeting: (_: any) => ({} as Promise<void>),
    addPresence: (_: any) => ({} as Promise<ApiResponse>),
    createGroup: console.log.bind(console, 'createGroup'),
    deleteGroup: console.log.bind(console, 'deleteGroup'),
    deleteMeeting: (_: any) => ({} as Promise<void>),
    deletePresence: (_: any) => ({} as Promise<ApiResponse>),
    getGroup: console.log.bind(console, 'getGroup'),
    getMeetingsDetails: console.log.bind(console, 'getMeetingsDetails'),
    listGroups: console.log.bind(console, 'listGroups'),
    listMeetings: console.log.bind(console, 'listMeetings'),
    listSuperUsers: console.log.bind(console, 'listSuperUsers'),
    setActivity: (_: any) => ({} as Promise<ApiResponse>),
    updateMeeting: (_: any) => ({} as Promise<void>),
  },
  error: false,
  isLoading: false,
  superUsers: [],
});
