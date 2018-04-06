import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable()
export class TcpNodeService extends RestService {
  resource: string = '/TcpNode';
}
