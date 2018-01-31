'use strict';

import * as db from './db';
import express from 'express';
import middleware from '../middleware';
import {log} from './util';

const app = express().use(middleware);
const state = {
  isOn: false,
  http: null,
};

export const start = () => {
  return new Promise((resolve, reject) => {
    if(state.isOn)
      return reject(new Error('__ERROR__ Server is already on'));

    state.isOn = true;
    db.start()
      .then(() => {
        state.http = app.listen(process.env.PORT, () => {
          log(`__SERVER_UP__ ${process.env.PORT}`);
          resolve();
        });
      })
      .catch(reject);
  });
};

export const stop = () => {
  return new Promise((resolve, reject) => {
    if(!state.isOn)
      return reject(new Error('__ERROR__ Server is already off'));

    return db.stop()
      .then(() => {
        state.http.close(() => {
          log('__SERVER_DOWN__');
          state.isOn = false;
          state.http = null;
          resolve();
        });
      })
      .catch(reject);
  });
};