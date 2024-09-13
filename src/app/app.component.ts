import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { MatButtonModule } from '@angular/material/button';
// import { MatToolbarModule } from '@angular/material/toolbar';

// import {MatIconModule} from '@angular/material/icon';

// import {MatMenuModule} from '@angular/material/menu';
// import {MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';

// import {MatDividerModule} from '@angular/material/divider';

// import {MatListModule} from '@angular/material/list';

import { MenuComponent } from "./menu/menu.component";
import localeRu from '@angular/common/locales/ru';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

// Регистрация локали
registerLocaleData(localeRu);


@Component({
  selector: 'app-root',
  standalone: true,
  //imports: [RouterOutlet, MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatSidenavContainer, MatDividerModule, MatSidenavModule, MatListModule, MenuComponent, SecondaryNavigationComponent],  
  imports: [RouterOutlet, MenuComponent],  
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.scss','./mini-menu.scss','./nav-item.scss', './navigation-list.component.scss', './docs-viewer.component.scss', './secondary-navigation.component.scss']
  //styleUrls: ['./app.component.scss','./docs-viewer.component.scss']
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'walle-admin';
}
