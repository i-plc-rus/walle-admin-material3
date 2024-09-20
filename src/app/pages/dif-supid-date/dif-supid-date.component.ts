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

import { combineLatestWith, debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';


import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';


import {MatGridListModule} from '@angular/material/grid-list';


import {MatCardContent, MatCardModule} from '@angular/material/card';

import {JsonPipe} from '@angular/common';
import {ChangeDetectionStrategy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-dif-supid-week',
  standalone: true,
  imports: [DocsBreadcrumbComponent, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MenuComponent, MatTableModule, CommonModule, MatGridListModule, MatCardModule, MatCardContent, JsonPipe, MatDatepickerModule],
  providers: [provideNativeDateAdapter(),],
  templateUrl: './dif-supid-date.component.html',
  styleUrls: ['./dif-supid-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DifSupidDateComponent implements OnInit{
  
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  value = '';  
  public origin: ISupStat [] = []
  public not_origin: Array<ISupStat> = []
  searchControl = new FormControl('');

  displayedColumns: string[] = ['date_upd', 'sku_count', 'q'];

  constructor(private backApi: BackAPIService) {    
  }
  ngOnInit(): void {
    /*combineLatest([
      this.searchControl.valueChanges.pipe(
        debounceTime(500),
        filter(value => value !== null && value.trim() !== ''),
        map(value => +value!), // Преобразуем строку в число
        filter(value => !isNaN(value)) // Убеждаемся, что это число
      ),
      this.dateRangeControl.valueChanges.pipe(
        filter(dateRange => dateRange.start && dateRange.end) // Проверяем, что диапазон дат заполнен
      )
    ])
    .pipe(
      filter(([value, dateRange]) => !!value && !!dateRange), // Убеждаемся, что оба значения есть
      switchMap(([value, dateRange]) => {
        // Формируем запрос с числом и диапазоном дат
        const queryParams = `number=${value}&start=${dateRange.start}&end=${dateRange.end}`;
        return this.http.get(`http://your-backend-api/search?${queryParams}`);
      })
    )
    .subscribe(response => {
      console.log('Response from server:', response);
    });*/
    
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),         
        filter(value => value !== null && value.trim() !== ''),
        map(value => +value!),
        filter(value => !isNaN(value)),        
        switchMap(value =>           
          this.backApi.getSupStatV2(value, this.range.controls.start.value, this.range.controls.end.value)
      )
      )
      .subscribe(response => {
        const _supStatResponse = <ISupStatResponse>response
        this.origin = _supStatResponse.origin
        this.not_origin = _supStatResponse.not_origin
        //this.dataSource = this.origin
      });
      
      this.range.valueChanges
      .pipe(
        debounceTime(300),         
        filter(value => value !== null),        
        switchMap(value =>           
          this.backApi.getSupStatV2(Number(this.searchControl.value), value.start, value.end)
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
