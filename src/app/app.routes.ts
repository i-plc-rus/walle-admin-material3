import { Routes } from '@angular/router';
import { DifSupidWeekComponent } from './pages/dif-supid-week/dif-supid-week.component';
import { SkuOriginalComponent } from './pages/sku-original/sku-original.component';
import { SkuNotOriginalComponent } from './pages/sku-not-original/sku-not-original.component';
import { HomeComponent } from './pages/home/home.component';
import { DifSupidDateComponent } from './pages/dif-supid-date/dif-supid-date.component';
import { AkvSaleComponent } from './pages/akv-sale/akv-sale.component';
import { AkvOrderComponent } from './pages/akv-order/akv-order.component';
import { AkvBackComponent } from './pages/akv-back/akv-back.component';
import { AkvZoneComponent } from './pages/akv-zone/akv-zone.component';
import { DifSkuNameComponent } from './pages/dif-sku-name/dif-sku-name.component';
import { AkvSkuSaleComponent } from './pages/akv-sku-sale/akv-sku-sale.component';


export const routes: Routes = [{path: '', component: HomeComponent},
    {path: 'dif', redirectTo: 'dif/supid-week', pathMatch: 'full'},
    {path: 'dif/supid-week', component: DifSupidWeekComponent},    
    {path: 'dif/supid-date', component: DifSupidDateComponent},    
    {path: 'dif/dif-sku-name', component: DifSkuNameComponent},    
    {path: 'sku', redirectTo: 'dif/dif-sku-name', pathMatch: 'full'},
    // {path: 'sku/original', component: SkuOriginalComponent},
    // {path: 'sku/not-original', component: SkuNotOriginalComponent},
    {path: 'rep', redirectTo: 'rep/akv-sale', pathMatch: 'full'},
    {path: 'rep/akv-sale', component: AkvSaleComponent},
    {path: 'rep/akv-order', component: AkvOrderComponent},    
    {path: 'rep/akv-back', component: AkvBackComponent},    
    {path: 'rep/akv-zone', component: AkvZoneComponent},    
    {path: 'rep/akv-sku-sale', component: AkvSkuSaleComponent},    
];
