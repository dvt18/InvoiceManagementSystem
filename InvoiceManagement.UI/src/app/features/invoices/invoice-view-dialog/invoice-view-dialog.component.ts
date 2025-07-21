import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Invoice } from '../../../models/invoice.model';

@Component({
  selector: 'app-invoice-view-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    DatePipe
],
  templateUrl: './invoice-view-dialog.component.html',
  styleUrl: './invoice-view-dialog.component.scss'
})
export class InvoiceViewDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Invoice,
    private dialogRef: MatDialogRef<InvoiceViewDialogComponent>
  ) {}
  
  close() {
    this.dialogRef.close();
  }

  print() {
    window.print();
  }

  getSubtotal(): number {
    const taxPercent = this.data.taxPercent || 0;
    return this.data.amount / (1 + taxPercent / 100);
  }

  getTaxAmount(): number {
    return this.data.amount - this.getSubtotal();
  }

}
