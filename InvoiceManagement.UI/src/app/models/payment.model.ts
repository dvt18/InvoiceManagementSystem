export interface Payment {
    paymentId: any;
    clientName: any;
    projectName: any;
    id: number;
    invoiceId: number;
    amountPaid: number;
    paymentDate: Date;
    method: 'BankTransfer' | 'UPI' | 'Cash' | 'Cheque';
}