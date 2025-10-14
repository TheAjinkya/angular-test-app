import { Injectable } from '@angular/core';
import { Server } from '../app.model';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  getServers(): Observable<Server[]> {
    const servers: Server[] = [
      { id: 'srv1', name: 'Web Server 1', status: 'online' },
      { id: 'srv2', name: 'Database Server', status: 'offline' },
      { id: 'srv3', name: 'Cache Server', status: 'maintenance' }
    ];
    return of(servers).pipe(delay(300));
  }
}
