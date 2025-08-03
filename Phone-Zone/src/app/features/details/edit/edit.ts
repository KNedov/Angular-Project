import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Phone } from '../../../models';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService, PhoneService } from '../../../core/services';
import { CreatePhoneService } from '../../create/createPhone.form';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {
 @Input({ required: true }) isEditMode!: boolean;
@Output() isEditModeChange = new EventEmitter<boolean>()

  phone!: Phone;
  error: string | null = null;
  id: string = '';

  private createPhoneFormService = inject(CreatePhoneService);

  private route = inject(ActivatedRoute);
  private phoneService = inject(PhoneService);
  private authService = inject(AuthService);
  editForm: FormGroup = this.createPhoneFormService.createForm();

  isFormValid(): boolean {
    return this.createPhoneFormService.isFormValid(this.editForm);
  }

  get phoneNameErrorMessage(): string {
    return this.createPhoneFormService.getPhoneNameErrorMessage(this.editForm);
  }
  get displaySizeErrorMessage(): string {
    return this.createPhoneFormService.getDisplaySizeErrorMessage(
      this.editForm
    );
  }
  get colorErrorMessage(): string {
    return this.createPhoneFormService.getColorErrorMessage(this.editForm);
  }
  get cpuErrorMessage(): string {
    return this.createPhoneFormService.getCpuErrorMessage(this.editForm);
  }
  get ramErrorMessage(): string {
    return this.createPhoneFormService.getRamErrorMessage(this.editForm);
  }
  get storageErrorMessage(): string {
    return this.createPhoneFormService.getStorageErrorMessage(this.editForm);
  }
  get priceErrorMessage(): string {
    return this.createPhoneFormService.getPriceErrorMessage(this.editForm);
  }
  get imageUrlErrorMessage(): string {
    return this.createPhoneFormService.getImageErrorMessage(this.editForm);
  }

  get phoneNameIsValid(): boolean {
    return this.createPhoneFormService.isPhoneNameError(this.editForm);
  }
  get displaySizeIsValid(): boolean {
    return this.createPhoneFormService.isDisplaySizeError(this.editForm);
  }
  get colorIsValid(): boolean {
    return this.createPhoneFormService.isColorError(this.editForm);
  }
  get cpuIsValid(): boolean {
    return this.createPhoneFormService.isCpuError(this.editForm);
  }
  get ramIsValid(): boolean {
    return this.createPhoneFormService.isRamError(this.editForm);
  }
  get storageIsValid(): boolean {
    return this.createPhoneFormService.isStorageError(this.editForm);
  }
  get priceIsValid(): boolean {
    return this.createPhoneFormService.isPriceError(this.editForm);
  }
  get imageUrlIsValid(): boolean {
    return this.createPhoneFormService.isImageUrlError(this.editForm);
  }

  ngOnInit(): void {
    this.id = this.authService.getPathId(this.route);

    this.phoneService.getPhoneDetails(this.id).subscribe({
      next: (phone) => {
        this.phone = phone;
        this.editForm.patchValue(phone);
      },
      error: (err) => {
        this.error = 'Failed to load phone details';
        console.error(err);
      },
    });
  }

 onCancel() {
    this.isEditModeChange.emit(false);
  }

onSubmit() {
    if (this.editForm.valid) {
      const formValue = this.editForm.value;
      this.phoneService.editPhone(formValue, this.id).subscribe({
        next: () => {
          this.isEditModeChange.emit(false);
          console.log('Phone details updated successfully');
        },
        error: (err) => console.error('Update failed', err)
      });
    }
  }
}
