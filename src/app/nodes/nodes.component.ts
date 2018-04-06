import { Component, OnInit } from '@angular/core';
import { TdLoadingService } from '@covalent/core';
import { TcpNodeService, TcpSetting } from '@aia/services';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css']
})
export class NodesComponent implements OnInit {
  nodes: TcpSetting[];

  constructor(private loadingService: TdLoadingService, private tcpnodeService: TcpNodeService) { }

  ngOnInit() {
    this.loadingService.register('nodes');
    this.tcpnodeService.query<Array<TcpSetting>>({sort: 'created', order: 'desc'})
      .subscribe(nodes => {
        this.nodes = nodes;
        this.loadingService.resolve('nodes');
      });
  }
}
