import { Component } from '@angular/core';
import { AuthService } from './auth.service'
import {Router} from '@angular/router'

import { BnNgIdleService } from 'bn-ng-idle'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'loginApp';
  constructor(public _authService:AuthService, private _router:Router,private bnIde:BnNgIdleService){}

  ngOnInit():void{
      this.bnIde.startWatching(180).subscribe((isTimedOut:boolean)=>{
        if(isTimedOut){
          if(this._authService.loggedIn()){
              this._authService.logoutUser()
              this._router.navigate(['/login'])
          }
          else{
            console.log('res')
            this.bnIde.resetTimer;
          }
        }
      })
    }
  

}
