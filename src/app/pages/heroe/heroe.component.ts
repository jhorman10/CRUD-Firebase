import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroeServicio: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {

      this.heroeServicio.getHeroe(id)
        .subscribe( (res: HeroeModel) => {
          this.heroe = res;
          this.heroe.id = id;
        });
    }

  }

  guardar(form: NgForm) {

    if (form.invalid) { return; }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.heroe.id ) {

     peticion = this.heroeServicio.actualizarHeroe( this.heroe );

    } else {

     peticion = this.heroeServicio.crearHeroe( this.heroe );

    }

    peticion.subscribe( res => {

      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correcctamente',
        type: 'success'
      });
    });

  }

}
