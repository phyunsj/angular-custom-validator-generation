import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentLayoutModule, CovalentStepsModule, CovalentDialogsModule, CovalentLoadingModule } from '@covalent/core';

import {
  MdIconModule,
  MdSelectModule,
  MdListModule,
  MdButtonModule,
  MdInputModule,
  MdSlideToggleModule,
  MdDatepickerModule,
  MdNativeDateModule
} from '@angular/material';

import { AppComponent } from './app.component';

import { NodesComponent } from './nodes/nodes.component';
import { NodeComponent }  from './node/node.component';
import { NodeFormComponent } from './node-form/node-form.component';

import { TcpstatsComponent } from './tcpstats/tcpstats.component';
import { TcpstatComponent } from './tcpstat/tcpstat.component';

import { 
    TcpSyncRetriesDirective, 
    TcpSyncackRetriesDirective,
    TcpKeepaliveTimeDirective,
    TcpKeepaliveProbesDirective,
    TcpKeepaliveIntervalDirective,
    TcpRetries1Directive,
    TcpRetries2Directive,
    TcpOrphanRetriesDirective,
    TcpFinTimeoutDirective

    } from './validators/tcp.validator';


export const ROUTES = [
  { path: 'statistics', component: TcpstatsComponent },
  { path: 'statistics/:nodeId', component: TcpstatComponent },
  

  { path: 'nodes',              component: NodesComponent },
  { path: 'nodes/create',       component: NodeFormComponent },
  { path: 'nodes/:nodeId',      component: NodeComponent },
  { path: 'nodes/:nodeId/edit', component: NodeFormComponent },

  { path: '', pathMatch: 'full', redirectTo: '/statistics' },
];

@NgModule({
  declarations: [
    AppComponent,
    
    NodesComponent,
    NodeComponent,
    NodeFormComponent,

    TcpstatsComponent,
    TcpstatComponent,

    TcpSyncRetriesDirective,
    TcpSyncackRetriesDirective,
    TcpKeepaliveTimeDirective,
    TcpKeepaliveProbesDirective,
    TcpKeepaliveIntervalDirective,
    TcpRetries1Directive,
    TcpRetries2Directive,
    TcpOrphanRetriesDirective,
    TcpFinTimeoutDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    MdButtonModule,
    MdIconModule,
    MdListModule,
    MdInputModule,
    MdSelectModule,
    MdSlideToggleModule,
    MdDatepickerModule,
    MdNativeDateModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
