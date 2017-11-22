import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aui-root',
  templateUrl: './aui.component.html',
  styleUrls: ['./aui.component.scss']
})
export class AuiComponent implements OnInit {
  public JSON = JSON;
  public title = 'Angular UI Components';
  public selectboxOptionsSingle = [
    {
      value: 0, name: 'All'
    }, {
      value: 1, name: 'Title'
    }, {
      value: 2, name: 'SubTitle'
    }, {
      value: 5, name: 'Comment',
      list: [
        {
          value: 6, name: 'Content',
        }, {
          value: 6, name: 'Writer', disabled: true,
          list: [
            {value: 12, name: 'Group'},
            {value: 9, name: 'Team'}
          ]
        }
      ]
    }, {
      value: 9, name: 'Name'
    }, {
      value: 19, name: 'Project'
    }
  ];
  public selectboxOptionsMulti = [
    {
      value: 0, name: 'All'
    }, {
      value: 1, name: 'Title'
    }, {
      value: 2, name: 'SubTitle'
    }, {
      value: 5, name: 'Comment',
      list: [
        {
          value: 6, name: 'Content',
        }, {
          value: 6, name: 'Writer', disabled: true,
          list: [
            {value: 12, name: 'Group'},
            {value: 9, name: 'Team'}
          ]
        }
      ]
    }, {
      value: 9, name: 'Name'
    }, {
      value: 19, name: 'Project'
    }
  ];
  public selectboxValueSingle: any;
  public selectboxValueMulti: any;

  ngOnInit() {
    this.selectboxValueSingle = this.selectboxOptionsSingle[0];
  }

  selectModelChangeSingle() {
    console.log('select model change: ', this.selectboxValueSingle );
  }

  selectModelChangeMulti() {
    console.log('select model change: ', this.selectboxValueMulti );
  }

  constructor() {}

}
