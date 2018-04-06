export class TcpSetting  {
	id : number;
	name : string;
	SyncRetries : number;
	SyncackRetries : number;
	KeepaliveTime : number;
	KeepaliveProbes : number;
	KeepaliveInterval : number;
	Retries1 : number;
	Retries2 : number;
	OrphanRetries : number;
	FinTimeout : number;

	constructor() {
		this.SyncRetries = 180 ;
		this.SyncackRetries = 180 ;
		this.KeepaliveTime = 2 ;
		this.KeepaliveProbes = 9 ;
		this.KeepaliveInterval = 75 ;
		this.Retries1 = 3 ;
		this.Retries2 = 15 ;
		this.OrphanRetries = 7 ;
		this.FinTimeout = 60 ;
	}
}