import {Title} from '@angular/platform-browser';
import {Injectable} from '@angular/core';

@Injectable()
export class TitleService extends Title {
  getTitle(): string {
    return super.getTitle().replace(' - VxComponents', '');
  }

  setTitle(newTitle: string): void {
    super.setTitle(`${newTitle} - VxComponents`);
  }
}
