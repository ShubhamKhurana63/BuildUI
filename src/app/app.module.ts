import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LogPageComponent } from './logpage/logpage.component';
import { BuildPageComponent } from './buildpage/buildpage.component';
// import { ToastModule  } from 'ng2-toastr/ng2-toastr';
const routes: Routes = [
  {
    path: 'logpage',
    component: LogPageComponent
  },
  {
    path: '',
    component: BuildPageComponent
  }

]
@NgModule({
  declarations: [
    AppComponent, LogPageComponent, BuildPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, RouterModule.forRoot(routes)
    // ToastModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
  //AppComponent
})
export class AppModule { }
