import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials = {
    firstname:'',
    lastname:'',
    email:'',
    username:'',
    password:'',
    phonenumber:'',
    address:''
  }

  warning = '';

  confirmPassword = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.confirmPassword != this.credentials.password) {
      this.warning = "Password and Confirm Password are not same!";
    }
  }

}
