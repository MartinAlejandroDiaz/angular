import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chatForm = new FormGroup({
    'texto': new FormControl()
  });

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit(): void {
  }

  enviar() {
    console.log(this.chatForm.value.texto);
    this.chatService.sendMessage(this.chatForm.value.texto);
    this.chatForm.setValue({texto: ''});
  }

}
