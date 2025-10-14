import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RebootSchedule, Server } from './app.model';
import { RebootService } from './services/reboot-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ServerSelect } from './server-select/server-select';
import { RebootTimePicker } from './reboot-time-picker/reboot-time-picker';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    ServerSelect,
    RebootTimePicker
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  selectedServer?: Server;
  scheduledAt?: Date;
  busy = false;

  constructor(private reboot: RebootService, private snack: MatSnackBar) { }

  onServer(s: Server) { this.selectedServer = s; }
  onTime(d: Date) { this.scheduledAt = d; }
  canSubmit() { return !!this.selectedServer && !!this.scheduledAt; }

  schedule() {
    if (!this.canSubmit()) return;
    this.busy = true;
    const payload: RebootSchedule = {
      serverId: this.selectedServer!.id,
      scheduledAt: this.scheduledAt!
    };
    this.reboot.scheduleReboot(payload).subscribe({
      next: () => {
        this.busy = false;
        this.snack.open(
          `Reboot scheduled for ${this.selectedServer!.name} at ${this.scheduledAt}`,
          'Close', { duration: 4000 }
        );
      },
      error: err => {
        this.busy = false;
        this.snack.open(`Error: ${err.message}`, 'Close', { duration: 4000 });
      }
    });
  }
}
