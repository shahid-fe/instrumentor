import { Observable, throwError as observableThrowError } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Inject, Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CustomHttpParamCodec } from './custom-http-param-codec';
import {isArray, clone, extend} from 'lodash';

import { defaultHeaders } from '../lib/server-http';
import { getCookie, setCookie, CookieKey } from '../lib/cookies';

import { tap } from 'rxjs/operators';

const API_URL = 'http://p.k2labs.org';

export const W2_API_URL = `${API_URL}/api/w2`;
export const W2_WS_URL = `${API_URL.replace('http', 'ws')}/api/w2`;
export const W2_API = 'w2';
export const W3_API = 'w3';
export const W3_API_URL = `${API_URL}/api/${W3_API}`;

// this is a BE param used to determine if they should check user permissions when retrieving assets, drivers, or vehicles
// necessary as the current permissions should only pertain to fleet view, but not during alerts workflow
export enum CALLER_NAMES {
  fleetview = 'fleetview',
  alertsPage = 'entity-select-modal',
}

const HARD_VERSION_COOKIE_NAME: CookieKey = CookieKey.HARD_APP_VERSION;
let currentHardVersion = getCookie(HARD_VERSION_COOKIE_NAME);

@Injectable({
  providedIn: 'root',
})
export class ServerApi {
  public API_VER_W2 = 'w2';
  public API_VER_W3 = 'w3';
  private readonly requestDeniedErrorMessage: string = 'Cannot make non-GET requests in remote login session';

  constructor(
    private http: HttpClient,
    private zone: NgZone,
    private customHttpParamCodec: CustomHttpParamCodec,
  ) { }

  public get<T>(
    endpointUrl: string,
    params = new Map(),
    apiVer: string = this.API_VER_W2,
    headers = new Map(),
    useBracketsForArrayValues: boolean = true,
  ) {
    return this.http
      .get<T>(
        `${this._getApiUrl(apiVer)}/${endpointUrl}`,
        this._getRequestOptions('get', params, headers, useBracketsForArrayValues),
      )
      .pipe(
        tap(this._checkVersion.bind(this)),
      );
  }

  public post<T>(
    endpointUrl: string,
    body: any,
    params = new Map(),
    apiVer: string = this.API_VER_W2,
    observeEvents: boolean = false,
  ): Observable<any> {

    return this.http
      .post<T>(
        `${this._getApiUrl(apiVer)}/${endpointUrl}`,
        JSON.stringify(body),
        this._getRequestOptions('post', params, new Map(), true, observeEvents),
      ).pipe(
        tap(this._checkVersion.bind(this)),
      );
  }

  private _getApiUrl(apiVer: string) {
    return `${API_URL}/api/${apiVer}`;
  }

  private _getHeaders(headers = {}) {
    const defaults = clone(defaultHeaders);
    return new HttpHeaders(extend(defaults, headers));
  }

  private _getQueryParams(params: any, useBracketsForArrayValues: boolean = true) {
    let searchParams = new HttpParams({ encoder: this.customHttpParamCodec });
    if (!params) return searchParams;
    params.forEach((val: any, key: any) => {
      if (isArray(val)) {
        if (useBracketsForArrayValues) key = `${key}[]`;
        for (const v of val) searchParams = searchParams.append(key, v);
      } else searchParams = searchParams.set(key, val);
    });
    return searchParams;
  }

  private _getRequestOptions(
    methodType: any,
    params: any,
    headerParams = new Map(),
    useBracketsForArrayValues: boolean = true,
    observeEvents: boolean = false,
  ): any {
    let headers: any = {};

    if (!params) params = new Map();

    if (methodType === 'post' || methodType === 'put' || methodType === 'patch') {
      headers['Content-Type'] = 'application/json';
    }

    headers = this.setInternalAPIKeyHeader(headers, headerParams);
    headers = this.setAcceptLanguageHeader(headers, headerParams);

    if (observeEvents) {
      return {
        observe: 'events',
        reportProgress: true,
        headers: this._getHeaders(headers),
        params: this._getQueryParams(params, useBracketsForArrayValues),
      };
    } else {
      return {
        observe: 'response',
        headers: this._getHeaders(headers),
        params: this._getQueryParams(params, useBracketsForArrayValues),
      };
    }
  }

  private setInternalAPIKeyHeader(requestHeaders: any, headerMap: Map<string, string>): any {
    const xInternalApiKey = headerMap.get('X-Internal-Api-Key');
    if (xInternalApiKey) {
      requestHeaders['X-Internal-Api-Key'] = xInternalApiKey;
    }
    return requestHeaders;
  }

  private setAcceptLanguageHeader(requestHeaders: any, headerMap: Map<string, string>): any {
    const language: string | undefined = headerMap.get('Accept-Language');
    if (language) {
      requestHeaders['Accept-Language'] = language;
    }
    return requestHeaders;
  }

  private _checkVersion(res: any) {
    if (!res.headers) return;
    const newHardVersion = res.headers.get('X-Dashboard-Version');
    if (currentHardVersion && newHardVersion > currentHardVersion) {
      setCookie(HARD_VERSION_COOKIE_NAME, newHardVersion);
      // Defer until all microtasks have executed for reload to work correctly for non-GET requests
      const subscription = this.zone.onStable.subscribe(() => {
        subscription.unsubscribe();
        // force reload with cache disabled
        window.location.href = location.protocol + '//' +
          location.host +
          location.pathname +
          '?a=' + (new Date()).getTime() + '/' +
          location.hash
        ;
      });
    } else if (!currentHardVersion) {
      currentHardVersion = newHardVersion;
      setCookie(HARD_VERSION_COOKIE_NAME, newHardVersion);
    }
  }

  private requestDeniedError(): Observable<never> {
    return observableThrowError(new Error(this.requestDeniedErrorMessage));
  }
}
