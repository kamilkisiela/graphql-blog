import { EventEmitter } from 'events';

export interface BaseItem {
  id: number;
}

export class Base<T extends BaseItem> {
  public data: T[] = [];
  public events = new EventEmitter;
  public lastID: number = 0;

  public findAll(): Promise<T[]> {
    return Promise.resolve(this.data);
  }

  public findOne(id: number): Promise<T> {
    return Promise.resolve(this.data.find(o => o.id === id));
  }

  public generateID(): number {
    return ++this.lastID;
  }
}
