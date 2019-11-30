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
  private ppid: string;
  constructor(
      private router: Router,
      private profileHandler: ProfileHandlerService
  ) {}

  ngOnInit() {
    this.ppid = this.admin.ppid;
  }

  async approveProfile() {
   await this.profileHandler.approveProfile(this.ppid);
  }
  async deleteProfile() {
   await this.profileHandler.deleteProfile(this.ppid);
  }

}
