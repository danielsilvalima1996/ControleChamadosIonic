import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { testUserAgent } from '@ionic/core/dist/types/utils/platform';
import { LoginService } from './services/authentication/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Chamados',
      url: '/chamados-list',
      icon: 'list'
    },
    {
      title: 'Trocar Senha',
      url: '/trocar-senha',
      icon: 'key'
    }
  ];

  constValue = {
    menu: <boolean>true
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService: LoginService,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loginService
        .getIsLogged$.subscribe((data) => {
          if (!data) {
            this.loginService.logout()
          } else {
            return
          }
        })
    });
  }

  logout() {
    this.loginService.logout();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirme!',
      message: 'Deseja sair?',
      buttons: [
        {
          text: 'Sair',
          role: 'sair',
          handler: () => {
            this.logout();
            this.constValue.menu = false;
          }
        },
        {
          text: 'Cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => { }
        }
      ]
    });

    await alert.present();
  }

}