import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginService } from '../services/login.service';
import { VerifytokenService } from '../services/verifytoken.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn=false;

  constructor(private loginService: LoginService) {
    // let chk = this.verifytokenservice.verifyToken();
    // console.log("chk is ", chk);
    // if (chk) {
    //   this.isLoggedIn=true;
    //   console.log("is logged in ", this.isLoggedIn);
    // } else {
    //   this.isLoggedIn=false;
    //   console.log("is logged in ", this.isLoggedIn);
    // }
  }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
  }

  logOutUser() {
    this.loginService.logoutUser();
    location.reload();
  }

}
