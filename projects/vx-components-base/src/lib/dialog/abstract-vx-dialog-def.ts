export class AbstractVxDialogDef<DataType, CloseDataType> {

}

export type DialogDataType<T extends AbstractVxDialogDef<any, any>> = T extends AbstractVxDialogDef<infer U, any> ? U : never;
export type DialogCloseDataType<T extends AbstractVxDialogDef<any, any>> = T extends AbstractVxDialogDef<any, infer U> ? U : never;
