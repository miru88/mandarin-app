import { Component } from '@angular/core';

@Component({
  selector: 'app-hanzi-component',
  standalone: false,
  templateUrl: './hanzi-component.component.html',
  styleUrl: './hanzi-component.component.css'
})
export class HanziComponentComponent {
  character = '爱';
  pinyin = 'ai4';
  definition = 'love';
}
