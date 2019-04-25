import { Component } from '@angular/core';

export class VxDialogDef<DataType = undefined, CloseDataType = undefined> {
     __D?: DataType;
     __C?: CloseDataType;

    // __kludge(x: DataType): CloseDataType {
    //   return '' as any;
    // }
}

export type DialogDataType<T extends VxDialogDef<any, any>> = T extends VxDialogDef<infer U, any> ? U : any;

export type DialogCloseDataType<T extends VxDialogDef<any, any>> = T extends VxDialogDef<any, infer U> ? U : any;
