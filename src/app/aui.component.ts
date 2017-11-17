import { Component } from '@angular/core';

@Component({
  selector: 'aui-root',
  templateUrl: './aui.component.html',
  styleUrls: ['./aui.component.scss']
})
export class AuiComponent {
  public title = 'aui';
  public selectboxOptions = [
    {value: 1, name: 'Title'},
    {value: 2, name: 'Contents'},
    {value: 3, name: 'Writer'}
  ];
}
