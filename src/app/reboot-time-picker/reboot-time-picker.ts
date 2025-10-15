import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-reboot-time-picker',
  imports: [ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './reboot-time-picker.html',
  styleUrl: './reboot-time-picker.scss'
})
export class RebootTimePicker {
  @Output() timeSelected = new EventEmitter<Date>();
  mode: string = '';
  dateCtrl = new FormControl(new Date());
  timeCtrl = new FormControl('00:00');

  ngOnInit() {
    this.dateCtrl.valueChanges.subscribe(() => this.emitIfReady());
    this.timeCtrl.valueChanges.subscribe(() => this.emitIfReady());
  }

  onModeChange(v: 'now' | 'later') {
    this.mode = v;
    if (v === 'now') this.timeSelected.emit(new Date());
    else this.emitIfReady();
  }

  emitIfReady() {
    if (this.mode !== 'later') return;
    const d = this.dateCtrl.value;
    const t = this.timeCtrl.value;
    if (!d || !t) return;
    const [h, m] = t.split(':').map(Number);
    const dt = new Date(d);
    dt.setHours(h, m, 0);
    this.timeSelected.emit(dt);
  }
}
