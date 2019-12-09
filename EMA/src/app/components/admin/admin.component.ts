import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileHandlerService} from '../../services/profile-handler.service';
import {UserHandler} from '../../services/user-handler';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @Input() admin; adminU;
  private ppid: string;
//  private uid: string;
  constructor(
      private router: Router,
      private profileHandler: ProfileHandlerService,
 //     private userHandler: UserHandler
  ) {}

  ngOnInit() {
    this.ppid = this.admin.ppid;
 //   this.uid = this.adminU.uid;
  }

  async approveProfile() {
   await this.profileHandler.approveProfile(this.ppid);
  }
  async deleteProfile() {
   await this.profileHandler.deleteProfile(this.ppid);
 //  await this.userHandler.deleteUser((this.uid));
  }

}
