import { Inject, Injectable, trigger } from '@angular/core'
import { Http, Headers } from '@angular/http';
import { constant } from '../utils/constants';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';




@Injectable()
export class localAssetRepoLayer {
    http: Http;

    constructor( @Inject(Http) http) {
        this.http = http;
    }

    fetchBuildPageData = (hostname) => {
       return this.http.get(constant.BUILD_PAGE_DROP_DOWN_DATA+hostname+"/").map(res => res.json());
    }

}