import { GROUPS } from './groups';
export interface ApiResponse {
    message?: string;
    error?: string;
}
export declare const Routes: {
    Accounts: {
        Login: string;
        New: string;
    };
    Groups: {
        Create: string;
        Delete: string;
        Get: string;
        List: string;
        Meetings: {
            AddPresence: string;
            Create: string;
            Delete: string;
            DeletePresence: string;
            Details: string;
            List: string;
            SetActivity: string;
        };
        Students: {
            AddToGroup: string;
            List: string;
            RemoveFromGroup: string;
        };
        Upload: string;
    };
    Users: {
        Create: string;
        Delete: string;
        List: string;
        Update: string;
    };
};
export declare type UserDTO = {
    id: string;
    user_name: string;
    email: string;
    student_index?: string;
    user_role: string;
};
export declare type Pagination = {
    offset: number;
    limit: number;
};
export declare type GroupDTO = {
    id: string;
    group_name: string;
    group_type: GROUPS;
    academic_year?: string;
    data?: Record<string, unknown>;
};
export declare enum GroupEnumUI {
    Exercise = "\u0106wiczenia",
    Lab = "Pracownia",
    Lecture = "Wyk\u0142ad"
}
export declare type MeetingDTO = {
    id: number;
    meeting_name: string;
    date: string;
    group_id: number;
};
export declare type Student = Pick<UserDTO, 'id' | 'user_name' | 'student_index'>;
export declare type MeetingId = MeetingDTO['id'];
export declare type StudentPresences = Set<MeetingId>;
export declare type StudentActivities = Record<MeetingId, number>;
export declare type MeetingDetailsDTO = {
    data: {
        presences: Array<MeetingDTO['id']>;
        activities: StudentActivities;
    };
    student: Student;
};
export declare type MeetingDetailsModel = {
    data: {
        presences: StudentPresences;
        activities: StudentActivities;
    };
    student: Student;
};
