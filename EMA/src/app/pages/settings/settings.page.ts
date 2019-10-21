import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private profile = {'': false};
  private settings = {'': false};

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  changeState(card) {
    card[''] = card[''] === true ? false : true;
  }

  expanded(card) {
    return card[''];
  }

  createProviderAccount() {
  }
}
