import { Component, OnInit } from '@angular/core';
import { NgForm, NgControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TdLoadingService, TdDialogService } from '@covalent/core';
import { TcpNodeService, TcpSetting } from '@aia/services';

@Component({
  selector: 'app-node-form',
  templateUrl: './node-form.component.html',
  styleUrls: ['./node-form.component.css']
})
export class NodeFormComponent implements OnInit {
  node: TcpSetting;

  constructor(
    private loadingService: TdLoadingService,
    private router: Router,
    private dialogService: TdDialogService,
    private tcpnodeService: TcpNodeService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadingService.register('node');
    this.route.params.map((params: Params) => params.nodeId).subscribe(nodeId => {
      if (nodeId) {
        this.tcpnodeService.get<TcpSetting>(nodeId).subscribe(node => {
          this.node = node;
          this.loadingService.resolve('node');
        });
      } else {
        this.node = new TcpSetting();
        this.loadingService.resolve('node');
      }
    });
  }

  save() {
    if (this.node.id) {
      this.tcpnodeService.update<TcpSetting>(this.node.id, this.node).subscribe(response => {
        this.viewNode(response.id);
      });
    } else {
      this.tcpnodeService.create<TcpSetting>(this.node).subscribe(response => {
        this.viewNode(response.id);
      });
    }
  }

  delete() {
    this.dialogService.openConfirm({
      message: 'Are you sure you want to delete this node?',
      title: 'Confirm',
      acceptButton: 'Delete'
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.loadingService.register('node');
        this.tcpnodeService.delete(this.node.id).subscribe(response => {
          this.loadingService.resolve('node');
          this.node.id = null;
          this.cancel();
        });
      }
    });
  }

  cancel() {
    if (this.node.id) {
      this.router.navigate(['/nodes', this.node.id]);
    } else {
      this.router.navigateByUrl('/nodes');
    }
  }

  private viewNode(id: number) {
    this.router.navigate(['/nodes', id]);
  }
}
