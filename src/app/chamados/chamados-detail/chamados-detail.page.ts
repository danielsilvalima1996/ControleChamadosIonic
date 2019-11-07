import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChamadosListService } from 'src/app/services/chamados/chamados-list/chamados-list.service';
import { Chamados } from 'src/app/interfaces/chamados.model';

@Component({
  selector: 'app-chamados-detail',
  templateUrl: './chamados-detail.page.html',
  styleUrls: ['./chamados-detail.page.scss'],
})
export class ChamadosDetailPage implements OnInit {

  constValue = {
    chamados: <Array<Chamados>>[],
    id: <number>0
  }

  constructor(
    private route: ActivatedRoute,
    private chamadosService: ChamadosListService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.constValue.id = parseInt(params.get('id'), 10);
      })
    this.findById(this.constValue.id);
  }


  findById(id: Number) {
    this.chamadosService.findById(id)
      .subscribe((data) => {
        console.log(data);


      })
  }

}
