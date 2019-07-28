import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CanComponentDeactivate} from './can-deactivate.guard';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.server = this.serversService.getServer(+params['id']);
        if (this.server) {
          this.serverName = this.server.name;
          this.serverStatus = this.server.status;
        }
      }
    );
    this.route.queryParams
      .subscribe(queryParams => {
        this.allowEdit = queryParams['allowEdit'] === '1';
      });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }

    if (this.serverName !== this.server.name || this.serverStatus !== this.server.status) {
      return confirm('You\'re have unsaved changes.\nLeave page?');
    }
    return true;
  }
}
