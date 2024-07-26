import { Component, HostListener, OnInit } from '@angular/core';
import { dashboardOptions } from './dashboard-dummy-data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  users: any[] = [];
  innerWidth: any;

  dashboardOptions = dashboardOptions;

  constructor() {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  getClass() {
    return this.innerWidth < 925 ? 'row-md' : 'row';
  }

  navigateToOption(option: any) {
    console.log('Navigating to:', option.title);
  }

}