import { Directive, ElementRef, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';

@Directive({
  selector: '[appActiveLink]',
})
export class ActiveLink {
  @Input() appActiveLink!: string;
  @Input() exact: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.updateActiveState();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveState();
      });
  }

  private updateActiveState() {
    const currentUrl = this.router.url;
    let isActive: boolean;

    if (this.exact) {
      isActive = this.router.url === this.appActiveLink;
    } else {
      isActive = this.router.isActive(this.appActiveLink, false);

     
    }
    if (isActive) {
      this.el.nativeElement.classList.add('active');
    } else {
      this.el.nativeElement.classList.remove('active');
    }
  }
}
