# Live multi-user schedule board

This proof-of-concept started out with a clone of [Javier's chat UI](https://github.com/javiergacrich/chat-ui).

Then I introduced Bryntum's scheduler component, picking bits and pieces from their [examples](https://www.bryntum.com/examples/scheduler/).

Events emitted by the scheduler component are turned into SignalR messages to the [hub](https://docs.microsoft.com/en-us/aspnet/core/signalr/hubs).

Received messages are used to update events in the scheduler.

The code is still a bit hacky. I found [a nice post](https://gist.github.com/jehugaleahsa/825518ee860b84d3a041c17ccf095f61) on how to structure an app like this, using Angular services and Observables as they are intended.

When opening two browser windows to the app, the UX is as follows:
- When starting to drag, the event in the other window changes color
- When dropping the event, the event in the other window moves to the new time
- Moving to different resources is not supported

Super simple, but just to demonstrate the event flow from one UI to the server and back to other UIs.
