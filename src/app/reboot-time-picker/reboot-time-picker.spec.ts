import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RebootTimePicker } from './reboot-time-picker';

describe('RebootTimePicker', () => {
  let component: RebootTimePicker;
  let fixture: ComponentFixture<RebootTimePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RebootTimePicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RebootTimePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
