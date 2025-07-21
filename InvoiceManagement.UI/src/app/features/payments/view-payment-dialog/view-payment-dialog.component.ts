import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Payment } from '../../../models/payment.model';

@Component({
  selector: 'app-view-payment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './view-payment-dialog.component.html',
  styleUrl: './view-payment-dialog.component.scss'
})
export class ViewPaymentDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA)public data:Payment) {}
}
