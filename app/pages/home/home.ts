import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {LocalNotifications} from 'ionic-native';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
declare var AdMob: any

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
  public running = false

  public timer
  public minutes = 5
  public time = "0:00"
  public pauser = new Subject();
  public timerInterval
  private admobId: any;


  constructor(private navController: NavController, public platform: Platform) {
    this.createBanner()

  }


  createBanner() {
    this.platform.ready().then(() => {
      if (AdMob) AdMob.createBanner({
        adId: "ca-app-pub-4155055675967377/9101443840",
        isTesting: true,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow: true, //this shows the ad
      })

    })

  }


  onClick() {
    if (!this.running) {
      this.startTimer(this.minutes*60);
      this.running = !this.running;

    } else {

      this.timerInterval.unsubscribe();
      this.running = !this.running;
      this.time = "0:00"
    }
  }


  callNotificaton() {
    LocalNotifications.schedule({
      text: "Pokemstop Ready",
      sound: 'file://res/sound.mp3'

    })
  }

  startTimer(duration) {
    let timer = duration, minutes, seconds;
    this.timerInterval = Observable.interval(1000).subscribe(() => {
      minutes = timer / 60, 10;
      seconds = timer % 60, 10;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      this.time = parseInt(minutes) + ":" + seconds;

      if (--timer < 0) {
        this.callNotificaton();
        timer = duration;
      }
    });
  }




}
