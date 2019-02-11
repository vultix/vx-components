import { Constructor } from 'vx-components-base';

export class VxNsDialogDef<DataType, CloseDataType> {
     __D?: DataType;
     __C?: CloseDataType;

    // __kludge(x: DataType): CloseDataType {
    //   return '' as any;
    // }
}

export type DialogDataType<T extends VxNsDialogDef<any, any>> = T extends VxNsDialogDef<infer U, any> ? U : any;

export type DialogCloseDataType<T extends VxNsDialogDef<any, any>> = T extends VxNsDialogDef<any, infer U> ? U : any;
