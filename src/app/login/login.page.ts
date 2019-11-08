import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/authentication/login/login.service';
import { Router } from '@angular/router';
import { Login } from '../interfaces/login.model';
import { User } from '../interfaces/user.model';
import { ErrorSpringBoot } from '../interfaces/ErrorSpringBoot.model';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constValue = {
    button: <boolean>false,
    loading: <boolean>null
  }

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.minLength(8)]
    })

    this.loginForm.valueChanges
      .subscribe((_) => {
        this.constValue.button = this.loginForm.invalid;
      })
  }

  get controls() {
    return this.loginForm.controls;
  }

  login() {
    this.loadingTela();
    if (this.loginForm.invalid) {
      this.constValue.loading = false;
      this.loadingController.dismiss();
      return;
    } else {
      this.loginService
        .login(this.loginForm.value)
        .subscribe((data: Login) => {
          const jwtToken = `Bearer ${data.token}`;
          sessionStorage.setItem('token', jwtToken);

          const userInformation: User = data.user;
          sessionStorage.setItem('user', JSON.stringify(userInformation));
          this.constValue.loading = true;
          this.loginService.setUserInformation$(userInformation);

          this.loginService.setIsLogged$(true);

          this.router.navigate(['home']);
          this.loadingController.dismiss();
        },
          (error: ErrorSpringBoot) => {
            this.loginService.setIsLogged$(false);
            this.loadingController.dismiss();
          })
    }
  }

  async esqueciSenha() {
    const alert = await this.alertController.create({
      header: 'Esqueci Senha',
      subHeader: 'Contato',
      message: 'Entre em contato com a Lobios!'
        + 'Telefone: (11) 4502-1053'
        + 'E-mail: contato@lobios.com.br',
      buttons: ['OK']
    });

    await alert.present();
  }

  async loadingTela() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      duration: 7000,
      message: 'Entrando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
}


