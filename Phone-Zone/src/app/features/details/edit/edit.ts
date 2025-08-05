import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PhoneService } from '../../../core/services';
import { CreatePhoneService } from '../../create/createPhone.form';
import { ActivatedRoute } from '@angular/router';
import { Phone } from '../../../models';
import { Loader } from '../../../shared';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule,Loader],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {
  @Input() phone!: Phone;
  @Input({ required: true }) isEditMode!: boolean;
  @Output() isEditModeChange = new EventEmitter<boolean>();

  private phoneService = inject(PhoneService);
  private route = inject(ActivatedRoute);
  private createPhoneFormService = inject(CreatePhoneService);
  editForm: FormGroup = this.createPhoneFormService.createForm();

 ngOnInit(){
  this.editForm.patchValue(this.phone)
 }

  onSubmit() {
    if (this.editForm.valid) {
      this.phoneService
        .editPhone(
          this.editForm.value,
          this.route.snapshot.params['id']
        )
        .subscribe({
          next: () => this.isEditModeChange.emit(false),
          error: (err) => console.error('Update failed', err),
        });
    }
  }

  onCancel() {
    this.isEditModeChange.emit(false);
  }

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
}
