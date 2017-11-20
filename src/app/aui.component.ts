import { Component } from '@angular/core';

@Component({
  selector: 'aui-root',
  templateUrl: './aui.component.html',
  styleUrls: ['./aui.component.scss']
})
export class AuiComponent {
  public title = 'Angular UI Components';
  public selectboxOptions = [
    {
      value: 1, name: 'Title'
    }, {
      value: 2, name: 'SubTitle'
    }, {
      value: 5, name: 'Comment',
      list: [
        {
          value: 6, name: 'Comment Content1'
        }, {
          value: 6, name: 'Comment Writer1',
          list: [
            {value: 12, name: 'Comment Content2'},
            {value: 9, name: 'Comment Writer2'}
          ]
        }
      ]
    }
  ];
  resetSelectValue() {
    console.log('reset');
  }
}
