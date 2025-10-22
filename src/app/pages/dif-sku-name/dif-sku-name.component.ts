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

const URL = 'http://192.168.111.41:30909/api/v3/sku_name_upload_file/';


@Component({
  selector: 'app-dif-sku-name',
  standalone: true,
  imports: [DocsBreadcrumbComponent, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MenuComponent, MatTableModule, CommonModule, MatGridListModule, MatCardModule, MatCardContent, JsonPipe, MatDatepickerModule, MatProgressSpinnerModule, FileUploadModule ],
  providers: [provideNativeDateAdapter(),],
   templateUrl: './dif-sku-name.component.html',
  styleUrl: './dif-sku-name.component.scss'
})
export class DifSkuNameComponent implements OnInit{
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
  
  uploader: FileUploader = new FileUploader({
    url: URL,
    //headers: [{name:'Access-Control-Allow-Origin', value: 'http://localhost:4200'}],
    /*headers: [{name:'Access-Control-Allow-Origin', value: '*'},
              {name:'Access-Control-Allow-Credentials', value: 'true'}],*/
    isHTML5: true
  });
  
  ngOnInit() {    
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      //file.withCredentials = true;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details ->>:', item);
      //this.toastr.success('File successfully uploaded!');
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);    
  }
  
  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    console.log('Server response ->>:');
    let data = JSON.parse(response); //success server response
    console.log(data.toString());
    this.filesUrl.f_url_download = 'http://192.168.111.41:30909/upload/' + data.toString();
    this.itsStartExport = false;
    this.itsDone = true;
    this.isLoading = false;
    this.uploader.clearQueue();
    console.log('this.itsDone ->>:',this.itsDone);
  }

  triggerStart(): void {
    console.log('start');
    this.itsStartExport = true;
    this.isLoading = true;
    this.uploader.uploadAll();
  }


  constructor(private backApi: BackAPIService) {
    this.range.valueChanges
      .subscribe(val => {
        this.onDateChange(val);
      });

    /*this.searchControl.valueChanges.pipe(
      debounceTime(500)).subscribe(val => {
      this.onDateChangeSupID(val);
    });*/
    this.searchControl.valueChanges.subscribe(val => {
      this.onDateChangeSupID(val);
    });

  }
  

  clearSupID(): void {
    this.searchControl.setValue('');    
    this.originDataSource.data = []
    this.notOriginDataSource.data = []
    this.isLoading = false;
  }

  onDateChange(val: any) {
    if (!val.start || !val.end){
      return;
    }
    const startDate = val.start;
    const endDate = val.end;
    console.log('Дата начала:', startDate);
    console.log('Дата окончания:', endDate);    
    //this.isLoading = true;    
    // this.uploader = new FileUploader({
    //   url: `${URL}?start_date=${startDate?.toLocaleDateString('en-CA')}&end_date=${endDate?.toLocaleDateString('en-CA')}`,            
    //   /*headers: [{name:'Access-Control-Allow-Origin', value: '*'},
    //             {name:'Access-Control-Allow-Methods', value: 'GET,HEAD,OPTIONS,POST,PUT'},
    //             {name:'Access-Control-Allow-Headers', value: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'}],*/
    //   isHTML5: true
    // });
    this.uploader.setOptions({url:`${URL}?start_date=${startDate?.toLocaleDateString('en-CA')}&end_date=${endDate?.toLocaleDateString('en-CA')}`})
  }

  onDateChangeSupID(val: any) {    
    if (!this.range.controls.start.value || !this.range.controls.end.value || !val){
      this.originDataSource.data = []
      this.notOriginDataSource.data = []
      this.isLoading = false;
      return
    }
    this.isLoading = true;
    this.backApi.getSupStatV2(Number(val), this.range.controls.start.value, this.range.controls.end.value)
      .subscribe(response => {
        const _supStatResponse = <ISupStatResponse>response      
        this.originDataSource.data = _supStatResponse.origin
        this.notOriginDataSource.data = _supStatResponse.not_origin
        this.isLoading = false;
        console.log('onDateChangeSupID done')
      });
  }
}

