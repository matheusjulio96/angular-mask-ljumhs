import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { NgxMaskModule } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports:      [ BrowserModule, FormsModule, 
  
  NgxMaskModule.forRoot(),
  TextMaskModule
  ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
