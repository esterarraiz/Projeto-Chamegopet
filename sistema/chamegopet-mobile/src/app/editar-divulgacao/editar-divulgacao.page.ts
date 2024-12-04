import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-editar-divulgacao',
  templateUrl: './editar-divulgacao.page.html',
  styleUrls: ['./editar-divulgacao.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HttpClientModule],
  providers: [HttpClient],
})
export class EditarDivulgacaoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
