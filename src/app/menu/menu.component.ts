import { Component, Input } from '@angular/core';
import { SecondaryNavigationComponent } from '../secondary-navigation/secondary-navigation.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SecondaryNavigationComponent, RouterLinkActive, RouterLink],
  templateUrl: './menu.component.html',
  // 
  styleUrls: ['./menu.component.scss', './mini-menu.scss', './nav-item.scss']
})
export class MenuComponent {
  // @Input() menu_name: string = ''; 
  menu_name: string = ''; 
  constructor(public router: Router) {}  
}
