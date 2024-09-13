import { Component } from '@angular/core';
import { DocsBreadcrumbComponent } from '../../docs-breadcrumb/docs-breadcrumb.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DocsBreadcrumbComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
