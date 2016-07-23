import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LocalNotifications} from 'ionic-native';


@Component({
    templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
    constructor(private navController: NavController) {

    }

    onClick() {
        LocalNotifications.schedule({
            text: "Pokemstop Ready",
            at: new Date(new Date().getTime() + 3600),

        });
    }
}
