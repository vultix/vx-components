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

  close(data: CloseDataType): void {
    this.dialog.close(data);
  }
}
