import { HttpResponse } from '@angular/common/http';

export function extractResponseBody<T>(response: HttpResponse<T>): any {
  return response.body;
}