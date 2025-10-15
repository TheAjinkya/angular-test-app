import { TestBed, ComponentFixture } from '@angular/core/testing';
import { App } from './app';
import { RebootService } from './services/reboot-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  let rebootServiceSpy: jasmine.SpyObj<RebootService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    rebootServiceSpy = jasmine.createSpyObj('RebootService', ['scheduleReboot']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        App,
        MatSnackBarModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: RebootService, useValue: rebootServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set selected server on onServer()', () => {
    const server = { id: '1', name: 'Test Server', status: 'online' as const };
    component.onServer(server);
    expect(component.selectedServer).toEqual(server);
  });

  it('should set scheduled time on onTime()', () => {
    const date = new Date();
    component.onTime(date);
    expect(component.scheduledAt).toEqual(date);
  });

  it('canSubmit should return true only if server and time are set', () => {
    expect(component.canSubmit()).toBe(false);

    component.selectedServer = { id: '1', name: 'Test Server', status: 'online' as const };
    expect(component.canSubmit()).toBe(false);

    component.scheduledAt = new Date();
    expect(component.canSubmit()).toBe(true);
  });

  it('should not schedule if canSubmit returns false', () => {
    component.schedule();
    expect(rebootServiceSpy.scheduleReboot).not.toHaveBeenCalled();
  });
});
