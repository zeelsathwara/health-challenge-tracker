import { Component } from '@angular/core';

interface SidebarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'healthchallengetracker';

  isSidebarCollapsed = false;
  screenWidth = 0;

  onToggleSidebar(data: SidebarToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSidebarCollapsed = data.collapsed;
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  constructor() {}

}