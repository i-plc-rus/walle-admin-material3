import { Routes } from '@angular/router';
import { DifSupidWeekComponent } from './pages/dif-supid-week/dif-supid-week.component';
import { SkuOriginalComponent } from './pages/sku-original/sku-original.component';
import { SkuNotOriginalComponent } from './pages/sku-not-original/sku-not-original.component';
import { HomeComponent } from './pages/home/home.component';
import { DifSupidDateComponent } from './pages/dif-supid-date/dif-supid-date.component';
import { AkvSaleComponent } from './pages/akv-sale/akv-sale.component';

export const routes: Routes = [{path: '', component: HomeComponent},
    {path: 'dif', redirectTo: 'dif/supid-week', pathMatch: 'full'},
    {path: 'dif/supid-week', component: DifSupidWeekComponent},    
    {path: 'dif/supid-date', component: DifSupidDateComponent},    
    {path: 'sku', redirectTo: 'sku/original', pathMatch: 'full'},
    {path: 'sku/original', component: SkuOriginalComponent},
    {path: 'sku/not-original', component: SkuNotOriginalComponent},
    {path: 'rep', redirectTo: 'rep/akv-sale', pathMatch: 'full'},
    {path: 'rep/akv-sale', component: AkvSaleComponent},
];
