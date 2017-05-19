import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class MlbService {

	token = localStorage.getItem('token')
	constructor(private http:Http) { }

	getMlbTeams(){
		/*return this.http.get('http://localhost:8080/memberinfo',{headers:new Headers({'Authorization':'XMLHttpRequest'})}).map(
		(response : Response) => console.log(response));*/
	}
}
