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
    {value: 2, name: 'SubTitle'},
    {value: 3, name: 'Contents'},
    {value: 3, name: 'Contents'},
    {value: 3, name: 'Contents'},
    {value: 3, name: 'Contents'},
    {value: 3, name: 'Contents'},
    {value: 3, name: 'Contents'},
    {value: 3, name: 'Contents'},
    {value: 3, name: 'Contents'},
    {value: 3, name: 'Contents'},
    {value: 3, name: 'Contents'},
    {value: 3, name: 'Contents'},
    {value: 3, name: 'Contents'},
    {value: 3, name: 'Contents'},
    {value: 3, name: 'Contents'},
    {value: 3, name: 'Contents'},
    {value: 3, name: 'Contents'},
    {value: 4, name: 'Writer'},
    {value: 5, name: 'Comment',
      list: [
        {value: 6, name: 'Comment Content'},
        {value: 6, name: 'Comment Writer'}
      ]
    }
  ];
}
