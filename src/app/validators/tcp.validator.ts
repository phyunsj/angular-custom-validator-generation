

import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';



// validation function
function validateTcpIntFactory( minNum: number, maxNum : number, paramDisplayName : string ) : ValidatorFn {
  return (c: AbstractControl) => {
    
    if ( +c.value < minNum ) 
      return {
        Tcp: {
          valid: false,
          message : `${paramDisplayName} must be higher than ${minNum}`
        }
      };

    if ( +c.value > maxNum ) 
      return {
        Tcp: {
          valid: false,
          message : `${paramDisplayName} must be lower than ${maxNum}`
        }
      };

    if ( c.value === null ) 
      return {
        Tcp: {
          valid: false,
          message : `${paramDisplayName} must be between ${minNum} and ${maxNum}`
        }
      };

    return null;
  }
}



function validateTcpStrFactory( minNum: number, maxNum : number, paramDisplayName : string ) : ValidatorFn {
  return (c: AbstractControl) => {
    
    if (c.value < minNum ) 
      return {
        Tcp: {
          valid: false,
          message : `The length of ${paramDisplayName} must be longer than ${minNum}`
        }
      };

    if (c.value > maxNum ) 
      return {
        Tcp: {
          valid: false,
          message : `The length of ${paramDisplayName} must be shorter than ${maxNum}`
        }
      };

      if ( c.value === null ) 
      return {
        Tcp: {
          valid: false,
          message : `${paramDisplayName} must be between ${minNum} and ${maxNum}`
        }
      };

    return null;
  }
}



@Directive({
  selector: '[TcpSyncRetries][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: TcpSyncRetriesDirective, multi: true }
  ]
})
export class TcpSyncRetriesDirective implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validateTcpIntFactory( 0, 255, "Sync Retries" );
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}



@Directive({
  selector: '[TcpSyncackRetries][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: TcpSyncackRetriesDirective, multi: true }
  ]
})
export class TcpSyncackRetriesDirective implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validateTcpIntFactory( 0, 255, "Synack Retries" );
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}



@Directive({
  selector: '[TcpKeepaliveTime][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: TcpKeepaliveTimeDirective, multi: true }
  ]
})
export class TcpKeepaliveTimeDirective implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validateTcpIntFactory( 0, 24, "Keepalive Time" );
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}



@Directive({
  selector: '[TcpKeepaliveProbes][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: TcpKeepaliveProbesDirective, multi: true }
  ]
})
export class TcpKeepaliveProbesDirective implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validateTcpIntFactory( 0, 50, "Keepalive Probes" );
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}



@Directive({
  selector: '[TcpKeepaliveInterval][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: TcpKeepaliveIntervalDirective, multi: true }
  ]
})
export class TcpKeepaliveIntervalDirective implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validateTcpIntFactory( 0, 250, "Keepalive Interval" );
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}



@Directive({
  selector: '[TcpRetries1][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: TcpRetries1Directive, multi: true }
  ]
})
export class TcpRetries1Directive implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validateTcpIntFactory( 3, 100, "Retries 1" );
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}



@Directive({
  selector: '[TcpRetries2][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: TcpRetries2Directive, multi: true }
  ]
})
export class TcpRetries2Directive implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validateTcpIntFactory( 6, 100, "Retries 2" );
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}



@Directive({
  selector: '[TcpOrphanRetries][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: TcpOrphanRetriesDirective, multi: true }
  ]
})
export class TcpOrphanRetriesDirective implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validateTcpIntFactory( 0, 100, "Orphan Retries" );
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}



@Directive({
  selector: '[TcpFinTimeout][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: TcpFinTimeoutDirective, multi: true }
  ]
})
export class TcpFinTimeoutDirective implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validateTcpIntFactory( 0, 180, "FIN Timeout" );
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}

