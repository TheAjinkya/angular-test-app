import { Injectable } from '@angular/core';
import { RebootSchedule } from '../app.model';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RebootService {
  scheduleReboot(schedule: RebootSchedule): Observable<void> {
    console.log('Reboot scheduled:', schedule);
    return of(void 0).pipe(delay(600));
  }
}
