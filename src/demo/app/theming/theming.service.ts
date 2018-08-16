import {Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable()
export class ThemingService {
  private bundle?: string;

  constructor(private http: HttpClient) {
  }

  loadBundle(): Observable<string> {
    if (this.bundle) {
      return of(this.bundle);
    } else {
      return this.http.get('assets/bundle.scss', {responseType: 'text'});
    }
  }
}
