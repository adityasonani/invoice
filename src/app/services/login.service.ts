import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  doLogin(credentials:any) {
    let uri = environment.BASE_URL+'/api/auth/login';
    return this.http.post(uri, credentials);
  }

  doSaveInvoice(createform:any) {
    let uri = environment.BASE_URL + '/api/invoice';
    return this.http.post(uri, createform);
  }

  loginUser(token:any) {
    localStorage.setItem("Token", token);
    return true;
  }

  isLoggedIn() {
    let token = this.getToken();
    if (token==undefined || token==='' || token==null) {
      return false;
    } else {
      return true;
    }
  }

  logoutUser() {
    localStorage.removeItem("Token");
    return true;
  }
  
  getToken() {
    return localStorage.getItem("Token");
  }
}


