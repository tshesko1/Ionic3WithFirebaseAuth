import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ToastOptions } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	data = {
    email: '',
    password: ""
  };

  constructor(
      public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
      private afAuth: AngularFireAuth 
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  visitRegister(){
    this.navCtrl.setRoot("RegisterPage");
  }

  async login(loginCredentials) {
    try {
      console.log(JSON.stringify(loginCredentials));

      const loginResult = await this.afAuth.auth.signInWithEmailAndPassword(loginCredentials.email, loginCredentials.password);
      if(loginResult){
        let str = "SUCCESS : \n" + JSON.stringify(loginResult);
        let toastOptions : ToastOptions = { message: `Welcome ${loginCredentials.email} !`, duration: 3000 };

        console.info(str);
        this.toastCtrl.create(toastOptions).present();
        this.navCtrl.setRoot('HomePage');
      }
    }
         
    catch(err) {
      let str = `Error : ${err}`; // "Unable to Login now",
      let toastOptions: ToastOptions = { message: str, duration: 3000 };

      console.error(str);
      this.toastCtrl.create(toastOptions).present();
    }
  }

}
