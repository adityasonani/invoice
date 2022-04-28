import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email:'',
    password:'',
  }
  warning = '';
  isInProgress= false;

  constructor(private router: Router, private http: HttpClient, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.credentials.email=='' || this.credentials.password=='') {
      return;
    }
    this.isInProgress=true;
    this.loginService.doLogin(this.credentials).subscribe(
      (response:any)=>{
        console.log("res from /login ", response.data);
        this.isInProgress=false;
        this.loginService.loginUser(response.token);
        this.router.navigate(['/']);
      },
      (error:any)=>{
        this.warning = error.error.message;
        console.log("err from /login ", error);
        this.isInProgress=false;
      }
    );
  }
  

}
