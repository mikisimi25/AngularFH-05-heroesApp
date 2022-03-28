import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: [],
})
export class FormularioComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  pepperonis: any[] = [];
  columns = Array.from(Array(13).keys());
  rows = Array.from(Array(5).keys());

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      pepperoni: ['', Validators.required],
      pepperoni2: ['', Validators.required],
      pepperoni3: ['', Validators.required],
    });
  }

  haha() {
    console.log(this.form.controls['pepperoni']);
  }

  cambio() {
    var form = document.getElementById('input-form');

    var myArray:any[] = [];
    form!.querySelectorAll('input').forEach((input) => {
      if (input.type === 'checkbox' && input.checked) {
        myArray.push(input.value);
      }
    });

    console.log(myArray);
  }
}
