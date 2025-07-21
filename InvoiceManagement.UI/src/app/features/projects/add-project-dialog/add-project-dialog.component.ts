import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from '../../../models/project.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../../core/services/project.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Client } from '../../../models/client.model';
import { ClientService } from '../../../core/services/client.service';

@Component({
  selector: 'app-add-project-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatDialogModule, 
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './add-project-dialog.component.html',
  styleUrl: './add-project-dialog.component.scss'
})
export class AddProjectDialogComponent implements OnInit {
  form: FormGroup;
  clients: Client[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project | null,
    private projectService: ProjectService,
    private clientServices: ClientService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [data?.name || '', Validators.required],
      startDate: [data?.startDate ? new Date(data.startDate) : null, Validators.required],
      endDate: [data?.endDate ? new Date(data.endDate) : null, Validators.required],
      clientId: [data?.clientId || '', Validators.required],
    });
  }

  ngOnInit(): void {
      this.clientServices.getAllClients().subscribe((clients) => {
        this.clients = clients;
      })
  }

  onSubmit(): void {
    if (this.data) {
      this.projectService.update(this.data.projectId, this.form.value).subscribe({
        next: () => {
          this.successMessage = 'Project updated successfully!';
          // setTimeout(() => { this.successMessage = '' }, 2000);
          this.dialogRef.close(this.successMessage);
        },
        error: (error) => {
          this.errorMessage = 'An error occurred while updating the project.';
          setTimeout(() => { this.errorMessage = '' }, 2000);
        }
      });
    } else {
      this.projectService.create(this.form.value).subscribe({
        next: () => {
          this.successMessage = 'Project added successfully!';
          this.dialogRef.close(this.successMessage);
        },
        error: (error) => {
          this.errorMessage = 'An error occurred while adding the project.';
          setTimeout(() => { this.errorMessage = '' }, 2000);
        }
      });
    }
  }
}
