export class TcpStatus  {
	id : number;
	name : string;
	ActiveConn : number;
	PassiveConn : number;
	FailedConn : number;
	ResetConn : number;
	EstablishedConn : number;
	RecvSegments : number;
	SentSegments : number;
	RetransmitSegments : number;
	BadSegments : number;
	ResetsSent : number;
}