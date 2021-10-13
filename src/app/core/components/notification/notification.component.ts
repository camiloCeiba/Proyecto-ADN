import { Component, Input } from '@angular/core';
import { NotificationLib } from '@core/modelo/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent {

  @Input() objNotificacion: NotificationLib;

  getColor(type) {
    switch (type) {
      case 'success':
        return '#31f290cf';
      case 'warning':
        return '#ddf231cf';
      case 'danger':
        return '#f45858';
      default :
        return '';
    }
  }
}

