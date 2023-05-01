import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {
  private url = environment.apiUrl + environment.foldersUrl

  constructor(public http: HttpClient) { }

  getData<Type>() {
    let header = new HttpHeaders({'Accept-language': 'en'});
    return this.http.get<Type>(this.url, {headers: header});
  }
  

  postData<Type>( body: Type) {
    let header = new HttpHeaders({'Accept-language': 'en'});
    return this.http.post<Type>(this.url, body, {headers: header})
  }

  putData<Type>( url: string, body: Type) {
    let header = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.put<Type>(url, body, {headers: header})
  }

}
