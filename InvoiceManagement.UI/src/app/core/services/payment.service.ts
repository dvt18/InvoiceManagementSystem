import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Payment } from "../../models/payment.model";
import { environment } from "../../../environment/environment";

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private baseUrl = `${environment.apiUrl}/payments`;

    constructor(private http: HttpClient) {}

    getPayments(): Observable<Payment[]> {
        return this.http.get<Payment[]>(this.baseUrl);
    }

    getPaymentById(id: number): Observable<Payment> {
        return this.http.get<Payment>(`${this.baseUrl}/${id}`);
    }

    createPayment(payment: Payment): Observable<Payment> {
        return this.http.post<Payment>(this.baseUrl, payment);
    }

    updatePayment(payment: Payment): Observable<Payment> {
        return this.http.put<Payment>(`${this.baseUrl}/${payment.id}`, payment);
    }

    deletePayment(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}