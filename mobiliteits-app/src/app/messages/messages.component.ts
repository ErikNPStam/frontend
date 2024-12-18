import { Component } from '@angular/core';
import { MessageService } from '../service/message-service/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  //inject the message service when the messageComponent is created
  constructor(public messageService: MessageService) {

  };
}
