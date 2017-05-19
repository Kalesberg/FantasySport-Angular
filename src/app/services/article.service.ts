import {Injectable, EventEmitter, Output} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';

@Injectable()
export class ArticleService {

  provider:string = "http://forum.dfsportgod.com/wp-json/wp/v2/";

  constructor(private http:Http, private router:Router) {
  }

  getHeaders():Headers {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    
    return headers;
  }

  fetchCategories(): Observable<Array<any>> {
  	var endpoint = this.provider + 'categories';
  	return this.http.get(endpoint)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()))
  }

  fetchPosts(): Observable<Array<any>> {
    var endpoint = this.provider + 'posts';
    return this.http.get(endpoint)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()))
  }

  fetchMedia(): Observable<Array<any>> {
    var endpoint = this.provider + 'media';
    return this.http.get(endpoint)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()))
  }

}