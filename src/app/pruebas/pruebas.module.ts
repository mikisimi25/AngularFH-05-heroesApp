import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario/formulario.component';
import { PruebasRoutingModule } from './pruebas-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    FormularioComponent
  ],
  imports: [
    CommonModule,
    PruebasRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class PruebasModule { }
