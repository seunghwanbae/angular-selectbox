import { Component,
  OnInit,
  Input,
  Output,
  HostListener,
  EventEmitter,
  ViewChild,
  ElementRef,
  Renderer2,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectboxOption {
  value: any;
  name: string;
  list?: any;
  disabled?: boolean;
  data?: any;
}

@Component({
  selector: 'aui-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrls: ['./selectbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectboxComponent),
      multi: true
    }
  ]
})
export class SelectboxComponent implements OnInit, ControlValueAccessor {

  public selectedValues: SelectboxOption[] = []; // selected value
  public disabled: boolean = false; // disabled state
  public readonly: boolean = false; // readonly state
  public placeholder: string = 'Select'; // placeholder
  public list: boolean = false; // list view Mode
  public multiple: boolean = false; // multiple selection mode
  public multipleLimit: number = 0; // multiple selection limit
  public selectList: SelectboxOption[]; // select list
  public scrollHeight: number = 350; // select list max height
  public scrollWidth: number; // select list max height

  public focusItem: any;

  public isShowList: boolean = false;

  public outsideClickEvent: any;
  public outsideFocusEvent: any;
  public outsideScrollEvent: any;


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

  constructor(
    public renderer: Renderer2,
    public hostElement: ElementRef
  ) { }

  ngOnInit() {}

  @HostListener('keydown', ['$event'])
  keyDown(e) {
    const keyName = this.checkKeyCode(e.keyCode);
    if ( keyName === 'up' || keyName === 'down' ) {
      e.preventDefault();
      this.navigateSelect( keyName );
    } else if ( keyName === 'enter' || keyName === 'space' ) {
      e.preventDefault();
      this.enterSelect();
    } else if ( keyName === 'esc' ) {
      e.preventDefault();
      this.listToggle(false);
    }
  }

  listToggle( type?: boolean ) {
    if ( type !== undefined ) {
      this.isShowList = type;
    } else {
      this.isShowList = !this.isShowList;
    }

    if ( !this.isShowList ) {
      this.focusItem = undefined;
      this.removeOutsideEvent();
    } else {
      this.addOutsideEvent();
    }
  }

  addOutsideEvent() {
    this.outsideClickEvent = this.renderer.listen('document', 'click', ($event) => {
      this.checkOutsideTarget($event);
    });
    this.outsideFocusEvent = this.renderer.listen('document', 'focusin', ($event) => {
      this.checkOutsideTarget($event);
    });
    this.outsideScrollEvent = this.renderer.listen('window', 'scroll', ($event) => {
      this.checkOutsideTarget($event);
    });
  }

  checkOutsideTarget( e ) {
    if ( e.path.indexOf(this.hostElement.nativeElement) < 0 ) {
      if ( this.isShowList ) {
        this.listToggle(false);
      }
    }
  }

  removeOutsideEvent() {
    this.outsideClickEvent();
    this.outsideFocusEvent();
    this.outsideScrollEvent();
  }

  navigateSelect( keyName ) {
    const allItems = this.getAllSelectItems();
    const nowIndex = allItems.indexOf(this.focusItem);
    let targetIndex = allItems.indexOf(this.focusItem);

    if ( !this.isShowList ) {
      this.listToggle();
    }
    if ( !this.focusItem ) {
      this.focusItem = allItems[0];
    } else {
      if ( keyName === 'up' ) {
        targetIndex = ( nowIndex - 1 < 0) ? allItems.length - 1 : nowIndex - 1;
      } else {
        targetIndex = ( nowIndex + 1 > allItems.length - 1) ? 0 : nowIndex + 1;
      }
      this.focusItem = allItems[targetIndex];
    }

    if ( !this.multiple ) {
      this.changeSelect( this.focusItem );
    }
  }

  enterSelect() {
    if ( this.focusItem ) {
      this.changeSelect( this.focusItem );
    }
  }

  changeSelect( selectItem ) {
    let checkValue;

    if ( this.readonly ) {
      return false;
    }

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
        if ( selectItem.list ) {
          this.checkChildList(selectItem.list);
        }
      }
    } else {
      this.selectedValues = [selectItem];
    }
    this.changeEmit( this.selectedValues );
  }

  checkChildList ( list ) {
    list.filter((obj) => {
      const findIdx = this.selectedValues.indexOf(obj);
      if ( findIdx > -1 ) {
        this.selectedValues.splice(findIdx, 1);
      }
      if ( obj.list ) {
        this.checkChildList(obj.list);
      }
    });
  }

  getAllSelectItems() {
    const selectItems = [];

    (function pushItem( list ) {
      list.filter((item) => {
        if ( !item.disabled ) {
          selectItems.push(item);
          if ( item.list ) {
            pushItem( item.list );
          }
        }
      });
    })( this.selectList );

    return selectItems;
  }

  checkKeyCode(num) {
    const keyList = {
      38: 'up',
      40: 'down',
      13: 'enter',
      32: 'space',
      27: 'esc'
    };
    return ( keyList[num] ) ? keyList[num] : undefined;
  }

  changeEmit( valueArray: any[] ) {
    let emitValue;

    if ( this.multiple ) {
      emitValue = valueArray;
    } else {
      if ( valueArray.length <= 0 ) {
        emitValue = undefined;
      } else {
        emitValue = valueArray[0];
      }
    }

    this.onChange( emitValue );
  }

  /* ControlValueAccessor */
  public onChange = (_) => { };
  public onTouched = () => {};
  private propagateChange = (_: any) => { };
  writeValue(values: any) {
    const selectListItems = this.getAllSelectItems();
    let insertValue;

    if ( values ) {
      if ( !Array.isArray(values) ) {
        if ( selectListItems.indexOf(values) < 0 ) {
          insertValue = [];
        } else {
          insertValue = [values];
        }
      } else {
        insertValue = values;
      }
    } else {
      insertValue = [];
    }

    this.selectedValues = insertValue;
    this.changeEmit( this.selectedValues );
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
