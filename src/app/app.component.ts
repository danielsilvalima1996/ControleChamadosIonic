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
      title: 'Dashboard',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Chamados',
      url: '/list',
      icon: 'list'
    }
  ];

  portalWeb = 'http://localhost:8080';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService: LoginService,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
          handler: () => this.logout()
        },
        {
          text: 'Cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {}
        }
      ]
    });

    await alert.present();
  }

}