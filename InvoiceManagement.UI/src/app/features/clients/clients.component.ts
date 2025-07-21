import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AddClientDialogComponent } from '../../features/clients/add-client-dialog/add-client-dialog.component';
import { ClientService } from '../../core/services/client.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientComponent {
  private dialog = inject(MatDialog);
  private clientService = inject(ClientService);

  clients: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getAllClients().subscribe((res) => {
      this.clients = res;
    });
  }

  openAddDialog(client?: any) {
    const dialogRef = this.dialog.open(AddClientDialogComponent, {
      width: '800px',
      // maxWidth: '90vw',
      // maxHeight: '90vh',
      data: client || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.successMessage = result;
        this.loadClients();
        setTimeout(() => this.successMessage = '', 3000);
      }
    });
  }

  deleteClient(clientId: number) {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(clientId).subscribe({
        next: () => {
          this.loadClients();
          this.successMessage = 'Client deleted successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete client. You have an existing Project with this client.';
          setTimeout(() => this.errorMessage = '', 4000);
        }
      });
    }
  }
}