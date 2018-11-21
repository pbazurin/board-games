import { SubscribeMessage } from '@nestjs/websockets';

import { Action } from '@dto/action';

export const SubscribeAction = (
  T: new (...args) => Action
): MethodDecorator => {
  return (target, key, descriptor: PropertyDescriptor) => {
    const instance = new T();

    return SubscribeMessage(instance.type)(target, key, descriptor);
  };
};
