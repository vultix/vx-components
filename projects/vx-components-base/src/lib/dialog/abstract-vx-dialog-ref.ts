import { Observable } from 'rxjs';
import { AbstractVxDialogComponent } from './abstract-vx-dialog.component';

export class AbstractVxDialogRef<ComponentType, DataType, CloseDataType> {

  get componentInstance(): ComponentType {
    return this.dialog.componentInstance;
  }


  get data(): DataType {
    return this.dialog.data;
  }

  onClose: Observable<CloseDataType> = this.dialog.onClose.asObservable();

  constructor(private dialog: AbstractVxDialogComponent<ComponentType, DataType, CloseDataType>) {

  }

  // This is confusing but essentially makes the data parameter optional if the CloseDataType is optional.
  // Watch https://github.com/Microsoft/TypeScript/issues/12400 to remove this need.
  close(...data: CloseDataType extends undefined ? [undefined] : [CloseDataType]): void {
    this.dialog.close(data[0] as CloseDataType);
  }
}
