import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-reboot-time-picker',
  imports: [
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './reboot-time-picker.html',
  styleUrl: './reboot-time-picker.scss'
})
export class RebootTimePicker implements OnInit, OnDestroy {
  @Output() timeSelected = new EventEmitter<Date>();

  mode: string = '';
  dateCtrl = new FormControl(new Date());
  timeCtrl = new FormControl('00:00');
  minDate = new Date();
  minTime = this.getCurrentTimeString();
  private timerId?: any;

  ngOnInit() {
    this.dateCtrl.valueChanges.subscribe(() => {
      this.updateMinTime();
      this.validateDate();
      this.validateTime();
      this.emitIfReady();
    });

    this.timeCtrl.valueChanges.subscribe(() => {
      this.validateTime();
      this.emitIfReady();
    });

    this.timerId = setInterval(() => {
      this.updateMinTime();
      this.validateTime();
      this.emitIfReady();
    }, 60 * 1000); 
  }

  onModeChange(v: 'now' | 'later') {
    this.mode = v;
    console.log("mode", this.mode)
    if (v === 'now') {
      this.timeSelected.emit(new Date());
    } else {
      this.timeSelected.emit();
      this.emitIfReady();
    }
  }

  emitIfReady() {
    if (this.mode !== 'later') return;

    const d = this.dateCtrl.value;
    const t = this.timeCtrl.value;
    if (!d || !t || this.dateCtrl.invalid || this.timeCtrl.invalid) return;

    const [h, m] = t.split(':').map(Number);
    const dt = new Date(d);
    dt.setHours(h, m, 0);

    if (dt.getTime() < new Date().getTime()) return;
    this.timeSelected.emit(dt);
  }

  updateMinTime() {
    const selectedDate = this.dateCtrl.value;
    const today = new Date();

    if (!selectedDate) return;

    const isToday =
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear();

    this.minTime = isToday ? this.getCurrentTimeString() : '00:00';
  }

  validateDate() {
    const date = this.dateCtrl.value;
    if (!date) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      this.dateCtrl.setErrors({ pastDate: true });
    } else {
      this.dateCtrl.setErrors(null);
    }
  }

  validateTime() {
    const date = this.dateCtrl.value;
    const time = this.timeCtrl.value;
    if (!date || !time) return;

    const [h, m] = time.split(':').map(Number);
    const dt = new Date(date);
    dt.setHours(h, m, 0);

    if (dt < new Date()) {
      this.timeCtrl.setErrors({ pastTime: true });
    } else {
      this.timeCtrl.setErrors(null);
    }
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  private getCurrentTimeString(): string {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  }
}
