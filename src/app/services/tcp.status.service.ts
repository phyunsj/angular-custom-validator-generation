import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable()
export class TcpStatService extends RestService {
  resource: string = '/TcpStat';
}
