export enum EventType {
  Lock = "Lock",
  Release = "Release"
}

export interface UpdateMessage {
  EventId: number
  EventType: EventType
  StartAt: Date
  ConnectionId: string
  DateTime: Date
}
