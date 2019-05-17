import { ServerRoutes, UserRole } from 'common';
import { Router } from 'express';

import { auth } from '../../middleware';

import { setTaskPoints } from './set';
import { GetGrades } from './get';

const { Grades } = ServerRoutes;
export const router = Router();

router.post(
  Grades,
  auth.authorize([UserRole.Admin, UserRole.SuperUser]),
  setTaskPoints
);

router.get(
  Grades,
  auth.authorize([UserRole.Admin, UserRole.SuperUser]),
  GetGrades
);
