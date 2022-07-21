import { Injectable } from '@angular/core';
import { HttpParameterCodec } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomHttpParamCodec implements HttpParameterCodec {
  public encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  public encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  public decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  public decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
