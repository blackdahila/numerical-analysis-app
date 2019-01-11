import * as bodyParser from 'body-parser';
import { ServerRoutes } from 'common';
import cors from 'cors';
import express from 'express';
import morganBody from 'morgan-body';
import { AddressInfo } from 'net';
import swaggerUi from 'swagger-ui-express';

import * as auth from './auth';
import {
  validateLoginUserRequest,
  validateNewAccountRequest,
} from './auth/validation';
import * as groups from './groups';
import {
  validateAddMeetingRequest,
  validateAddPresenceRequest,
  validateAddStudentToGroupRequest,
  validateCreateGroupRequest,
  validateDeleteGroupRequest,
  validateDeleteMeetingRequest,
  validateDeletePresenceRequest,
  validateGetMeetingsDetailsRequest,
  validateListStudentsForGroupRequest,
  validateSetActivityRequest,
  validateUpdateMeetingRequest,
  validateUploadRequest,
} from './groups/validation';
import * as swaggerDocument from './swagger.json';
import * as users from './users';
import {
  validateAddRequest,
  validateDeleteRequest,
  validateUpdateRequest,
} from './users/validation';

const PORT = process.env.PORT;

const app = express();

morganBody(app);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { Users, Groups, Accounts } = ServerRoutes;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post(
  Accounts.New,
  validateNewAccountRequest,
  auth.checkNewAccountToken,
  auth.storeUserPassword
);
app.post(Accounts.Login, validateLoginUserRequest, auth.loginUser);

app.get(Users.List, auth.authorize, users.list);
app.post(Users.Create, auth.authorize, validateAddRequest, users.create);
app.post(Users.Update, auth.authorize, validateUpdateRequest, users.update);
app.delete(
  Users.Delete,
  auth.authorize,
  validateDeleteRequest,
  users.deleteUser
);

// Groups
app.post(
  Groups.Create,
  auth.authorize,
  validateCreateGroupRequest,
  groups.create
);
app.post(
  Groups.Upload,
  auth.authorize,
  validateUploadRequest,
  groups.upload,
  auth.sendMagicLinks
);
app.get(Groups.List, auth.authorize, groups.list);
app.get(
  Groups.Students.List,
  auth.authorize,
  validateListStudentsForGroupRequest,
  groups.listStudentsForGroup
);
app.delete(
  Groups.Delete,
  auth.authorize,
  validateDeleteGroupRequest,
  groups.deleteGroup
);

app.post(
  Groups.Students.AddToGroup,
  auth.authorize,
  validateAddStudentToGroupRequest,
  groups.addStudentToGroup
);

app.get(Groups.Meetings.List, auth.authorize, groups.listMeetings);
app.post(
  Groups.Meetings.Create,
  auth.authorize,
  validateAddMeetingRequest,
  groups.addMeeting
);
app.post(
  Groups.Meetings.Update,
  auth.authorize,
  validateUpdateMeetingRequest,
  groups.updateMeeting
);
app.delete(
  Groups.Meetings.Delete,
  auth.authorize,
  validateDeleteMeetingRequest,
  groups.deleteMeeting
);
app.get(
  Groups.Meetings.Details,
  auth.authorize,
  validateGetMeetingsDetailsRequest,
  groups.getMeetingsDetails
);
app.post(
  Groups.Meetings.AddPresence,
  auth.authorize,
  validateAddPresenceRequest,
  groups.addPresence
);
app.delete(
  Groups.Meetings.DeletePresence,
  auth.authorize,
  validateDeletePresenceRequest,
  groups.deletePresence
);
app.post(
  Groups.Meetings.SetActivity,
  auth.authorize,
  validateSetActivityRequest,
  groups.setActivity
);
app.get(Groups.Get, auth.authorize, groups.get);

const listener = app.listen(PORT, () => {
  console.log(
    `Your app is listening on port: ${(listener.address() as AddressInfo).port}`
  );
});
