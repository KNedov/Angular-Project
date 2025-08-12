import { Component, DestroyRef, inject, OnInit, Signal, signal } from '@angular/core';
import { DetailsPhoneContent } from '../details-phone-content/details-phone-content';
import { DetailsCommentsSection } from '../details-comments-section/details-comments-section';
import { AuthService, PhoneService } from '../../../core/services';
import { Loader } from '../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Edit } from '../edit/edit';
import { Observable, of, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { Phone } from '../../../models';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-board',
  imports: [
    DetailsPhoneContent,
    DetailsCommentsSection,
    Loader,
    AsyncPipe,
    Edit,
    MatIconModule,
  ],
  templateUrl: './details-board.html',
  styleUrl: './details-board.css',
})
export class DetailsBoard implements OnInit{
  location = inject(Location);
  back() {
    this.location.back();
  }
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private phoneService = inject(PhoneService);
  private route = inject(Router);

  isPhoneOwner: Signal<boolean> = this.authService.isOwner;
  phone$: Observable<Phone | null> = this.phoneService.phone$;
  isLoggedIn = this.authService.isLoggedIn;
  isEditMode = this.phoneService.isEditMode;
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          return id ? this.phoneService.getPhoneDetails(id) : of(null);
        }),
        tap((phone) => {
          if (phone) {
            this.authService.getIsOwner(phone.userId);
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  onEditPhone() {
    this.isEditMode.set(true);
  }

  onDeletePhone() {
    const phoneId = this.phoneService.getPathPhoneId(this.activatedRoute);
    this.phoneService.deletePhone(phoneId).subscribe({
      next: () => {
        this.route.navigate(['/products/phones']);
      },
    });
  }
}
