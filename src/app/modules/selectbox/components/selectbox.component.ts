import { Component, OnInit, Input, HostListener } from '@angular/core';

export interface SelectboxOption {
  value: any;
  name: string;
  data?: any;
}

@Component({
  selector: 'aui-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrls: ['./selectbox.component.scss']
})
export class SelectboxComponent implements OnInit {

  public disabled: boolean = false; // disabled state
  public readonly: boolean = false; // readonly state
  public placeholder: string = 'Select'; // placeholder
  public list: boolean = false; // list view Mode
  public multiple: boolean = false; // multiple selection mode
  public multipleLimit: number = 1; // multiple selection limit
  public selectList: SelectboxOption[]; // select list
  public scrollHeight: number = 350; // select list max height
  public scrollWidth: number; // select list max height

  public selectedValue: SelectboxOption = null;
  public isFocus: boolean = false;

  @Input('selectList') set setSelectList( value ) {
    this.selectList = value;
  }
  @Input('disabled') set setDisabled( value ) {
    this.disabled = value;
  }
  @Input('readonly') set setReadonly( value ) {
    this.readonly = value;
  }
  @Input('placeholder') set setPlaceholder( value ) {
    this.placeholder = value;
  }
  @Input('list') set setList( value ) {
    this.list = value;
  }
  @Input('multiple') set setMultiple( value ) {
    this.multiple = value;
  }
  @Input('multipleLimit') set setmMltipleLimit( value ) {
    this.multipleLimit = value;
  }
  @Input('scrollHeight') set setScrollHeight( value ) {
    this.scrollHeight = value;
  }
  @Input('scrollWidth') set setScrollWidth( value ) {
    this.scrollWidth = value;
  }

  constructor() { }

  ngOnInit() {

  }

  @HostListener('focusin', ['$event'])
  focusIn(e?) {
    console.log(e);
    this.isFocus = true;
  }

  @HostListener('focusout', ['$event'])
  focusOut(e?) {
    console.log(e);
    this.isFocus = false;
  }

  changeSelect() {
    console.log('click item');
  }



}
