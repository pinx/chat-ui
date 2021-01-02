import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component'
import { ScheduleComponent } from './schedule/schedule.component';
import {SchedulerComponent} from "./scheduler/scheduler.component";

@NgModule({
  declarations: [
    AppComponent,
    SchedulerComponent,
    ChatComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
