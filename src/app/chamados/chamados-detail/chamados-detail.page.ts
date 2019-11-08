import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChamadosListService } from 'src/app/services/chamados/chamados-list/chamados-list.service';
import { Chamados } from 'src/app/interfaces/chamados.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-chamados-detail',
  templateUrl: './chamados-detail.page.html',
  styleUrls: ['./chamados-detail.page.scss'],
})
export class ChamadosDetailPage implements OnInit {

  constValue = {
    chamados: <Array<Chamados>>[],
    id: ''
  }

  chamadosDetailForm: FormGroup = this.fb.group({
    idChamado: ['', []],
    idEmpresa: ['', []],
    idAnalista: ['', []],
    idUsuario: ['', []],
    dataAbertura: ['', []],
    horaAbertura: ['', []],
    dataFechamento: ['', []],
    horaFechamento: ['', []],
    tempoChamado: ['', []],
    codigoStatusChamado: ['', []],
    tipoChamado: ['', []],
    subtipoChamado: ['', []],
    descricaoChamado: ['', []],
    solucaoChamado: ['', []]
  })

  constructor(
    private route: ActivatedRoute,
    private chamadosService: ChamadosListService,
    private fb: FormBuilder,

  ) {}


  logForm(){
    console.log(this.chamadosDetailForm.value)
  }

  ngOnInit() {
    this.route.paramMap
    .subscribe((params: ParamMap) => {
      this.constValue.id = params.get('idChamado');
    })
    this.findById(this.constValue.id)

  }

  findById(id) {
    this.chamadosService.findById(id)
      .subscribe((data) => {
        console.log(data);


      })
  }

}
