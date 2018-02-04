import { log } from '../lib/util';

// Rob - send request with debug header to display all data
export default (request, response, next) => {
  if(request.header.debug) {
    log('request.url', request.url);
    log('request.body', request.body);
    log('request.query', request.query);
    log('request.headers', request.headers);
  }
  next();
};
