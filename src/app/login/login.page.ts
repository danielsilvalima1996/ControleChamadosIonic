import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/authentication/login/login.service';
import { Login } from '../interfaces/login.model';
import { User } from '../interfaces/user.model';
import { ErrorSpringBoot } from '../interfaces/ErrorSpringBoot.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constValue = {
    button: <boolean> false,
    loading: <boolean> null
  }

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['daniel@daniel.com.br', Validators.email],
      password: ['12345678', Validators.minLength(8)]
    })

    this.loginForm.valueChanges
    .subscribe((_) => {
      this.constValue.button = this.loginForm.invalid;
    })

    // this.loginService
    // .getIsLogged$.subscribe((data) => {
    //   if (data) {
    //     this.router.navigate(['dashboard']);
    //   }
    // })
  }

  get controls() {
    return this.loginForm.controls;
  }

  login() {
    this.constValue.loading = true;
    if (this.loginForm.invalid) {
      this.constValue.loading = false;
      return;
    } else {
      this.loginService
        .login(this.loginForm.value)
        .subscribe((data: Login) => {
          console.log(data);
          

        const jwtToken = `Bearer ${data.token}`;
        sessionStorage.setItem('token', jwtToken);

        const userInformation: User = data.user;
        sessionStorage.setItem('user', JSON.stringify(userInformation));
        this.constValue.loading = true;
        this.loginService.setUserInformation$(userInformation);

        this.loginService.setIsLogged$(true);
        },
        (error: ErrorSpringBoot) => {
          this.loginService.setIsLogged$(false);
          this.constValue.loading = false;
          console.log(error);
          
        })
    }
  }

}
