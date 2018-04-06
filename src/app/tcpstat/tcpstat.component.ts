import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TdLoadingService } from '@covalent/core';
import { TcpStatService, TcpStatus  } from '@aia/services';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-tcpstat',
  templateUrl: './tcpstat.component.html',
  styleUrls: ['./tcpstat.component.css']
})
export class TcpstatComponent implements OnInit {
  node : TcpStatus;

  constructor(
    private loadingService: TdLoadingService,
    private tcpstatService: TcpStatService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadingService.register('status');

    this.route.params
      .map((params: Params) => params.nodeId)
      .switchMap(nodeId => this.tcpstatService.get<TcpStatus>(nodeId))
      .subscribe(node => {
        this.node = node;
        this.loadingService.resolve('status'); 
      });

  }
}
