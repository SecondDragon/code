// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/middleware/auth';

declare module 'egg' {
  interface IMiddleware {
    auth: typeof ExportAuth;
  }
}
