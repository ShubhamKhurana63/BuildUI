import { Component, Directive, ViewContainerRef, OnInit } from '@angular/core';
import { repoLayer } from '../service/service';
import { localAssetRepoLayer } from '../service/localservice';
import { Router } from '@angular/router';

@Component({
  selector: 'ab',
  templateUrl: './buildpage.component.html',
  styleUrls: ['./buildpage.component.css'],
  providers: [repoLayer, localAssetRepoLayer]
})
export class BuildPageComponent implements OnInit {
  isGifVisible = false;
  triggerScriptRequest: any = {};
  myStorage = {};

  releaseList = [];
  actionList = [];
  isMachinePage = true;

  constructor(public repoLayer: repoLayer, public router: Router, public localAssetRepoLayer: localAssetRepoLayer) {
  }

  ngOnInit() {
      }

  continue = (hostName) => {
    console.log(hostName);
    this.localAssetRepoLayer.fetchBuildPageData(hostName).subscribe((response) => {
      console.log(JSON.stringify(response, undefined, 2));
      this.releaseList = response.releaseList;
      this.actionList = response.actionList;
    });
    this.isMachinePage = false;
  }

  getBack = () => {
    this.isMachinePage = true;
  }


  setPrincipalToLocalStorage = (triggerScriptRequest) => {
    localStorage.setItem('password', triggerScriptRequest.password);
    localStorage.setItem('host', triggerScriptRequest.host);
    localStorage.setItem('userName', triggerScriptRequest.userName);
    localStorage.setItem('release',triggerScriptRequest.release);
    localStorage.setItem('action',triggerScriptRequest.action);
  }



  triggerScript = (triggerScriptRequest) => {
    this.myStorage = window.localStorage;

    this.isGifVisible = true;
    console.log('calling the server' + JSON.stringify(triggerScriptRequest));
    triggerScriptRequest.password = btoa(triggerScriptRequest.password);
    this.setPrincipalToLocalStorage(triggerScriptRequest);
    this.repoLayer.trigger(triggerScriptRequest).subscribe((response) => {
      console.log(JSON.stringify(response, undefined, 2));
      if (response.responseCode === 200 && response.responseMessage === 'triggered') {
        this.isGifVisible = false;
        this.router.navigateByUrl('logpage');
      }
      console.log("the data has been subscribed");
    }, (err) => {
      console.log(JSON.stringify(err, undefined, 2));
      this.isGifVisible = false;
      console.log("this is the error block");
    });
    console.log(triggerScriptRequest.buildName + "============this is a function call=========" + triggerScriptRequest.buildScript);
  }
}
