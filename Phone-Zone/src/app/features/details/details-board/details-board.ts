import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { DetailsPhoneContent } from '../details-phone-content/details-phone-content';
import { DetailsCommentsSection } from '../details-comments-section/details-comments-section';
import { AuthService, PhoneService } from '../../../core/services';
import { Loader } from '../../../shared';
import { ActivatedRoute } from '@angular/router';
import { Edit } from '../edit/edit';
import { catchError, of, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-details-board',
  imports: [DetailsPhoneContent, DetailsCommentsSection, Loader,Edit],
  templateUrl: './details-board.html',
  styleUrl: './details-board.css',
})
export class DetailsBoard {
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private phoneService = inject(PhoneService);

 
  isLoading = signal(true);
  isEditMode = signal(false);
  error = signal<string | null>(null);

 
  phone = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        this.isLoading.set(true);
        this.error.set(null);
        const id = params.get('id');
        return id ? this.phoneService.getPhoneDetails(id) : of(null);
      }),
      catchError(err => {
        this.error.set(err.message || 'Failed to load phone details');
        this.isLoading.set(false);
        return of(null);
      }),
      tap(() => this.isLoading.set(false)),
      takeUntilDestroyed(this.destroyRef)
    ),
    { initialValue: null }
  );

 
  isPhoneOwner = computed(() => {
    const phone = this.phone();
    return phone ? this.authService.isOwner(phone.userId) : false;
  });

  
  isLoggedIn = this.authService.isLoggedIn;

  onEditPhone() {
    this.isEditMode.set(true);
  }

   handleEditModeChange(newMode: boolean) {
    this.isEditMode.set(newMode);
  }

  onDeletePhone() {
    console.log('Delete');
    
  }
}
