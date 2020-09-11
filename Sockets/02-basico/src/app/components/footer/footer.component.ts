import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
      public wsService: WebsocketService,
      public chatService: ChatService
    ) { }

  ngOnInit() {

    this.chatService.sendMessage('Hola desde Angular');

  }
}
