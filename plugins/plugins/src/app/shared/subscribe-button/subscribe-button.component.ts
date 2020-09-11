import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

import { PushNotificationsService } from 'src/app/push-notifications.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-subscribe-button',
  templateUrl: './subscribe-button.component.html',
  styleUrls: ['./subscribe-button.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscribeButtonComponent {
  private isVisibleInternal$: BehaviorSubject<boolean> = new BehaviorSubject(
    isPlatformBrowser(this.platformId)
      ? !localStorage.getItem('notifications_granted')
      : false
  );

  isVisible$: Observable<boolean> = this.pushNotificationsService.isAvailable$.pipe(
    switchMap((isAvailable: boolean) =>
      isAvailable ? this.isVisibleInternal$ : of(false)
    ),
    tap((isVisible: boolean) => {
      if (isVisible && Notification.permission === 'granted') {
        this.onSubscribe();
      }
    })
  );

  permission$: Observable<NotificationPermission> = this.pushNotificationsService.permission$;

  constructor(
    private pushNotificationsService: PushNotificationsService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  async onSubscribe() {
    if (Notification.permission !== 'denied') {
      const status = await this.pushNotificationsService.subscribe();
      if (status === 'granted') {
        localStorage.setItem('notifications_granted', 'true');
        setTimeout(() => {
          this.isVisibleInternal$.next(false);
        }, 1500);
      }
    }
  }
}