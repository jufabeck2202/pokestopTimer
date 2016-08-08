import {Component} from '@angular/core';
import {NavController, Platform, Modal, ViewController} from 'ionic-angular';
import {LocalNotifications} from 'ionic-native';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { Vibration } from 'ionic-native';
declare var AdMob: any

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
  public running = false

  public timer
  public minutes = 5
  public time
  public pauser = new Subject();
  public timerInterval
  private admobId: any;
  private switch:Boolean = false;


  constructor(private navController: NavController, public platform: Platform) {
    this.createBanner()

  }


  createBanner() {
    this.platform.ready().then(() => {
      if (AdMob) AdMob.createBanner({
        adId: "ca-app-pub-4155055675967377/9101443840",
        isTesting: false,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow: true, //this shows the ad
      })

    })

  }
  onChange(deviceValue) {
    console.log(deviceValue);
  }


  onClick() {
    if (!this.running) {
      this.startTimer(this.minutes * 60);
      this.running = !this.running

    } else {

      this.timerInterval.unsubscribe();
      this.running = !this.running;
      this.switch = !this.switch

    }
  }


  callNotificaton() {
    Vibration.vibrate([700,300,700]);
    LocalNotifications.schedule({
      text: "Pokestop Ready",
      sound: 'file://res/sound.mp3',
      icon: "file://res/icon.png",
      smallIcon:"file://res/icon.png"

    })
  }

  startTimer(duration) {
    let timer = duration, minutes, seconds;
    this.time = this.minutes+":00"
    this.timerInterval = Observable.interval(1000).subscribe(() => {
      minutes = timer / 60, 10;
      seconds = timer % 60, 10;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      this.time = parseInt(minutes) + ":" + seconds;
      this.switch=true
      if (--timer < 0) {
        this.callNotificaton();
        timer = duration;
      }
    });
  }

  openModal() {
    let modal = Modal.create(InfoModal);
    this.navController.present(modal);
  }




}

@Component({
  template: `

  <ion-content padding>
  <ion-navbar *navbar>
    <ion-title>Info </ion-title>
    <ion-buttons start>
      <button (click)="close()">
        <ion-icon name="close-circle"></ion-icon>
      </button>
      </ion-buttons>
      </ion-navbar>
      <ion-item>

      </ion-item>


  </ion-content>`
})
class InfoModal {
  constructor(
    private viewCtrl: ViewController) { }

  close() {
    this.viewCtrl.dismiss();
  }
}
