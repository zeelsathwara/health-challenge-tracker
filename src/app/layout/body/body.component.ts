import { Component, Input, OnInit } from '@angular/core';

interface SidebarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  isSidebarCollapsed = false;

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }

  constructor() { }

  ngOnInit() {
  }

  onToggleSidebar(data: SidebarToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSidebarCollapsed = data.collapsed;
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}