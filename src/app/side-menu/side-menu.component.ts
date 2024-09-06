import { Component } from '@angular/core';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [MatSidenavModule,
    MatListModule,
    MatIconModule, CommonModule, MatSidenavContainer],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  selectedMenu: string | null = null;
  selectedSubItem: string | null = null;

  subItems = {
    'lists': ['Подпункт 1', 'Подпункт 2'],
    'names': ['Наименование 1', 'Наименование 2'],
    'dif': ['Dif 1', 'Dif 2'],
    '6.10': ['6.10.1', '6.10.2']
  };

  toggleSubMenu(menu: string) {
    this.selectedMenu = this.selectedMenu === menu ? null : menu;
    this.selectedSubItem = null;  // сбрасываем выбранный подпункт
  }

  selectSubItem(subItem: string) {
    this.selectedSubItem = subItem;
  }


}
