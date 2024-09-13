import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-secondary-navigation',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './secondary-navigation.component.html',
  styleUrls: ['./secondary-navigation.component.scss','./navigation-list.component.scss']
})
export class SecondaryNavigationComponent implements OnInit{
  currentUrl: string = '';

  constructor(private router: Router, private route: ActivatedRoute){}  
  
  ngOnInit(): void {
    // Получаем текущий URL
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }


}
