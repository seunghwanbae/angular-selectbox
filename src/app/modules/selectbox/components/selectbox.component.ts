import { Component, OnInit } from '@angular/core';

export interface SelectboxOption {
  value: any;
  name: string;
  data?: any;
}

@Component({
  selector: 'aui-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrls: ['./selectbox.component.css']
})
export class SelectboxComponent implements OnInit {

  public listMode: boolean = false;
  public disabled: boolean = false;
  public readonly: boolean = false;
  public multiple: boolean = false;
  public multipleLimit: number = 1;
  public selectList: SelectboxOption[] = [];

  constructor() { }

  ngOnInit() {
  }



}
