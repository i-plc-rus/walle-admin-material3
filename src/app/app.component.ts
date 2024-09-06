import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import {MatIconModule} from '@angular/material/icon';

import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';

import {MatDividerModule} from '@angular/material/divider';

import {MatListModule} from '@angular/material/list';
import { SideMenuComponent } from "./side-menu/side-menu.component";




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatSidenavContainer, MatDividerModule, MatSidenavModule, MatListModule, SideMenuComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss','./mini-menu.scss', './nav-item.scss', './navigation-list.component.scss', './docs-viewer.component.scss', './secondary-navigation.component.scss']
})
export class AppComponent {
  title = 'walle-admin';
}
