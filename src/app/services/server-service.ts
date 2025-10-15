import { Injectable } from '@angular/core';
import { Server } from '../app.model';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  getServers(): Observable<Server[]> {
    const servers: Server[] = [
      { id: 'srv1', name: 'Server 1', status: 'online' },
      { id: 'srv2', name: 'Server 2', status: 'offline' },
      { id: 'srv3', name: 'Server 3', status: 'maintenance' }
    ];
    return of(servers).pipe(delay(300));
  }
}
