import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChamadosListService } from 'src/app/services/chamados/chamados-list/chamados-list.service';

@Component({
  selector: 'app-chamados-detail',
  templateUrl: './chamados-detail.page.html',
  styleUrls: ['./chamados-detail.page.scss'],
})
export class ChamadosDetailPage implements OnInit {

  constValue = {
    id: <number>0
  }

  constructor(
    private route: ActivatedRoute,
    private chamadosService: ChamadosListService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        this.constValue.id = parseInt(paramMap.get('id'), 10);
      })
    // this.findById(this.constValue.id);
  }

}
