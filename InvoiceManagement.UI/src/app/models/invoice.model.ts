
export interface Invoice {
    invoiceId: number;
    clientName: string;
    clientEmail: string;
    clientAddress: string;
    clientType: string;
    projectName: string;
    projectId: number;
    amount: number;
    invoiceDate: Date;
    dueDate: Date;
    status: 'Pending' | 'Paid' | 'Overdue';
    totalPaid: number;
    balanceDue: number;
    taxPercent: number;
}