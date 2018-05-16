import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ToastOptions } from 'ionic-angular';

/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//import { HttpClient } from '@angular/common/http';
//import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	data = {
    email: '',
    password: ''
  };

  constructor(
      //public http: HttpClient,
			public navCtrl: NavController, public navParams: NavParams,
      public toastCtrl: ToastController,
			private afAuth: AngularFireAuth
	) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  wip(){
    window.alert("Work in Progress !");
  }
  
  visitLogin() {
  	this.navCtrl.setRoot('LoginPage');
  }

  async register(loginCredentials) {
  	try {
//    this.isPasswordMatching();
  		const registerResult = await this.afAuth.auth.createUserWithEmailAndPassword(loginCredentials.email, loginCredentials.password);
      let str = "Account Successfully Created, Login Now";
      let toastOptions: ToastOptions = { message: str , duration: 3000 };

  		console.info("SUCCESS : \n" + JSON.stringify(registerResult));
      this.toastCtrl.create(toastOptions).present();
      this.visitLogin();
  	}
    catch(err) {
      let str = `Error : ${err}`; // { message: "Unable to create your Account now"
      let toastOptions: ToastOptions = { message: str, duration: 3000 };

      console.error(str);
      this.toastCtrl.create(toastOptions).present();
  	}
  }

}
