import { Component, OnInit } from '@angular/core';
import schedulerConfig from './schedulerConfig';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  schedulerConfig : any = schedulerConfig;

  constructor() { }

  ngOnInit(): void {
  }

}
