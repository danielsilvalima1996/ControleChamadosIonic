import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private screenOrientation: ScreenOrientation
  ) { }

  ngOnInit() {
    this.getScreenOrientationPortrait();
  }

  //Vertical
  getScreenOrientationPortrait() {
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
    } catch (error) {
      console.error(error)
    }
  }
}
