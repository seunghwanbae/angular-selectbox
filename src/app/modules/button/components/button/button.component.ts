import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'aui-button, [aui-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  public style: string;

  @HostBinding('class')
  public styleClass: string = '';

  @HostBinding('attr.disabled')
  public disabled: boolean;

  @Input('style') set setType(value) {
    this.setStyle(value);
  }

  @Input('disabled') set setDisabled(value) {
    this.disabled = value;
  }

  constructor() {}

  ngOnInit() {
  }

  setStyle(style) {
    if ( style === 'important' ) {
      this.styleClass = 'button-important';
    } else if ( style === 'unimportant' ) {
      this.styleClass = 'button-unimportant';
    } else {
      this.styleClass = '';
    }
  }

}
