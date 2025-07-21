import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DecimalPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  clientCount = 0;
  pendingPayment = 0;
  invoiceCount = 0;
  totalPayment = 0;
  overduePayment = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary(): void {
    this.http.get<any>('http://localhost:5139/api/dashboard/summary').subscribe({
      next: (data) => {
        this.clientCount = data.clients;
        this.pendingPayment = data.pendingPayments;
        this.invoiceCount = data.invoices;
        this.totalPayment = data.payments;
        this.overduePayment = data.overduePayments;
      },
      error: (error) => {
        console.error('Error loading summary:', error);
      }
    });
  }
}
