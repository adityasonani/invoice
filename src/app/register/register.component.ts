import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials = {
    name:'',
    email:'',
    password:'',
    phonenumber:'',
    address:''
  }

  warning = '';
  isProgress = false;

  confirmPassword = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.confirmPassword != this.credentials.password) {
      this.warning = "Password and Confirm Password are not same!";
      return;
    }
    this.isProgress=true;
    let uri = environment.BASE_URL + '/api/auth/register'
    this.http.post(uri, this.credentials).subscribe(
      (res)=>{
        console.log("post req to register response ", res);
        this.isProgress = false;
        this.router.navigate(['/login']);
      },
      (err)=>{
        console.log("post req to register error ", err);
        this.warning = err.message;
        this.isProgress = false;
      }
    )

  }

}
