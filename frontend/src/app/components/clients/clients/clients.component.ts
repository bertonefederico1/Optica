import { Component, OnInit } from '@angular/core';
import { ClientsService } from './../../../services/clients/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor(private clientService: ClientsService) { }

  ngOnInit(): void {
    this.getAll();
  }

  clients = [];

  getAll(){
    this.clientService.getAll()
      .subscribe(
        res => {
          console.log(res);
          this.clients = res;
        }
      )}

}
