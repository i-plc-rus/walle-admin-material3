
import { Component, OnInit, ViewChild } from '@angular/core';
import { DocsBreadcrumbComponent } from "../../docs-breadcrumb/docs-breadcrumb.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BackAPIService } from '../../core/services/back-api.service';
import { ISupStatResponse } from '../../core/models/sup-stat-response';
import { ISupStat } from '../../core/models/sup-stat';

import { combineLatestWith, debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';


import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';


import { MatGridListModule } from '@angular/material/grid-list';


import { MatCardContent, MatCardModule } from '@angular/material/card';

import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { FileItem, FileUploader, FileUploadModule, ParsedResponseHeaders } from 'ng2-file-upload';
import { IFilesUrlNameSKU } from '../../core/dto';

@Component({
  selector: 'app-akv-sku-sale',
  standalone: true,
  imports: [DocsBreadcrumbComponent, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MenuComponent, MatTableModule, CommonModule, MatGridListModule, MatCardModule, MatCardContent, JsonPipe, MatDatepickerModule, MatProgressSpinnerModule, FileUploadModule ],
  providers: [provideNativeDateAdapter(),],
  templateUrl: './akv-sku-sale.component.html',
  styleUrl: './akv-sku-sale.component.scss'
})
export class AkvSkuSaleComponent  implements OnInit{
  isLoading = false;
    range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
    //value = '';  
    //not_origin: Array<ISupStat> = []
    originDataSource = new MatTableDataSource<ISupStat>([])
    notOriginDataSource = new MatTableDataSource<ISupStat>([])
    searchControl = new FormControl('');
    loadFile = new FormControl('');
  
    displayedColumns: string[] = ['date_upd', 'sku_count', 'q'];
      
    itsDone:  boolean = false
    itsStartExport:  boolean = false
  
  
    filesUrl: IFilesUrlNameSKU = {
      f_url_download: ''
    }
    
    
    ngOnInit() {    
      
    }
    
    
  
    triggerStart(): void {
      console.log('start');
      this.itsStartExport = true;
      this.isLoading = true;   
    }
  
  
    constructor(private backApi: BackAPIService) {
      this.range.valueChanges
        .subscribe(val => {
          this.onDateChange(val);
        });
  
      
  
    }
     
    
    onDateChange(val: any) {
      if (!val.start || !val.end){
        return;
      }
      const startDate = val.start;
      const endDate = val.end;
      console.log('Дата начала:', startDate);
      console.log('Дата окончания:', endDate);    
      this.isLoading = true; 
      this.itsStartExport = true;
      this.itsDone = false;            
      this.backApi.getAKVSKUSale(startDate, endDate)
        .subscribe(response => {
          const _url = <string>response        
          this.isLoading = false;
          console.log('onDateChangeSupID done')
          console.log(`_url-->${_url}`)
          this.filesUrl.f_url_download = 'http://192.168.111.41:30909/upload/' + _url;
          this.itsStartExport = false;
          this.itsDone = true;
          this.isLoading = false;
        });
  
      
    }

}
