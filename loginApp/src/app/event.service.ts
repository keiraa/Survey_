import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _mainUrl = "http://localhost:3000/api/mainPage"
  constructor(private _http:HttpClient) { }
  
  getMainPage() {
    return this._http.get(this._mainUrl)
  }
}
