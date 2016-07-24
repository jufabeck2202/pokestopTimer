import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LocalNotifications} from 'ionic-native';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
  public running = false
  public interval
  public minutes = 5
  public time = " "
  public pauser = new Subject();
  constructor(private navController: NavController) {

  }

  onClick() {
    if (!this.running) {
      this.interval = Observable.interval(50).subscribe(this.callNotificaton)
      this.running = !this.running

    } else {
      this.running = !this.running;

      this.interval.unsubscribe();
    }
    let fiveMinutes = 60 * 5;

    this.startTimer(fiveMinutes);
  }


  callNotificaton() {
    LocalNotifications.schedule({
      text: "Pokemstop Ready",


    })
  }

  startTimer(duration) {
    let timer = duration, minutes, seconds;
    Observable.interval(1000).subscribe(() => {
      minutes = timer / 60, 10;
      seconds = timer % 60, 10;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      this.time = parseInt(minutes) + " " + seconds;

      if (--timer < 0) {
        timer = duration;
      }
    });
  }



}
