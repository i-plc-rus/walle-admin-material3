import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-docs-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './docs-breadcrumb.component.html',
  styleUrl: './docs-breadcrumb.component.scss'
})
export class DocsBreadcrumbComponent implements OnInit{
  currentUrl: string = '';

  constructor(private router: Router, private route: ActivatedRoute){}
  
  ngOnInit(): void {
    // Подписка на изменения маршрута
    console.log('on init');
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Фильтруем только события завершения навигации
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url; // Обновляем текущий URL
    });

    // Устанавливаем текущий URL при загрузке компонента
    this.currentUrl = this.router.url;
    console.log(this.currentUrl);
  }
}