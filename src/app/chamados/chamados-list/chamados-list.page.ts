import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChamadosListService } from 'src/app/services/chamados/chamados-list/chamados-list.service';

@Component({
  selector: 'app-chamados-list',
  templateUrl: './chamados-list.page.html',
  styleUrls: ['./chamados-list.page.scss'],
})
export class ChamadosListPage implements OnInit {

  public page = {
    title:'Chamados'
  }

  constValue = {
    id:<number>0
  }

  // private selectedItem: any;
  // private icons = [
  //   'flask',
  //   'wifi',
  //   'beer',
  //   'football',
  //   'basketball',
  //   'paper-plane',
  //   'american-football',
  //   'boat',
  //   'bluetooth',
  //   'build'
  // ];
  // public items: Array<{ title: string; note: string; icon: string }> = [];
  // router: any;
  // constructor() {
  //   for (let i = 1; i < 11; i++) {
  //     this.items.push({
  //       title: 'Item ' + i,
  //       note: 'This is item #' + i,
  //       icon: this.icons[Math.floor(Math.random() * this.icons.length)]
  //     });
  //   }
  // }

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
      console.log(data);
      
    })
  }

  // getAll(page: number) {
  //   return new Promise((resolve, reject) => {

  //     let url = this.API_URL + 'users/?per_page=10&page=' + page;

  //     this.http.get(url)
  //       .subscribe((result: any) => {
  //         resolve(result.json());
  //       },
  //       (error) => {
  //         reject(error.json());
  //       });
  //   });
  // }


  

  chamadosDetail(item) {
    // this.router.navigate(['/chamados-detail', JSON.stringify(item)]);
    this.router.navigate(['/chamados-detail', this.constValue.id], { relativeTo: this.route });
  }
}
