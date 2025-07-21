import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../models/project.model';
import { MatIconModule } from '@angular/material/icon';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatTableModule, 
    MatIconModule, 
    MatNativeDateModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatDialogModule, 
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent implements OnInit{
  private dialog = inject(MatDialog);
  private projectService = inject(ProjectService);

  projects: Project[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getAll().subscribe(( res ) => {
      this.projects = res;
    });
  }

  openDialog(project?:Project): void {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: '800px',
      data: project || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.successMessage = result;
        this.loadProjects();
        setTimeout(() => this.successMessage = '', 3000);
      }
    });
  }

  deleteProject(projectId: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.delete(projectId).subscribe({
        next: () => {
          this.loadProjects();
          this.successMessage = 'Project deleted successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete project. You have an existing Invoice with this project.';
          setTimeout(() => this.errorMessage = '', 4000);
        }
      });
    }
  }
}
