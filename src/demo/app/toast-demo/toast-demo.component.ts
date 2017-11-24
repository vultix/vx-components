import { Component, OnInit } from '@angular/core';
import {VxToast, ToastType, ToastPosition} from '../lib/';
import {TitleService} from '../title.service';

@Component({
  selector: 'vx-toast-demo',
  templateUrl: './toast-demo.component.html',
  styleUrls: ['./toast-demo.component.css']
})
export class ToastDemoComponent implements OnInit {
  importLbl = `import {VxToastModule} from 'vx-components';`;

  toastTypes = ['error', 'info', 'success', 'warn'];
  toastPositions = ['top-left', 'top-middle', 'top-right', 'bottom-left', 'bottom-middle', 'bottom-right'];

  toastType: ToastType = 'success';
  toastText = 'Successfully Created a Toast!';
  toastTitle = 'Success!';
  toastPos: ToastPosition = 'top-right';


  example1HTML = `<button vx-button (click)="showToast()">Show Toast!</button>

<vx-autocomplete placeholder="Toast Position" [(ngModel)]="toastPos">
  <vx-item *ngFor="let position of toastPositions">{{position}}</vx-item>
</vx-autocomplete>
<vx-autocomplete placeholder="Toast Type" [(ngModel)]="toastType">
  <vx-item *ngFor="let type of toastTypes">{{type}}</vx-item>
</vx-autocomplete>

<vx-input-wrapper>
  <input vxInput placeholder="Toast Title" [(ngModel)]="toastTitle">
</vx-input-wrapper>
<vx-input-wrapper>
  <input vxInput placeholder="Toast Text" [(ngModel)]="toastText">
</vx-input-wrapper>`;

  example1TS = `import { Component, OnInit } from '@angular/core';
import {VxToast, ToastPosition, ToastType} from 'vx-components';

@Component({
  selector: 'vx-toast-demo',
  templateUrl: './toast-demo.component.html',
  styleUrls: ['./toast-demo.component.css']
})
export class ToastDemoComponent implements OnInit {
  toastTypes = ['error', 'info', 'success', 'warn'];
  toastPositions = ['top-left', 'top-middle', 'top-right', 'bottom-left', 'bottom-middle', 'bottom-right'];

  toastType: ToastType = 'success';
  toastText = 'Successfully Created a Toast!';
  toastTitle = 'Success!';
  toastPos: ToastPosition = 'top-right';
  
  constructor(private toast: VxToast) { }
  
  showToast(): void {
    this.toast.open({
      text: this.toastText,
      position: this.toastPos,
      type: this.toastType,
      title: this.toastTitle
    });
  }
}`;

  toastUsage = `constructor(private vxToast: VxToast) { }`;

  constructor(private toast: VxToast, private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.title = 'Toast';
  }

  showToast(): void {
    this.toast.open({
      text: this.toastText,
      position: this.toastPos,
      type: this.toastType,
      title: this.toastTitle
    });
  }

}
