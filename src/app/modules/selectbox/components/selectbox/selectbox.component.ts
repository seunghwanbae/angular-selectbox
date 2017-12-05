import { Component,
  OnInit,
  Input,
  HostListener,
  ViewChild,
  ElementRef,
  Renderer2,
  forwardRef,
  HostBinding
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// Select Option Model
export interface SelectboxOption {
  value: any;
  name: string;
  list?: any;
  disabled?: boolean;
  data?: any;
  parent?: any;
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
  public multiple: boolean = false; // multiple selection mode
  public multipleLimit: number = 0; // multiple selection limit
  public selectList: SelectboxOption[]; // select list
  public scrollHeight: number = 350; // select list max height
  public scrollWidth: number; // select list max height

  public focusItem: any;

  public outsideClickEvent: any;
  public outsideFocusEvent: any;
  public outsideScrollEvent: any;

  // key list
  public keyList: any = {
    38: 'up',
    40: 'down',
    13: 'enter',
    32: 'space',
    27: 'esc'
  };


  @HostBinding('class.is-active')
  public isShowList: boolean = false; // list show boolean

  @HostBinding('class.is-list')
  public list: boolean = false; // list view Mode

  @ViewChild('selectButtonElement')
  public selectButtonElement: ElementRef;

  @ViewChild('listElement')
  public listElement: ElementRef;

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
    const keyName = this.keyList[e.keyCode];
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
    const allItems = this.getSelectListSeries('focus');
    const nowIndex = allItems.indexOf(this.focusItem);
    let targetIndex = 0;

    if ( !this.isShowList ) {
      this.listToggle(true);
    }
    if ( !this.focusItem ) {
      if ( this.selectedValues.length > 0 ) {
        this.focusItem = this.selectedValues[0];
      } else {
        if ( keyName === 'up' ) {
          this.focusItem = allItems[allItems.length - 1];
        } else {
          this.focusItem = allItems[0];
        }
      }
    } else {
      if ( keyName === 'up' ) {
        targetIndex = ( nowIndex - 1 < 0) ? allItems.length - 1 : nowIndex - 1;
      } else {
        targetIndex = ( nowIndex + 1 > allItems.length - 1) ? 0 : nowIndex + 1;
      }
      this.focusItem = allItems[targetIndex];
    }

    if ( !this.multiple ) {
      this.changeSelect( this.focusItem, true );
    }
  }

  enterSelect() {
    if ( this.focusItem ) {
      this.changeSelect( this.focusItem );
    }
  }

  changeSelect( selectItem, keyEvent? ) {
    let checkValue;

    if ( this.readonly ) {
      this.selectButtonElement.nativeElement.focus();
      return false;
    }

    if ( this.multiple && (this.multipleLimit > 1 || this.multipleLimit === 0) ) {
      checkValue = this.selectedValues.find(( item, idx ) => {
        if ( item === selectItem ) {
          this.selectedValues.splice(idx, 1);
          this.checkNode(selectItem);
          this.changeEmit( this.selectedValues );
          return true;
        }
      });
      if ( this.selectedValues.length < this.multipleLimit || this.multipleLimit === 0  ) {
        if ( !checkValue ) {
          this.selectedValues.push(selectItem);
          this.checkNode(selectItem);
          this.changeEmit( this.selectedValues );
        }
      }
    } else {
      if (this.selectedValues[0] !== selectItem) {
        this.selectedValues = [selectItem];
        this.checkNode(selectItem);
        this.changeEmit(this.selectedValues);
      }
    }
    if (!keyEvent) {
      this.selectToggle();
    }
    this.focusItem = selectItem;
    this.selectButtonElement.nativeElement.focus();
  }

  selectToggle() {
    if ( !this.readonly && !this.multiple ) {
      this.listToggle(false);
    }
  }

  focusButtonElement() {
    if ( !this.list ) {
      this.selectButtonElement.nativeElement.focus();
    }
  }

  checkNode( selectItem ) {
    const selectListSeries = this.getSelectListSeries('node');
    selectListSeries.find((obj) => {
      if (obj.item === selectItem) {
        if (obj.child) {
          this.removeChildSelected(obj.child);
        }
        if (obj.parent) {
          this.removeParentSelected(obj.parent, selectListSeries);
        }
        return true;
      }
    });
  }

  removeChildSelected( childList ) {
    if ( !childList ) { return false; }

    childList.filter((item) => {
      const findIdx = this.selectedValues.indexOf(item);
      if ( findIdx > -1 ) {
        this.selectedValues.splice(findIdx, 1);
      }
      if ( item.list ) {
        this.removeChildSelected(item.list);
      }
    });
  }

  removeParentSelected(parentItem, selectListSeries) {
    let findIdx;

    if ( !parentItem ) { return false; }
    findIdx = this.selectedValues.indexOf(parentItem);
    if ( findIdx > -1 ) {
      this.selectedValues.splice(findIdx, 1);
    }
    selectListSeries.find((obj) => {
      if ( obj.item === parentItem && obj.parent ) {
        this.removeParentSelected(obj.parent, selectListSeries);
        return true;
      }
    });
  }

  getSelectListSeries(type: string) {
    const selectItems = [];
    const pushItem = ( obj, parent = undefined ) => {
      obj.filter((item) => {
        if ( type === 'node' ) {
          selectItems.push({
            item: item,
            parent: parent,
            child: item.list
          });
        } else if ( type === 'focus') {
          if ( !item.disabled ) {
            selectItems.push(item);
          } else {
            return false;
          }
        }
        if ( item.list ) {
          pushItem( item.list, item );
        }
      });
    };
    pushItem( this.selectList );
    return selectItems;
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
  writeValue(values: any) {
    const selectListItems = this.getSelectListSeries('focus');
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
