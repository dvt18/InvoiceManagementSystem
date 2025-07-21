import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { UsersComponent } from './features/users/users.component';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';
import { ClientComponent } from './features/clients/clients.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { InvoiceComponent } from './features/invoices/invoices.component';
import { PaymentsComponent } from './features/payments/payments.component';

export const routes: Routes = [

    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard()],
        children: [
            { 
                path: '', 
                redirectTo: 'dashboard', 
                pathMatch: 'full' 
            },
            { 
                path: 'dashboard', 
                component: DashboardComponent 
            },
            { 
                path: 'users', 
                component: UsersComponent 
            },
            { 
                path: 'clients', 
                component: ClientComponent 
            },
            {
                path: 'projects',
                component: ProjectsComponent
            },
            {
                path: 'invoices',
                component: InvoiceComponent
            },
            {
                path: 'payments',
                component: PaymentsComponent
            }

        ]
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: 'register', 
        component: RegisterComponent 
    },
    { 
        path: '**', 
        redirectTo: 'login' 
    }
];
