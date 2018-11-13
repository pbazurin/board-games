import { createParamDecorator } from '@nestjs/common';

export const ConnectionId = createParamDecorator((data, req) => {
  return req.headers['authorization'].split(' ')[1];
});
