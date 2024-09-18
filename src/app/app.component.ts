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


import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Регистрация локали
registerLocaleData(localeRu);


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD.MM.YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};



@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [RouterOutlet, MenuComponent],  
  providers: [    
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: MAT_DATE_LOCALE, useValue: 'ru'},
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'walle-admin';
}
