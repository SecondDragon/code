import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {WindowService} from '../common/window.service';
import {AuthKey} from '../../../configs/constant';
import {catchError} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd/message';

interface CustomHttpConfig {
  headers?: HttpHeaders;
}

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private windowServe: WindowService, public message: NzMessageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.windowServe.getStorage(AuthKey);
    let httpConfig: CustomHttpConfig = {};
    if (!!auth) {
      httpConfig = {headers: req.headers.set(AuthKey, auth)};
    }
    const copyReq = req.clone(httpConfig);
    return next.handle(copyReq).pipe(catchError(error => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const status = error.status;
    let errMsg = '';
    if (status === 0) {
      errMsg = '网络出现未知的错误，请检查您的网络。';
    }
    if (status >= 300 && status < 400) {
      errMsg = '请求被服务器重定向，状态码为' + status;
    }
    if (status >= 400 && status < 500) {
      errMsg = '客户端出错，可能是发送的数据有误，状态码为' + status;
    }
    if (status >= 500) {
      errMsg = '服务器发生错误，状态码为' + status;
    }
    return throwError({
      code: status,
      message: errMsg
    });
  }
}
