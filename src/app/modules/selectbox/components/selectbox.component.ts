import { Component, OnInit, Input, Output, HostListener, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';

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

  public selectedValue: SelectboxOption = null; // selected value
  public disabled: boolean = false; // disabled state
  public readonly: boolean = false; // readonly state
  public placeholder: string = 'Select'; // placeholder
  public list: boolean = false; // list view Mode
  public multiple: boolean = false; // multiple selection mode
  public multipleLimit: number = 0; // multiple selection limit
  public selectList: SelectboxOption[]; // select list
  public scrollHeight: number = 350; // select list max height
  public scrollWidth: number; // select list max height

  public isShowList: boolean = false;

  public outsideClickEvent: any;
  public outsideFocusEvent: any;
  public selectedValues: SelectboxOption[] = [];

  @ViewChild('selectButton') selectButton: ElementRef;

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

  @Output() change;

  constructor(
    public renderer: Renderer2,
    public hostElement: ElementRef
  ) { }

  ngOnInit() {}



  @HostListener('focusin', ['$event'])
  focusIn(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    e.stopPropagation();
  }

  @HostListener('focusout', ['$event'])
  focusOut(e?) {
    // setTimeout(() => {
    //   this.isShowList = false;
    //   console.log('focus out', e);
    // }, 200);

  }

  selectButtonClick() {
    this.listToggle();
    this.outsideClickEvent = this.renderer.listen('document', 'click', ($event) => {
      this.closeEvent($event);
    });
    this.outsideFocusEvent = this.renderer.listen('document', 'focusin', ($event) => {
      this.closeEvent($event);
    });
  }

  closeEvent( e ) {
    if ( e.path.indexOf(this.hostElement.nativeElement) < 0 ) {
      if ( this.isShowList ) {
        this.listToggle();
        this.outsideClickEvent();
        this.outsideFocusEvent();
      }
    }
  }

  listToggle() {
    this.isShowList = !this.isShowList;
  }

  changeSelect( selectItem, e ) {
    let checkValue;

    if ( this.multiple ) {
      checkValue = this.selectedValues.find(( item, idx ) => {
        if ( item === selectItem ) {
          this.selectedValues.splice(idx, 1);
          return true;
        }
      });
      if ( this.selectedValues.length >= this.multipleLimit && this.multipleLimit > 0  ) {
        return false;
      }
      if ( !checkValue ) {
        this.selectedValues.push(selectItem);
      }
    } else {
      this.selectedValues = [];
      this.selectedValues.push(selectItem);
    }
  }

  checkMultipleSelect( list ) {
    if ( list ) {

    }
  }

}
