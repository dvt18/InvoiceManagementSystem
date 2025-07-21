import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InvoiceService } from '../../../core/services/invoice.service';
import { Invoice } from '../../../models/invoice.model';
import { PaymentService } from '../../../core/services/payment.service';

@Component({
  selector: 'app-add-payment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  templateUrl: './add-payment-dialog.component.html',
  styleUrl: './add-payment-dialog.component.scss'
})
export class AddPaymentDialogComponent implements OnInit {
  form!: FormGroup;
  invoices: Invoice[] = [];
  methods = ['Cash', 'UPI', 'Bank Transfer', 'Cheque'];

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private paymentService: PaymentService,
    private dialogRef: MatDialogRef<AddPaymentDialogComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      amountPaid: [null, [Validators.required, Validators.min(1)]],
      method: ['', Validators.required],
      paymentDate: [new Date(), Validators.required],
      invoiceId: [null, Validators.required]
    });

    this.invoiceService.getAll().subscribe({
      next: (data) => this.invoices = data,
      error: () => this.invoices = []
    });
  }

  save(): void {
    if (this.form.valid) {
      this.paymentService.createPayment(this.form.value).subscribe(() => {
        this.dialogRef.close(this.form.value);
        console.log(this.form.value);
      })
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
