import {log} from '../lib/util';

export default (error, request, response, next) => { // eslint-disable-line
  log(error);

  if(error.status)
    return response.sendStatus(error.status);

  error.message = error.message.toLowerCase();

  if(error.message.includes('validation failed'))
    return response.sendStatus(400);
  
  if(error.message.includes('duplicate key'))
    return response.sendStatus(409);
  
  if(error.message.includes('objectid failed'))
    return response.sendStatus(404);
  
  if(error.message.includes('unauthorized'))
    return response.sendStatus(401);

  response.sendStatus(500);
};