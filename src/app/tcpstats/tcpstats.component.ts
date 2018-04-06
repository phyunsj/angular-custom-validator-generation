import { Component, OnInit } from '@angular/core';
import { TdLoadingService } from '@covalent/core';
import { TcpStatService, TcpStatus } from '@aia/services';

@Component({
  selector: 'app-tcpstats',
  templateUrl: './tcpstats.component.html',
  styleUrls: ['./tcpstats.component.css']
})
export class TcpstatsComponent implements OnInit {
  nodes: TcpStatus[];

  constructor(private loadingService: TdLoadingService, private tcpstatService: TcpStatService) { }

  ngOnInit() {
    this.loadingService.register('tcpstats');
    this.tcpstatService.query<Array<TcpStatus>>({sort: 'created', order: 'desc'})
      .subscribe(nodes => {
        this.nodes = nodes;
        this.loadingService.resolve('tcpstats');
      });
  }
}
