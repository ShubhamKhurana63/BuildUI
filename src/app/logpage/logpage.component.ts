import { Component, OnInit } from '@angular/core';
import { repoLayer } from '../service/service';
import { Observable } from 'rxjs/Rx';
import { constant } from '../utils/constants';
import { release } from 'os';


@Component({
    selector: 'yu',
    templateUrl: './logpage.component.html',
    styleUrls: ['./logpage.component.css'],
    providers: [repoLayer]
})
export class LogPageComponent implements OnInit {
    mydata;
    release;
    action;
    actionLogs;
    prepareTreeLogs;
    imageLogs;
    constructor(public repoLayer: repoLayer) { }
    isGifVisible;
    principal = constant.PRINCIPAL_OBJECT;
    ngOnInit() {
        this.isGifVisible = true;
        this.principal.host = localStorage.getItem('host');
        this.principal.userName = localStorage.getItem('userName');
        this.principal.password = localStorage.getItem('password');
        this.release = localStorage.getItem('release');
        this.action = localStorage.getItem('action');
        this.streamLogs1(this.principal, this.release, this.action);
    }

    streamLogs1(principal, release, action) {
        Observable.interval(10000).subscribe(x => {
            this.repoLayer.streamLogs(principal, release, action).subscribe((response) => {
                console.log(JSON.stringify(response, undefined, 2));
                this.isGifVisible = false;
                this.actionLogs = response.actionLogString;
                this.prepareTreeLogs = response.prepareTreeLogString;
                this.imageLogs = response.imageLogString;
            })
        });
    }

}
