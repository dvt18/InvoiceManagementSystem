import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Project } from "../../models/project.model";
import { Observable } from "rxjs/internal/Observable";

@Injectable({providedIn: "root"})
export class ProjectService {
    private baseUrl = "http://localhost:5139/api/Projects";

    constructor(private http: HttpClient) {}

    getAll(): Observable<Project[]> {
        return this.http.get<Project[]>(this.baseUrl);
    }

    getById(id: number): Observable<Project> {
        return this.http.get<Project>(`${this.baseUrl}/${id}`);
    }

    create(project: Project): Observable<Project> {
        return this.http.post<Project>(this.baseUrl, project);
    }

    update(id: number, project: Project): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, project);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${id}`);
    }
}