import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder, JsonHubProtocol, LogLevel} from '@microsoft/signalr'
import {from, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ChatMessage} from './chatMessage';
import {MessagePackHubProtocol} from '@microsoft/signalr-protocol-msgpack'
import {UpdateMessage} from "./updateMessage";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection: HubConnection
  public messages: ChatMessage[] = [];
  private connectionUrl = 'https://localhost:44319/signalr';
  private apiUrl = 'https://localhost:44319/api/chat';
  updateReceived = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  public connect = () => {
    this.startConnection();
    this.addListeners();
  }

  public sendMessageToApi(message: string) {
    return this.http.post(this.apiUrl, this.buildChatMessage(message))
      .pipe(tap(_ => console.log("message sucessfully sent to api controller")));
  }

  public sendMessageToHub(message: string) {
    var promise = this.hubConnection.invoke("BroadcastAsync", this.buildChatMessage(message))
      .then(() => {
        console.log('message sent successfully to hub');
      })
      .catch((err) => console.log('error while sending a message to hub: ' + err));

    return from(promise);
  }

  public sendUpdateToHub(schedulerEvent: any) {
    var promise = this.hubConnection.invoke("UpdateSchedulerEvent", this.buildUpdateMessage(schedulerEvent))
      .then(() => {
        console.log('update sent successfully to hub');
      })
      .catch((err) => console.log('error while sending a message to hub: ' + err));

    return from(promise);
  }

  private getConnection(): HubConnection {
    return new HubConnectionBuilder()
      .withUrl(this.connectionUrl)
      .withHubProtocol(new MessagePackHubProtocol())
      .withAutomaticReconnect()
      // .configureLogging(LogLevel.Trace)
      .build();
  }

  private buildChatMessage(message: string): ChatMessage {
    return {
      ConnectionId: this.hubConnection.connectionId,
      Text: message,
      DateTime: new Date()
    };
  }

  private buildUpdateMessage(schedulerEvent: any): UpdateMessage {
    console.log("build update message")
    const draggedEvent = schedulerEvent.draggedRecords[0].data
    console.log(draggedEvent)
    const payload = {
      ConnectionId: this.hubConnection.connectionId,
      EventId: draggedEvent.id,
      StartAt: draggedEvent.startDate,
      DateTime: new Date()
    }
    console.log(payload)
    return payload
  }

  private startConnection() {
    this.hubConnection = this.getConnection();

    this.hubConnection.start()
      .then(() => console.log('connection started'))
      .catch((err) => console.log('error while establishing signalr connection: ' + err))
  }

  private addListeners() {
    this.hubConnection.on("messageReceivedFromApi", (data: ChatMessage) => {
      console.log("message received from API Controller")
      this.messages.push(data);
    })
    this.hubConnection.on("messageReceivedFromHub", (data: ChatMessage) => {
      console.log("message received from Hub")
      this.messages.push(data);
    })
    this.hubConnection.on("newUserConnected", _ => {
      console.log("new user connected")
    })
    this.hubConnection.on("updateReceived", (data: UpdateMessage) => {
      console.log("update received from Hub")
      console.log(data)
      this.updateReceived.emit(data)
    })
  }
}



