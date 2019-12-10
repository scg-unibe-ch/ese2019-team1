import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminViewComponent} from '../../components/admin-view/admin-view.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPagePage implements OnInit {

  @ViewChild(AdminViewComponent, null) adminView: AdminViewComponent;

  constructor() { }

  ngOnInit() {
  }

}
