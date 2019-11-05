import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrocarSenhaService } from '../services/trocar-senha/trocar-senha.service';
import { TrocarSenha } from '../interfaces/trocarSenha.model';
import { LoginService } from '../services/authentication/login/login.service';
import { ErrorSpringBoot } from '../interfaces/ErrorSpringBoot.model';

@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.page.html',
  styleUrls: ['./trocar-senha.page.scss'],
})
export class TrocarSenhaPage implements OnInit {

  trocarSenhaForm: FormGroup;

  constValue = {
    button: <boolean>true,
    id: <number>null
  }

  // numero = [
  //   { id: 1, nome: '1', sexo: 'm' },
  //   { id: 2, nome: '2', sexo: 'm' },
  //   { id: 3, nome: '3', sexo: 'm' },
  //   { id: 4, nome: '4', sexo: 'm' },
  //   { id: 5, nome: '5', sexo: 'm' },
  //   { id: 6, nome: '6', sexo: 'm' }
  // ];

  constructor(
    private fb: FormBuilder,
    private trocarSenhaService: TrocarSenhaService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.trocarSenhaForm = this.fb.group({
      atual: ['', [Validators.minLength(8)]],
      nova: ['', [Validators.minLength(8)]],
      confirme: ['', [Validators.minLength(8)]]
    })

    this.trocarSenhaForm
      .valueChanges
      .subscribe((_) => {
        if ((this.controls.nova.value === this.controls.confirme.value) && this.trocarSenhaForm.valid) {
          this.constValue.button = false;
        } else {
          this.constValue.button = true;
        }
      })
    this.getUser();
  }

  get controls() {
    return this.trocarSenhaForm.controls;
  }

  private getUser() {
    this.loginService
      .getUserInformation$.subscribe((data) => {
        this.constValue.id = data.id;
      })
  }

  trocarSenha() {
    if (this.trocarSenhaForm.invalid) {
      return;
    } else {
      let obj: TrocarSenha = {
        id: this.constValue.id,
        atual: this.controls.atual.value,
        nova: this.controls.nova.value
      }
      this.trocarSenhaService
        .trocarSenha(obj).subscribe((data) => {

        },
          (error: ErrorSpringBoot) => {

          })
    }

  }

}