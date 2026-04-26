import { TitleCasePipe } from '@angular/common';
import { Component,input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-value-display',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './value-display.html',
  styles: ``,
})
export class ValueDisplay {
  readonly value = input.required<string>();
  readonly valueChange = output();
  hero = '';
}
