import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ToastOptions } from 'ionic-angular';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  username: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController
  ) {
    /*
      TODO : You can initialize your Home page here
      like I am returning the Email ID from the Auth Data
      to greet the user with a warm welcome message
    */
    this.afAuth.authState.take(1).subscribe(authData => {
      this.username = authData.email;
      console.log(
        `
        \n--> Email : ${this.username}
        \n--> Complete Auth Data : ${authData.uid}
        `
      );
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  async logOut() {
    try {
      let logOutResult =  await this.afAuth.auth.signOut();
      let toastOptions: ToastOptions = { message: 'See you soon on board', duration: 3000};
      console.info(JSON.stringify(logOutResult));
      this.toastCtrl.create(toastOptions).present();
      this.navCtrl.setRoot('LoginPage');
    }
    catch(err){
      let str = `${err}`;
      let toastOptions : ToastOptions = { message: str, duration: 300};
      //{message: 'Couldn\'t Sign Out properly', duration: 5000}
      console.error(str);
      this.toastCtrl.create(toastOptions).present();
    }
  }

}
