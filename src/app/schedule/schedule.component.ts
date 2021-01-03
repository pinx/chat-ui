import {Component, OnInit} from '@angular/core';
import schedulerConfig from './schedulerConfig';
import {SignalrService} from "../signalr.service";
import {ChatMessage} from "../chatMessage";
import {UpdateMessage} from "../updateMessage";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  schedulerConfig: any = schedulerConfig;

  constructor(public signalRService: SignalrService) {
  }

  ngOnInit(): void {
    this.signalRService.connect();
    this.signalRService.updateReceived.subscribe((data: UpdateMessage) =>
      console.log("Update received by scheduler"))
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
}
