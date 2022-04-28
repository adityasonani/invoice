import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifytokenService {
  ret=false;
  constructor(private http: HttpClient, private router: Router) { }

  verifyToken() {
    let token = localStorage.getItem("Token");
    let url = environment.BASE_URL + "/api/auth/verify";
    console.log("token ", token);
    const body = {
      'token':token
    };
    this.http.post(url, body).subscribe(
      (response: any)=>{
        console.log("inside verify token response ", response);
        this.ret= true;
      },
      (err)=>{
        this.logOutUser();
        console.log("inside verify token err ", err);
      }
    );
    return this.ret;
  }

  logOutUser() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
