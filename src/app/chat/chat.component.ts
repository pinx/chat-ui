import {Component, OnInit} from '@angular/core';
import {SignalrService} from "../signalr.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  title = 'chat-ui';
  text: string = "";

  constructor(public signalRService: SignalrService) {

  }

  ngOnInit(): void {
    this.signalRService.connect();
  }

  sendMessage(): void {

    // you can send the message directly to the hub or use the api controller.
    // this.signalRService.sendMessageToApi(this.text).subscribe({
    //   next: _ => this.text = '',
    //   error: (err) => console.error(err)
    // });

    this.signalRService.sendMessageToHub(this.text).subscribe({
      next: _ => this.text = '',
      error: (err) => console.error(err)
    });
  }

}
