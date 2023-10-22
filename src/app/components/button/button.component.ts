import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() title: string = '';
  @Input() isDisabled: boolean = false;
  @Input() color: string = 'blue';
  @Input() type: string = 'button';
  @Output() onClick = new EventEmitter();

  btnClick() {
    this.onClick.emit();
  }
}
