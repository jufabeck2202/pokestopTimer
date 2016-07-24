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
  public timer
  public minutes = 5
  public time = " "
  public pauser = new Subject();
  public timerInterval
  constructor(private navController: NavController) {

  }

  onClick() {
    if (!this.running) {
        //this.interval = Observable.interval(10000).subscribe(this.callNotificaton);
      this.startTimer(10);
      this.running = !this.running;

    } else {

      this.timerInterval.unsubscribe();

        this.running = !this.running;
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
    this.timerInterval= Observable.interval(1000).subscribe(() => {
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
