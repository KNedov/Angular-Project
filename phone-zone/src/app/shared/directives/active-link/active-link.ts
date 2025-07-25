import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Directive({
  selector: '[appActiveLink]'
})
export class ActiveLinkDirective implements OnInit {
  @Input() appActiveLink!: string;
  
  constructor(
    private router: Router,
    private el: ElementRef
  ) {}
  
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const isActive = this.router.isActive(this.appActiveLink, false);
      if (isActive) {
        this.el.nativeElement.classList.add('active');
      } else {
        this.el.nativeElement.classList.remove('active');
      }
    });
  }
}
