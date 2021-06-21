import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable()
export class TicketService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  loadTickets() {
    return this.http.get(`${this.apiUrl}/tickets/`)
      .pipe(map((o: any) => o));
  }
  addTicket(ticket) {
    return this.http.post(`${this.apiUrl}/tickets/`, ticket)
      .pipe(map((o: any) => o));
  }
}
