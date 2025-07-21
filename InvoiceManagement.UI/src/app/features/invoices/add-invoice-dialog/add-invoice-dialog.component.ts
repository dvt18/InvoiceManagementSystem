import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Invoice } from '../../../models/invoice.model';
import { InvoiceService } from '../../../core/services/invoice.service';
import { ProjectService } from '../../../core/services/project.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ClientService } from '../../../core/services/client.service';

@Component({
  selector: 'app-add-invoice-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './add-invoice-dialog.component.html',
  styleUrl: './add-invoice-dialog.component.scss'
})

export class AddInvoiceDialogComponent implements OnInit {
  invoiceForm!: FormGroup;
  projects: any[] = [];
  clients: any[] = [];
  // statusOptions = [ 'Pending', 'Paid', 'Overdue' ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddInvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Invoice | null,
    private invoiceService: InvoiceService,
    private projectService: ProjectService,
    private clientService: ClientService,
  ) {}

  ngOnInit(): void {
      this.loadProjects();
      this.loadClients();

      this.invoiceForm = this.fb.group({
        amount: [this.data?.amount || null, [Validators.required]],
        invoiceDate: [this.data?.invoiceDate ? new Date(this.data.invoiceDate) : new Date(), [Validators.required]],
        dueDate: [this.data?.dueDate ? new Date(this.data?.dueDate) : null, [Validators.required]],
        status: [this.data?.status || 'Pending', [Validators.required]],
        projectId: [this.data?.projectId || null, [Validators.required]],
        clientName: [this.data?.clientName || '', [Validators.required]],
        clientEmail: [this.data?.clientEmail || '', [Validators.required]],
        totalPaid: [this.data?.totalPaid || 0],
        balanceDue: [this.data?.balanceDue || 0],
        clientType: [this.data?.clientType || '', [Validators.required]],
        taxPercent: [this.data?.taxPercent || null, [Validators.min(0), Validators.max(100)]],
    });
  }

  loadProjects() {
    this.projectService.getAll().subscribe((projects) => {
      this.projects = projects;
      console.log(this.projects);
    });
  }

  loadClients() {
    this.clientService.getAllClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  onProjectChange(event: any) {
    const selectedProject = this.projects.find(p => p.projectId === event.value);
    if (selectedProject) {
      const client = this.clients.find(c => c.name === selectedProject.clientName);

      this.invoiceForm.patchValue({
        clientName: selectedProject.clientName,
        clientEmail: client ? client.email : '',
        clientType: client ? client.type : '',
      });
    }
  }

  save() {
    if (this.invoiceForm.invalid) return;

      // Fix date timezone issue
      const dueDate = new Date(this.invoiceForm.value.dueDate);
      dueDate.setMinutes(dueDate.getMinutes() - dueDate.getTimezoneOffset());

    const invoiceData = {
      amount: this.getTotalAmount(),
      invoiceDate: this.invoiceForm.value.invoiceDate,
      dueDate: dueDate,
      projectId: this.invoiceForm.value.projectId,
      taxPercent: this.invoiceForm.value.taxPercent,
    };

    this.invoiceService.add(invoiceData as any).subscribe(() => {
      this.dialogRef.close(true);
      console.log(invoiceData);
    });
  }

  calculateTotals() {
    const amount = this.invoiceForm.get('amount')?.value || 0;
    const taxPercent = this.invoiceForm.get('taxPercent')?.value || 0;
  }

  getTaxAmount(): number {
    const amount = this.invoiceForm.get('amount')?.value || 0;
    const taxPercent = this.invoiceForm.get('taxPercent')?.value || 0;
    return (amount * taxPercent) / 100;
  }

  getTotalAmount(): number {
    const amount = this.invoiceForm.get('amount')?.value || 0;
    return amount + this.getTaxAmount();
  }

  cancel(){
    this.dialogRef.close(false);
  }
}
