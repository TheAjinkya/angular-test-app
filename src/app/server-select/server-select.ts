import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Server } from '../app.model';
import { ServerService } from '../services/server-service';

@Component({
  selector: 'app-server-select',
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './server-select.html',
  styleUrl: './server-select.scss'
})
export class ServerSelect implements OnInit {
  servers: Server[] = [];
  @Output() serverSelected = new EventEmitter<Server>();

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getServers().subscribe(list => (this.servers = list));
  }

  onSelect(server: Server) {
    this.serverSelected.emit(server);
  }
}
