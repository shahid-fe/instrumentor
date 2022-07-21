import * as Cookies from 'js-cookie';

const api = Cookies.withAttributes({ path: '/', domain: 'p.k2labs.org' });

export enum CookieKey {
  // App Wide
  AUTH_TOKEN = 'auth_token',
  I18N_LANG = 'i18n_lang',
  HARD_APP_VERSION = 'kt-webapp-version',
  KT_MOBILE_APP = 'kt_mobile_app',
  SUPPORT_USER = 'hijacker',
  SUPPORT_SESSION = 'hijacker_session',
  DASHBOARD_STORAGE = 'dashboard_storage',
  SIDE_BAR_STATUS = 'sidebar_status',
  SIDE_BAR_MAXIMIZED_STATUS = 'is_side_bar_maximized',
  DEMO_USER = 'demo_user',
  DEMO_SESSION = 'demo_session',
  REMOTE_LOGIN_TOKEN = 'remote_login_token',

  // Support
  APEX_USER_NAME = 'apex__user_name',
  APEX_USER_EMAIL = 'apex__user_email',
  APEX_USER_PHONE = 'apex__user_phone',

  // Growth
  USER_INFORMATION = 'user_information',
  UTM_PARAMS = 'utm_params',
  UPSELL_UPGRADE_BTN_SHOW = 'upsell_upgrade_btn_show',
  UPGRADE_TOPBAR_STATUS = 'upgrade_topbar_status',
  FV_VEHICLE_DETAIL_DASHCAM_UPSELL = 'fleet_view_vehicle_details',
  SAFETY_EVENT_DETAIL_DASHCAM_UPSELL = 'safety_event_dashcam_upsell_banner',
  AG_UPSELL_BANNER = 'ag_upsell_banner',

  // OTHERS
  SAFETY_VIEWED_COLLISION_EVENTS = 'collision_event_viewed',
  TABLEAU_TIME_OUT_COOKIE = 'tableau_time_to_live',
}

export function getCookie(cookieName: CookieKey) {
  return api.get(cookieName);
}

export function setCookie(key: string, value: string): string {
  return api.set(key, value) || '';
}

/**
 * Function for removing a cookie from application storage
 * @param key name/key of the cookie
 */
export function removeCookie(key: CookieKey, options?: { path?: string, domain?: string }): void {
  if (!!options) { return api.remove(key, options); }
  return Cookies.remove(key);
}
