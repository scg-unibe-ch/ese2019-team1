import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileHandlerService} from '../../services/profile-handler.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @Input() admin;
  constructor(
      private router: Router,
      private profileHandler: ProfileHandlerService
  ) { }

  ngOnInit() {}

  async approveProfile() {
   await this.profileHandler.approveProfile(this.admin.ppid);
  }
  async deleteProfile() {
   await this.profileHandler.deleteProfile(this.admin.ppid);
  }

}
