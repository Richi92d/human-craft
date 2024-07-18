import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Esn } from '../interfaces/esn.model';
import { Resume } from '../interfaces/resume.model';

@Injectable({
  providedIn: 'root'
})
export class EsnListService {

  constructor(private httpClient: HttpClient) { }

  public getConsultantInfo(): Observable<Esn[]> {
    return this.httpClient.get<Esn[]>('http://localhost:3000/all-resumes');
  }

  public esnDetail(): Observable<Resume[]> {
    return this.httpClient.get<Resume[]>('http://localhost:3000/visible-resumes');
  }
}
