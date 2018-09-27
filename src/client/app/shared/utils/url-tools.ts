import { URLSearchParams } from '@angular/http';

export class UrlTools {
  /**
   * Retrieves a fragment of an url path
   * @param url url to take the frament from
   * @param fragmentIndex index of fragment ( starts at 0 ) @default 0
   */
  static getUrlPathFragment(url: string, fragmentIndex = 0) {
    // remove any http(s)//:[domain] the url may have
    const splitAbsolutUrl = url.split(/https?:\/{2}[^\/]+\//);
    const relativeUrl = splitAbsolutUrl[splitAbsolutUrl.length - 1];

    return relativeUrl.split('?', 1)[0].split('/')[fragmentIndex + +relativeUrl.startsWith('/')];
  }

  /**
   * Builds an url with query string parameters
   */
  static buildQueryString(baseUrl: string = '', ...params: Object[]) {
    const qsParams = new URLSearchParams();

    params.forEach(param => {
      for (const key in param) {
        if (param.hasOwnProperty(key)) {
          const value = param[key];
          if (Array.isArray(value)) {
            value
              .filter(k => k !== null && k !== undefined)
              .forEach(arrayValue => qsParams.append(key, arrayValue));
          } else if (key !== undefined && value !== undefined) {
            qsParams.set(key, value);
          }
        }
      }
    });

    const appendChar = qsParams.paramsMap.size === 0 ? '' : baseUrl.indexOf('?') === -1 ? '?' : '&';
    return `${baseUrl}${appendChar}${qsParams.toString()}`;
  }
}
