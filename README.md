
# Angular Custom Validator Generation

## Angular Custom Validator with Template-Driven Form

Use Linux TCP parameters to demonstrate angular-custome-validator generation (`*.validator.ts` )  

More info on Linux TCP parameters : https://www.speedguide.net/articles/linux-tcpip-parameters-reference-2672

#### `tcp.xlsx` contains TCP parameter-specific setting/status parameters.

The following scripts generate `*.validator.ts` (and more `ts`) and `tcp.json` for **json_server**.
- tsTemplate.py
- fixedLabels.py
- generateValidator.py
- generateSampleDb.py
- generator.py

The following files are generated out of `tcp.xlsx`.

- tcp.validator.ts // validator directives for all TCP settings
- tcp.tooltip.ts // TCP tooltips
- tcp.setting.ts // TCP Setting Class with default value
- tcp.status.ts // TCP Status Class
- tcp.json  // sampe db for json_server

## Angular Project

Started with "Angular In Action" Ch.9 Example https://github.com/angular-in-action/invoice (Credit to Author : **Jeremy Wilken**)

**YES, I PURCHASED THIS BOOK (More on _Angular In Action_ https://www.manning.com/books/angular-in-action).** My focus is to generate custom validators based on form entries (number for this demo). No polling. 

### Project Start-up

> npm run api 

http://localhost:3000  => json_server --watch tcp.json

> ng serve 

http://localhost:4200  => access network node monitor 



### 1. Validator Factory in tcp.validator.ts (auto-generated)

```
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
```

### 2. Validator Directive in tcp.validator.ts (auto-generated)

```
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
```
The following **Directives** are auto-generated.
```
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
```

### 3. src/app/node-form/node-form-components.html
```
<md-input-container>
          <input name="SyncRetries" mdInput type="number" placeholder="Sync Retries (secs)" 
          [(ngModel)]="node.SyncRetries" TcpSyncRetries required #SyncRetries="ngModel">
   <md-error *ngIf="SyncRetries.errors">
            {{ SyncRetries.errors.Tcp.message }}
    </md-error>          
</md-input-container>
```
### 4. Form Screen


<p align="center">
<img src="https://github.com/phyunsj/angular-custom-validator-generation/blob/master/form_validation.gif" width="500px"/>
</p>


### 5. Additional Screens


<p align="center">
<img src="https://github.com/phyunsj/angular-custom-validator-generation/blob/master/monitor_statistics_node_4.png" width="400px"/>
</p>

<p align="center">
<img src="https://github.com/phyunsj/angular-custom-validator-generation/blob/master/monitor_statistics_list.png" width="400px"/>
</p>


## Material Icon 

https://material.io/icons/

1.  icon name
`<md-icon md-list-icon >`view_week`</md-icon>`
2. (option 1) color "primary","warn" or "accent"
`<md-icon md-list-icon color="primary">`view_week`</md-icon>`
3. (option 2) color 
```
.blue-icon {
    color: blue;
}
.blue-icon svg {
    fill: blue;
}
```
Add the class to your icon:
`<md-icon class="blue-icon">menu</md-icon>`

