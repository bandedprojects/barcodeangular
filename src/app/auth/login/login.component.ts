import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string = null;

  constructor(private authService: AuthService, private userService: UserService) {

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl('', {validators: [Validators.required]}),
      'password': new FormControl('', {validators: [Validators.required]})
    })
  }


  onSubmit() {
    this.userService.login({
      username: this.loginForm.value.username, 
      password: this.loginForm.value.password
    }).subscribe(
      responseData => {
        if(responseData.status && responseData.status == '1') {
            this.authService.login(responseData.data);                        
        } else {
            this.loginError = "Login Failiure";
        }
      }                 
    )
  }

}
