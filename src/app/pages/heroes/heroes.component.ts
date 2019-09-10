import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {

    this.heroesService.getHeroes()
      .subscribe( res => this.heroes = res );
  }

  borrarHeroe(heroe: HeroeModel, i: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Desea eliminar a ${ heroe.nombre }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( res => {

      if (res.value) {

        this.heroes.splice(i, 1);
        this.heroesService.borrarHeroe( heroe.id ).subscribe();

      }

    });

  }

}
