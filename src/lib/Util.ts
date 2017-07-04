export function coerceBooleanProperty(value: any): boolean {
  // tslint:disable-next-line
  return value != null && `${value}` !== 'false';
}
