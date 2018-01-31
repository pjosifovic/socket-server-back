import {start} from './lib/server';

start({PORT: process.env.PORT, MONGO_URI: process.env.MONGO_URI});