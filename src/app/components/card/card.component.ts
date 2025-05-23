import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() link!: string;
  @Input() imagePath!: string;  
}
