import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChamadosListService } from 'src/app/services/chamados/chamados-list/chamados-list.service';
import { Chamados } from 'src/app/interfaces/chamados.model';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-chamados-list',
  templateUrl: './chamados-list.page.html',
  styleUrls: ['./chamados-list.page.scss'],
})
export class ChamadosListPage implements OnInit {

  @ViewChild (IonInfiniteScroll,{static: true}) infiniteScroll: IonInfiniteScroll;

  public page = {
    title:'Chamados'
  }

  constValue = {
    id:<number>0,
    chamados:<Array<Chamados>>[]
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chamadosListService: ChamadosListService
  ){}

  ngOnInit() {
    this.findChamados()
  }

  findChamados(){
    this.chamadosListService.findChamados()
    .subscribe((data)=>{
      this.constValue.chamados = data.content;

      data.content.map((item)=>{
        Object.keys(item).map((data)=>{
          this.constValue.id = item.idChamado
        })
        
      })
    })
  }

  chamadosDetail(item) {
    this.router.navigate(['/chamados-detail', this.constValue.id], { relativeTo: this.route });
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.chamadosListService.findChamados()
      .subscribe((data)=>{
        if (data.size == 1000) {
          event.target.disabled = true;
        }

      })
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  // filtrarChamados() {
  //   this.hasFilter = false;
  //   this.feeds = this.noFilter.filter((item) => {
  //       return item.data.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
  //   });
  // }
}
