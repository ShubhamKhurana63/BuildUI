import { Inject, Injectable, trigger } from '@angular/core'
import { Http, Headers } from '@angular/http';
import { constant } from '../utils/constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Request } from '@angular/http/src/static_request';
import { RequestOptions } from '@angular/http/src/base_request_options';




@Injectable()
export class repoLayer {
    http: Http;

    constructor( @Inject(Http) http) {
        this.http = http;
    }
    response: any = {};
    encodedObject = {};
    trigger = (scriptTriggerRequest) => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let options = new RequestOptions({
            headers: headers
        })
        console.log('calling the server' + JSON.stringify(scriptTriggerRequest, undefined, 2));
        console.log(constant.LOCAL_SERVER_URL + constant.TRIGGER_SCRIPT);
        // debugger;
        return this.http.post(constant.LOCAL_SERVER_URL + constant.TRIGGER_SCRIPT, JSON.stringify(scriptTriggerRequest), options)
            .map(res => res.json());
    }
    streamLogs = (principal, release, action) => {
        console.log(JSON.stringify(principal, undefined, 2));
        this.encodedObject = btoa(principal);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('hostMachine', principal.host);
        headers.append('userName', principal.userName);
        headers.append('password', principal.password);
        return this.http.get(constant.LOCAL_SERVER_URL + constant.STREAM_LOGS + '?release=' + release + '&action=' + action, { headers: headers }).map(res => res.json());
    }

    triggerScript = (scriptTriggerRequest) => {
        console.log('inside triggerScript' + JSON.stringify(scriptTriggerRequest, undefined, 2));
        this.trigger(scriptTriggerRequest);
        console.log("this is data service");
    }
}