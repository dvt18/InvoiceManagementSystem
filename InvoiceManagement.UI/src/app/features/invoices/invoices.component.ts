import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Invoice } from '../../models/invoice.model';
import { InvoiceService } from '../../core/services/invoice.service';
import { AddInvoiceDialogComponent } from './add-invoice-dialog/add-invoice-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { InvoiceViewDialogComponent } from './invoice-view-dialog/invoice-view-dialog.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule, 
    MatIconModule, 
    DatePipe,
  ],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss'
})

export class InvoiceComponent implements OnInit {
  invoices: Invoice[] = [];

  constructor(private invoiceService: InvoiceService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices() {
    this.invoiceService.getAll().subscribe((data) => {
      // console.log('Invoices received:', data);
      this.invoices = data;
    });
  }

  view(invoice: Invoice) {
    const dialogRef = this.dialog.open(InvoiceViewDialogComponent, {
      width: '800px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: invoice,
    });
  }

  delete(invoice: Invoice) {
    if (!invoice.invoiceId) {
      console.error('Cannot delete invoice: Invalid ID');
      return;
    }
    
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.delete(invoice.invoiceId).subscribe({
        next: () => this.loadInvoices(),
        error: (err) => console.error('Error deleting invoice:', err)
      });
    }
  }

  addInvoice() {
    const dialogRef = this.dialog.open(AddInvoiceDialogComponent, {
      width: '800px',
      maxWidth: '90vw',
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadInvoices();
      }
    });
  }
}
