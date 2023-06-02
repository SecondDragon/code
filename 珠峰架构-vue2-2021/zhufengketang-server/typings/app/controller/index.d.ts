// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApiLessonList from '../../../app/controller/api/lessonList';
import ExportApiSlider from '../../../app/controller/api/slider';
import ExportUserLogin from '../../../app/controller/user/login';
import ExportUserReg from '../../../app/controller/user/reg';
import ExportUserReset from '../../../app/controller/user/reset';

declare module 'egg' {
  interface IController {
    api: {
      lessonList: ExportApiLessonList;
      slider: ExportApiSlider;
    }
    user: {
      login: ExportUserLogin;
      reg: ExportUserReg;
      reset: ExportUserReset;
    }
  }
}
