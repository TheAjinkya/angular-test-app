import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { RebootTimePicker } from './reboot-time-picker';

describe('RebootTimePicker', () => {
  let component: RebootTimePicker;
  let fixture: ComponentFixture<RebootTimePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        RebootTimePicker
      ],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(RebootTimePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default mode to empty string', () => {
    expect(component.mode).toBe('');
  });

  it('should emit current date when mode is "now"', () => {
    spyOn(component.timeSelected, 'emit');
    component.onModeChange('now');
    expect(component.timeSelected.emit).toHaveBeenCalled();
    const emittedDate: Date = (component.timeSelected.emit as jasmine.Spy).calls.mostRecent().args[0];
    expect(emittedDate).toBeInstanceOf(Date);
  });

  it('should block past date', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    component.dateCtrl.setValue(pastDate);
    component.validateDate();
    expect(component.dateCtrl.hasError('pastDate')).toBeTrue();
  });

  it('should allow today or future date', () => {
    const today = new Date();
    component.dateCtrl.setValue(today);
    component.validateDate();
    expect(component.dateCtrl.hasError('pastDate')).toBeFalse();

    const future = new Date();
    future.setDate(future.getDate() + 1);
    component.dateCtrl.setValue(future);
    component.validateDate();
    expect(component.dateCtrl.hasError('pastDate')).toBeFalse();
  });

  it('should block past time if date is today', () => {
    const today = new Date();
    component.dateCtrl.setValue(today);

    // time in the past
    const pastHour = new Date();
    pastHour.setHours(pastHour.getHours() - 1);
    const pastTime = `${String(pastHour.getHours()).padStart(2, '0')}:${String(pastHour.getMinutes()).padStart(2, '0')}`;
    component.timeCtrl.setValue(pastTime);
    component.validateTime();
    expect(component.timeCtrl.hasError('pastTime')).toBeTrue();
  });

  it('should allow future time if date is today', () => {
    const today = new Date();
    component.dateCtrl.setValue(today);

    const futureHour = new Date();
    futureHour.setHours(futureHour.getHours() + 1);
    const futureTime = `${String(futureHour.getHours()).padStart(2, '0')}:${String(futureHour.getMinutes()).padStart(2, '0')}`;
    component.timeCtrl.setValue(futureTime);
    component.validateTime();
    expect(component.timeCtrl.hasError('pastTime')).toBeFalse();
  });

  it('should emit valid datetime for "later" mode', () => {
    spyOn(component.timeSelected, 'emit');
    component.onModeChange('later');

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    component.dateCtrl.setValue(futureDate);
    component.timeCtrl.setValue('12:30');

    component.emitIfReady();

    expect(component.timeSelected.emit).toHaveBeenCalled();
    const emittedDate: Date = (component.timeSelected.emit as jasmine.Spy).calls.mostRecent().args[0];
    expect(emittedDate.getDate()).toBe(futureDate.getDate());
    expect(emittedDate.getHours()).toBe(12);
    expect(emittedDate.getMinutes()).toBe(30);
  });
});
