export class Customer {
  email: string;
  //id: number;
  //name: string;
  phone: string;

  id : number;
  name : string;
  SyncRetries  : number;
  SyncackRetries : number;
  KeepaliveTime : number;
  KeepaliveProbes : number;
  KeepaliveInterval : number;
  Retries1 : number;
  Retries2 : number;
  OrphanRetries : number;
  FinTimeout : number;

  constructor( ) {
     this.SyncRetries = 10;
     this.SyncackRetries = 18;
  this.KeepaliveTime = 11;
  this.KeepaliveProbes = 12;
  this.KeepaliveInterval = 13;
  this.Retries1 = 14;
  this.Retries2 = 15;
  this.OrphanRetries = 16;
  this.FinTimeout = 17;

  }
}
