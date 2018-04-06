#!/usr/bin/env python


class tsTemplate(object):

    def __init__ (self):
        pass

    tsValidatorHeader = '''

import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';

'''

    tsValidatorNumFactory= '''

// validation function
function validate${paramName}IntFactory( minNum: number, maxNum : number, paramDisplayName : string ) : ValidatorFn {
  return (c: AbstractControl) => {
    
    if ( +c.value < minNum ) 
      return {
        ${paramName}: {
          valid: false,
          message : `${paramDisplayName} must be higher than ${minNum}`
        }
      };

    if ( +c.value > maxNum ) 
      return {
        ${paramName}: {
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

'''

    tsValidatorStrFactory='''

function validate${paramName}StrFactory( minNum: number, maxNum : number, paramDisplayName : string ) : ValidatorFn {
  return (c: AbstractControl) => {
    
    if (c.value < minNum ) 
      return {
        ${paramName}: {
          valid: false,
          message : `The length of ${paramDisplayName} must be longer than ${minNum}`
        }
      };

    if (c.value > maxNum ) 
      return {
        ${paramName}: {
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

'''

    tsValidatorDirective = '''

@Directive({
  selector: '[${paramName}][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ${paramName}Directive, multi: true }
  ]
})
export class ${paramName}Directive implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validate${paramGroup}${paramType}Factory( ${minNum}, ${maxNum}, "${paramDisplayName}" );
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}

'''

