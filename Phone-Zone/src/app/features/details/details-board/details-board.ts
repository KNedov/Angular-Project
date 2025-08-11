import { Component, DestroyRef, inject, signal } from '@angular/core';
import { DetailsPhoneContent } from '../details-phone-content/details-phone-content';
import { DetailsCommentsSection } from '../details-comments-section/details-comments-section';
import { AuthService, PhoneService } from '../../../core/services';
import { Loader } from '../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Edit } from '../edit/edit';
import {
  catchError,
  distinctUntilChanged,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { Phone } from '../../../models';
import { MatIconModule } from "@angular/material/icon";
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-board',
  imports: [
    DetailsPhoneContent,
    DetailsCommentsSection,
    Loader,
    AsyncPipe,
    Edit,
    MatIconModule
],
  templateUrl: './details-board.html',
  styleUrl: './details-board.css',
})
export class DetailsBoard {
   location=inject(Location)
back() {
 
    this.location.back();
  
}
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private phoneService = inject(PhoneService);
  private route = inject(Router);

  isLoggedIn$ = this.authService.isLoggedIn$;
  isEditMode = signal(false);
  error = signal<string | null>(null);

  phone$: Observable<Phone | null> = this.activatedRoute.paramMap.pipe(
    switchMap((params) => {
      const id = params.get('id');
      return id ? this.phoneService.getPhoneDetails(id) : of(null);
    }),
    catchError((err) => {
      this.error.set(err.message);
      return of(null);
    }),
    takeUntilDestroyed(this.destroyRef)
  );

  isPhoneOwner$ = this.phone$.pipe(
    map((phone) => (phone ? this.authService.isOwner(phone.userId) : false)),
    distinctUntilChanged()
  );

  onEditPhone() {
    this.isEditMode.set(true);
  }

  handleEditModeChange(newMode: boolean) {
    this.isEditMode.set(newMode);
    this.phone$ = this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        return id ? this.phoneService.getPhoneDetails(id) : of(null);
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  onDeletePhone() {
    const phoneId = this.phoneService.getPathPhoneId(this.activatedRoute);
    this.phoneService.deletePhone(phoneId).subscribe({
      next: () => {
        console.log('Phone deleted successfully');
        this.route.navigate(['/products/phones']);
      },
      error: (err) => {
        this.error = err.error;
      },
    });
  }
}
