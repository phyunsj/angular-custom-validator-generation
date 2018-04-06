import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TdLoadingService } from '@covalent/core';
import { TcpNodeService, TcpSetting } from '@aia/services';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  tcpsetting: TcpSetting;

  constructor(
    private tcpnodeService: TcpNodeService,
    private loadingService: TdLoadingService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadingService.register('setting');
    this.route.params
      .map((params: Params) => params.nodeId)
      .switchMap(nodeId => this.tcpnodeService.get<TcpSetting>(nodeId))
      .subscribe(tcpsetting => {
        this.tcpsetting = tcpsetting;
        this.loadingService.resolve('setting');
      });
  }
}
