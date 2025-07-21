import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../../core/services/client.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-add-client-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatDialogModule, 
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.scss'],
})
export class AddClientDialogComponent {
  form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<AddClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client | null,
  ) {
    this.form = this.fb.group({
      name: [data?.name || ''],
      email: [data?.email || ''],
      phone: [data?.phone || ''],
      address: [data?.address || ''],
      type: [data?.type || 'Client'],
    });
  }

  save() {
    this.errorMessage = '';
    this.successMessage = '';
    if (this.data) {
      this.clientService.updateClient(this.data.clientId, this.form.value).subscribe({
        next: () => {
          this.successMessage = 'Client updated successfully!';
          this.dialogRef.close(this.successMessage);
        },
        error: (err) => {
          this.errorMessage = 'An error occurred while updating the client.';
          setTimeout(() => { this.errorMessage = '' }, 2000);
        }
      });
    } else {
      this.clientService.addClient(this.form.value).subscribe({
        next: () => {
          this.successMessage = 'Client added successfully!';
          this.dialogRef.close(this.successMessage);
        },
        error: (err) => {
          this.errorMessage = 'Invalid Email Format.';
          setTimeout(() => { this.errorMessage = '' }, 2000);
        }
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}