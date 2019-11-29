import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @Input() admin;
  constructor(
      private router: Router
  ) { }

  ngOnInit() {}

  approveProfile() {}

}
