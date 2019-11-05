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