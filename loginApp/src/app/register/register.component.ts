import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private _auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  registerUser(f: NgForm){
    this._auth.registerUser(f.value).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token',res.token)
        this.router.navigate(['/mainPage'])
      },
      err => console.log('Error: ' + err)
    )
  }
}
