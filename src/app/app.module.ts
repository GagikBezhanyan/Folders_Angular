import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesktopComponent } from './components/desktop/desktop.component';
import { HttpClientModule } from '@angular/common/http';
import { FolderComponent } from './components/folder/folder.component';
import { PopupComponent } from './components/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    FolderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DesktopComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
