import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service'
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router'
import { AuthService } from '../auth.service'
import { BnNgIdleService } from 'bn-ng-idle'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private _event:EventService,public _authService:AuthService, private _router:Router,private bnIde:BnNgIdleService) { }

  ngOnInit(): void {
    this._event.getMainPage().subscribe(
      res=> console.log('Login Successful'),
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status == 401){
            this._router.navigate(['/login'])
          }
        }
      }
    )
  }

}
