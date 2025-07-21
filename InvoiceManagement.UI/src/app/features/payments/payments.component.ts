import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from '../../core/services/payment.service';
import { Payment } from '../../models/payment.model';
import { MatIcon } from "@angular/material/icon";
import { ViewPaymentDialogComponent } from './view-payment-dialog/view-payment-dialog.component';
import { AddPaymentDialogComponent } from './add-payment-dialog/add-payment-dialog.component';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIcon
],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  displayedColumns = ['id', 'invoiceId', 'amount', 'method', 'date', 'actions'];
  payments: Payment[] = [];

  constructor(private paymentService: PaymentService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.paymentService.getPayments().subscribe((data) => {
      this.payments = data;
    });
  }

  deletePayment(id: number) {
    if (confirm('Are you sure you want to delete this payment?')) {
      this.paymentService.deletePayment(id).subscribe(() => this.loadPayments());
    }
  }

  viewPayment(payment: Payment) {
    this.dialog.open(ViewPaymentDialogComponent, {
      width: '800px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: payment
    });
    console.log(payment);
  }

  addPayment() {
    const dialogRef = this.dialog.open(AddPaymentDialogComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPayments();
      }
    });
  }
}