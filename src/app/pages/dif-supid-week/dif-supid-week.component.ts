import { Component, OnInit } from '@angular/core';
import { DocsBreadcrumbComponent } from "../../docs-breadcrumb/docs-breadcrumb.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BackAPIService } from '../../core/services/back-api.service';
import { ISupStatResponse } from '../../core/models/sup-stat-response';
import { ISupStat } from '../../core/models/sup-stat';

import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';


import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';


import {MatGridListModule} from '@angular/material/grid-list';


import {MatCardContent, MatCardModule} from '@angular/material/card';


// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }


// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];



@Component({
  selector: 'app-dif-supid-week',
  standalone: true,
  imports: [DocsBreadcrumbComponent, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MenuComponent, MatTableModule, CommonModule, MatGridListModule, MatCardModule, MatCardContent],
  templateUrl: './dif-supid-week.component.html',
  styleUrls: ['./dif-supid-week.component.scss']
})
export class DifSupidWeekComponent implements OnInit{
  value = '';  
  public origin: ISupStat [] = []
  public not_origin: Array<ISupStat> = []
  searchControl = new FormControl('');

  displayedColumns: string[] = ['date_upd', 'sku_count', 'q'];
  //dataSource = ELEMENT_DATA;

  constructor(private backApi: BackAPIService) {    
  }
  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Устанавливаем задержку в 500 миллисекунд
        filter(value => value !== null && value.trim() !== ''),
        map(value => +value!),
        filter(value => !isNaN(value)),
        switchMap(value => 
          this.backApi.getSupStat(value)
      )
      )
      .subscribe(response => {
        const _supStatResponse = <ISupStatResponse>response
        this.origin = _supStatResponse.origin
        this.not_origin = _supStatResponse.not_origin
        //this.dataSource = this.origin
      });
  }

  clearSupID() : void{
    this.searchControl.setValue('');
    this.origin = []
    this.not_origin = []
  }

  
}
