import { getCookie, setCookie, CookieKey } from './cookies';

// const AUTH_TOKEN: string = getCookie(CookieKey.AUTH_TOKEN);

 // FM 160 pariso
const AUTH_TOKEN = decodeURIComponent('wJxNGD%2BFYVwFIrYIzy%2Bh3Cn1wqmUVYEe6IUAO%2BiOqLC1JBX8iZCKBYO9%2Bb0iRQBu');

// FM 114 Enterprise
// const AUTH_TOKEN = decodeURIComponent('uiCxI%2BdmoLeGhjzAosesolmQ0bosodCgOKKZOFdeOuIgD8SRC6g0ehvdhrHT3oBO')

// Driver token
// const AUTH_TOKEN = decodeURIComponent('levBgANazpx%2BlaBB1lCCCvbbkAzNkmrBJ%2B6ybN40PMJOpJRTFAOmDfDkkGf3pHAb');

// FM 160
// const AUTH_TOKEN = decodeURIComponent('MTJlYzBiYWY5ZDY5YzNjOWZlYTk5ODhlMjdhYjU3MDUxMmVmODgxMGM3OTA2NmFkZTQ0YTMzZmViNmQ4MWIwZTQxNWZhNGNlYmI4ZWM3NjQ5YzcyOGM3NzVhMDBmMzFmYWI0MTFiM2FlZWFkNDY3OGE4');

// FM for load board
// const AUTH_TOKEN = decodeURIComponent('ZmZjNTc4ZjgxMzdhMzQ1NGRkZDA3YWJhZTUzMzI4ZGM1MThhNjdiNzRkMWUzNmNlNjZmYThkZTc0NDM1N2Y4NzdhYjEyNzM0ZTZmNTlhM2QyZjZiNWIxMDExMTgyZmE2NzlhYzc0ZTU0ZDk3NjBhNmM0');


let basicHeaders;
if (AUTH_TOKEN) {
  basicHeaders = {
    'X-Web-User-Auth': AUTH_TOKEN,
  };
}


export const defaultHeaders = Object.assign({}, basicHeaders, {}, {});

export function overrideAuthToken(authToken: string) {
  setCookie(CookieKey.AUTH_TOKEN, authToken);
  defaultHeaders['X-Web-User-Auth'] = authToken;
}
