import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut, ISidebarData } from './helper';
import { sidebarData } from './sidebar-data';

interface SidebarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', 
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})

export class SidebarComponent implements OnInit {

  @Output() onToggleSidebar: EventEmitter<SidebarToggle> = new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  sideData = sidebarData;
  multiple: boolean = false;
  isHovered = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSidebar.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.collapsed) {
      this.isHovered = true;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!this.collapsed) {
      this.isHovered = false;
    }
  }

  constructor(public router: Router) {}
  
  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSidebar.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidebar(): void {
    this.collapsed = false;
    this.onToggleSidebar.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  handleClick(item: ISidebarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  getActiveClass(data: ISidebarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: ISidebarData): void {
    if (!this.multiple) {
      for(let modelItem of this.sideData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }
}