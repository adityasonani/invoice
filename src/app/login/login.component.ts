import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    username:'',
    password:'',
  }
  warning = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.credentials.username == 'admin' && this.credentials.password=='admin') {
      this.router.navigate(['/']);
    } else {
      this.warning = "Wrong Credentials";
    }
  }

}
