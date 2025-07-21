import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Invoice } from "../../models/invoice.model";

@Injectable({providedIn: 'root'})
export class InvoiceService{
    private baseUrl = "http://localhost:5139/api/invoices";

    constructor(private http: HttpClient) {}

    getAll(): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(this.baseUrl);
    }

    add(invoice: Invoice): Observable<any> {
        return this.http.post<any>(this.baseUrl, invoice);
    }

    update(invoice: Invoice): Observable<Invoice> {
        return this.http.put<Invoice>(`${this.baseUrl}/${invoice.invoiceId}`, invoice);
    }

    delete(invoiceId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${invoiceId}`);
    }






    
    // downloadPdf(invoiceId: number): void {
    //     this.http.get(`${this.baseUrl}/${invoiceId}/download`, { responseType: 'blob' }).subscribe(blob => {
    //     const url = window.URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = `invoice-${invoiceId}.pdf`;
    //     a.click();
    //     document.body.removeChild(a);
    //     window.URL.revokeObjectURL(url);
    // });
}