import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/controller/service/Auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-comptable',
  templateUrl: './login-comptable.component.html',
  styleUrls: ['./login-comptable.component.scss']
})
export class LoginComptableComponent implements OnInit {
  public  usernameComptable: any = '';
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  submit(){
    const formValues = this.loginForm.value;
    const username = formValues.username;
    this.usernameComptable = username;
    const passowrd = formValues.password;
    this.authService.loginComptable(username, passowrd);

  }
    register(){
    this.router.navigate(['/comptable/register']);
  }
}
