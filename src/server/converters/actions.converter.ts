import { Action } from '@dto/action';

import { GatewayResponse } from '../models/gateway-response';

export class ActionsConverter {
  static toResponse(action: Action): GatewayResponse {
    return <GatewayResponse>{
      event: action.type,
      data: action
    };
  }
}
