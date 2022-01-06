import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  template: `
    <div class="form">
      <form>
        <div class="form-field">
          <input type="text" [formControl]="inputSearch" placeholder="Search" />
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  // Amarramos el input con el formulario
  inputSearch = new FormControl('');
  // Valor de salida hacia el padre
  @Output() submitted = new EventEmitter<string>();

  ngOnInit(): void {
    this.onChange();
  }

  onChange(): void {
    // Es un observable que emite un valor cada que el valor del input cambia
    this.inputSearch.valueChanges
      .pipe(
        // Recibimos el termino y le retiramos los espacios
        map((search: string) => search.trim()),
        // Emite el valor después de 350 milisegundos (para que no se realice petición en cada caracter)
        debounceTime(350),
        // Verifica que el valor que ya emitió no es igual al que va a emitir
        distinctUntilChanged(),
        // Filtramos los valores que no estén vacíos
        filter((search: string) => search !== ''),
        // Emitimos el valor
        tap((search: string) => this.submitted.emit(search))
      )
      .subscribe();
    // this.inputSearch.valueChanges
    //   .pipe(
    //     tap(res => this.submitted.emit(res))
    //   )
    //   .subscribe();
  }
}
