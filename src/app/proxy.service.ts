import { Injectable } from '@angular/core';

@Injectable()
export class ProxyService {
  private url: string = 'http://localhost:3005'
  private online: string = 'http://192.168.43.172:3005'

  private enabled = true;

  constructor() {}

  socketUrl() {
    return this.enabled ? this.online : this.url;
  }
}
