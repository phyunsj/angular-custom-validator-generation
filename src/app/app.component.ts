import { Component } from '@angular/core';
import { 
         TcpNodeService, 
         TcpStatService
       } from '@aia/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    TcpNodeService,
    TcpStatService
  ]
})

export class AppComponent { }
