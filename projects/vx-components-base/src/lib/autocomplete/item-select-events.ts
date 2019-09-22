export class BeforeItemSelectEvent<T> {

  constructor(public item: T) {

  }

  _preventDefault = false;

  preventDefault(): void {
    this._preventDefault = true;
  }
}

export class BeforeItemDeselectEvent<T> {

  constructor(public item: T) {

  }

  _preventDefault = false;

  preventDefault(): void {
    this._preventDefault = true;
  }
}
