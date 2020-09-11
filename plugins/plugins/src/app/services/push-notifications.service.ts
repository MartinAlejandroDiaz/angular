import 'firebase/messaging';

import * as firebase from 'firebase/app';

import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from './firebase';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

const serviceWorkerControlled = () =>
  new Promise<void>(resolve => {
    if (navigator.serviceWorker.controller) {
      return resolve();
    }
    navigator.serviceWorker.addEventListener('controllerchange', () =>
      resolve()
    );
  });

@Injectable({
  providedIn: 'root',
})
export class PushNotificationsService {
  private isAvailableInternal$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  isAvailable$: Observable<boolean> = this.isAvailableInternal$.asObservable();

  private permissionInternal$: BehaviorSubject<
    NotificationPermission
  > = new BehaviorSubject(
    isPlatformBrowser(this.platformId) && 'Notification' in window
      ? Notification.permission
      : 'default'
  );

  permission$: Observable<
    NotificationPermission
  > = this.permissionInternal$.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private http: HttpClient
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.init();
    }
  }

  async init() {
    if (!('serviceWorker' in navigator)) {
      return;
    }
    if (!('Notification' in window)) {
      return;
    }
    initializeApp();
    const swr = await navigator.serviceWorker.ready;
    await serviceWorkerControlled();
    navigator.serviceWorker.controller.postMessage({
      action: 'INITIALIZE_FCM',
      firebaseConfig: environment.firebaseConfig,
    });
    this.isAvailableInternal$.next(true);
    const messaging = firebase.messaging();

    messaging.useServiceWorker(swr);
    messaging.usePublicVapidKey(environment.publicVapidKey);

    messaging.onTokenRefresh(() => this.getToken());
  }

  async getToken() {
    const messaging = firebase.messaging();
    const token = await messaging.getToken();
    console.log('Token is:');
    console.log(token);
    console.log('Sending request to /notifications/subscribe/topic/all');
    await this.http
      .post(`${environment.functions.notificationsHttp}/subscribe/topic/all`, {
        token,
      })
      .toPromise();
  }

  async subscribe() {
    console.log('Requesting permission...');
    const permission: NotificationPermission = await Notification.requestPermission();
    this.permissionInternal$.next(permission);
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      await this.getToken();
    } else {
      console.log('Unable to get permission to notify.');
    }
    return permission;
  }
}