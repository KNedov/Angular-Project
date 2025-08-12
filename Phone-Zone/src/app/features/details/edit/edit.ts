import {
  Component,
  inject,
  Input,
  OnInit,

} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PhoneService } from '../../../core/services';
import { PhoneFormService } from '../../create/phoneForm';
import { ActivatedRoute } from '@angular/router';
import { Phone } from '../../../models';
import { Loader } from '../../../shared';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, Loader],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit implements OnInit {
  @Input() phone!: Phone;

  private phoneService = inject(PhoneService);
  private route = inject(ActivatedRoute);
  private phoneFormService = inject(PhoneFormService);
  editForm: FormGroup = this.phoneFormService.createForm();
  phone$ = this.phoneService.phone$;
  isEditMode = this.phoneService.isEditMode;

  ngOnInit() {
    this.editForm.patchValue(this.phone);
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.phoneService
        .editPhone(this.editForm.value, this.phoneService.getPathPhoneId(this.route))
        .subscribe({
          next: () => this.isEditMode.set(false),
        });
    }
  }

  onCancel() {
    this.isEditMode.set(false);
  }

  isFormValid(): boolean {
    return this.phoneFormService.isFormValid(this.editForm);
  }

  get phoneNameErrorMessage(): string {
    return this.phoneFormService.getPhoneNameErrorMessage(this.editForm);
  }
  get displaySizeErrorMessage(): string {
    return this.phoneFormService.getDisplaySizeErrorMessage(this.editForm);
  }
  get colorErrorMessage(): string {
    return this.phoneFormService.getColorErrorMessage(this.editForm);
  }
  get cpuErrorMessage(): string {
    return this.phoneFormService.getCpuErrorMessage(this.editForm);
  }
  get ramErrorMessage(): string {
    return this.phoneFormService.getRamErrorMessage(this.editForm);
  }
  get storageErrorMessage(): string {
    return this.phoneFormService.getStorageErrorMessage(this.editForm);
  }
  get priceErrorMessage(): string {
    return this.phoneFormService.getPriceErrorMessage(this.editForm);
  }
  get imageUrlErrorMessage(): string {
    return this.phoneFormService.getImageErrorMessage(this.editForm);
  }

  get phoneNameIsValid(): boolean {
    return this.phoneFormService.isPhoneNameError(this.editForm);
  }
  get displaySizeIsValid(): boolean {
    return this.phoneFormService.isDisplaySizeError(this.editForm);
  }
  get colorIsValid(): boolean {
    return this.phoneFormService.isColorError(this.editForm);
  }
  get cpuIsValid(): boolean {
    return this.phoneFormService.isCpuError(this.editForm);
  }
  get ramIsValid(): boolean {
    return this.phoneFormService.isRamError(this.editForm);
  }
  get storageIsValid(): boolean {
    return this.phoneFormService.isStorageError(this.editForm);
  }
  get priceIsValid(): boolean {
    return this.phoneFormService.isPriceError(this.editForm);
  }
  get imageUrlIsValid(): boolean {
    return this.phoneFormService.isImageUrlError(this.editForm);
  }
}
