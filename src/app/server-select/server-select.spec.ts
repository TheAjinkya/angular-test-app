import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { ServerSelect } from './server-select';
import { ServerService } from '../services/server-service';
import { Server } from '../app.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ServerSelect', () => {
  let component: ServerSelect;
  let fixture: ComponentFixture<ServerSelect>;
  let mockServerService: jasmine.SpyObj<ServerService>;

  const mockServers: Server[] = [
    { id: '1', name: 'Server A', status: 'online' },
    { id: '2', name: 'Server B', status: 'offline' },
  ];

  beforeEach(async () => {
    mockServerService = jasmine.createSpyObj('ServerService', ['getServers']);
    mockServerService.getServers.and.returnValue(of(mockServers));

    await TestBed.configureTestingModule({
      imports: [MatFormFieldModule, MatSelectModule, ServerSelect, NoopAnimationsModule],
      declarations: [],
      providers: [{ provide: ServerService, useValue: mockServerService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ServerSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch servers on ngOnInit', () => {
    expect(component.servers.length).toBe(2);
    expect(component.servers).toEqual(mockServers);
    expect(mockServerService.getServers).toHaveBeenCalled();
  });

  it('should emit the selected server', () => {
    spyOn(component.serverSelected, 'emit');
    const server = mockServers[0];
    component.onSelect(server);
    expect(component.serverSelected.emit).toHaveBeenCalledWith(server);
  });

});
