import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ServersService} from '../servers.service';
import {Injectable} from '@angular/core';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServerResolver implements Resolve<Server> {
  constructor(
    private serversService: ServersService
  ) {}
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<Server> | Promise<Server> | Server {
    console.log('Preloading server with id = ', route.params['id']);
    return this.serversService.getServer(+route.params['id']);
  }
}
