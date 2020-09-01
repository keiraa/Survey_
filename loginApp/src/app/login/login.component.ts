import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from '../auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth:AuthService,private _router:Router) { }

  ngOnInit(): void {
  }

  loginUser(f:NgForm){
    this._auth.loginUser(f.value).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token',res.token)
        this._router.navigate(['/mainPage'])
      },
      err=>console.log('Error: '+err)
    )
  }
}
