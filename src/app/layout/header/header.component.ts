import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { userItems } from './header-dummy-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {

  @Input() selectedName: string = '';
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  @Output() sidebarToggled = new EventEmitter<void>();

  isSidebarOpen: boolean = false;
  userItems = userItems;

  constructor() {}

  ngOnInit(): void {}

  getHeadClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }

  toggleSidebar() {
    this.sidebarToggled.emit();
  }
}