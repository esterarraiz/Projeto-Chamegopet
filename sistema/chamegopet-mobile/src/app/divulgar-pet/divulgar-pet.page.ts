import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CepService } from 'src/app/services/cep.service';
import { HttpErrorResponse } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

interface CepResponse {
  localidade: string;
  uf: string;
}

@Component({
  selector: 'app-divulgar-pet',
  templateUrl: './divulgar-pet.page.html',
  styleUrls: ['./divulgar-pet.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,  
  ],
  providers: [ApiService, CepService]
})
export class DivulgarPetPage implements OnInit {
  petForm!: FormGroup; 
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private cepService: CepService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.petForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      especie: ['', Validators.required],
      raca: [''],
      idade: [''],
      sexo: ['', Validators.required],
      descricao: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      whatsapp: [''],
      imagem: [''],
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async onSubmit() {
    if (!this.petForm || this.petForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('titulo', this.petForm.value.titulo!);
    formData.append('especie', this.petForm.value.especie!);
    formData.append('raca', this.petForm.value.raca!);
    formData.append('idade', this.petForm.value.idade!);
    formData.append('sexo', this.petForm.value.sexo!);
    formData.append('descricao', this.petForm.value.descricao!);
    formData.append('cep', this.petForm.value.cep!);
    formData.append('cidade', this.petForm.value.cidade!);
    formData.append('estado', this.petForm.value.estado!);
    formData.append('whatsapp', this.petForm.value.whatsapp!);

    if (this.selectedFile) {
      formData.append('imagem', this.selectedFile, this.selectedFile.name);
    }

    try {
      await this.apiService.createPet(formData).toPromise();
      const toast = await this.toastController.create({
        message: 'Pet divulgado com sucesso!',
        duration: 2000,
        color: 'success',
      });
      toast.present();
      this.router.navigate(['/']);
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Erro ao divulgar o pet. Tente novamente.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  onCepBlur() {
    const cep = this.petForm?.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.cepService.getEnderecoPorCep(cep).subscribe(
        (data: CepResponse) => {
          if (data && data.localidade && data.uf) {
            this.petForm?.patchValue({
              cidade: data.localidade,
              estado: data.uf
            });
          } else {
            console.error('Erro ao buscar dados do CEP');
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Erro na requisição do CEP:', error.message);
        }
      );
    }
  }
}
