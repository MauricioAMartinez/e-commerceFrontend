import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  url = 'http://localhost/e-commerceBackend/public/api/'

  getUser(user:any):Observable<User[]>{
    return this.http.post<User[]>(this.url+'login',user)
  }
}
