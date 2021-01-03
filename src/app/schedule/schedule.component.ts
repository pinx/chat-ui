import {Component, OnInit, ViewChild} from '@angular/core';
import schedulerConfig from './schedulerConfig';
import {SignalrService} from "../signalr.service";
import {EventType, UpdateMessage} from "../updateMessage";
import {EventModel, Scheduler} from "bryntum-scheduler/scheduler.lite.umd.js";
import {SchedulerComponent} from "../scheduler/scheduler.component";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @ViewChild('scheduler') scheduler: SchedulerComponent
  schedulerConfig: any = schedulerConfig

  constructor(public signalRService: SignalrService) {
  }

  ngOnInit(): void {
    this.signalRService.connect();
    this.signalRService.updateReceived.subscribe(
      (update: UpdateMessage) => {
        console.log("Update received by scheduler")
        this.handleUpdate(update)
      },
      (err) => console.error(err),
      (complete) => null)
  }

  handleEvent(evt): void {
    if (evt.type.includes('mouse')) return
    if (evt.type.includes('render')) return
    // console.log(evt.type)
    switch (evt.type) {
      case 'eventdragstart':
        this.sendUpdate(evt)
        break
      case 'eventdrop':
        this.sendUpdate(evt)
        break;
      default:
        break;
    }
  }

  sendUpdate(evt): void {
    this.signalRService.sendUpdateToHub(evt).subscribe({
      next: _ => console.log('update sent to hub'),
      error: (err) => console.error(err)
    });
  }

  handleUpdate(update: UpdateMessage): void {
    if (update.EventType == EventType.Lock) {
      console.log(this)
      this.scheduler.lockEvent(update.EventId)
    }
    if (update.EventType == EventType.Release) {
      console.log(this)
      this.scheduler.updateEvent(update.EventId, update.StartAt)
    }
  }
}
