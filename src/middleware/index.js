'use strict';

import cors from 'cors';
import {Router} from 'express';
import catchAll from './catch-all';
import authRouter from './router-auth';
import errorHandler from './error-handler';
import reqReporter from './request-reporter';
import bindResponseMethods from './bind-response-methods';

export default new Router()
  .use([
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    }),
    reqReporter,
    bindResponseMethods,
    authRouter,
    catchAll,
    errorHandler,
  ]);