import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerSelect } from './server-select';

describe('ServerSelect', () => {
  let component: ServerSelect;
  let fixture: ComponentFixture<ServerSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
