import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withRouterConfig,
  withComponentInputBinding,
} from '@angular/router';
import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { JwtInterceptor } from '../body/login-setup/sign-up/jwtIntcepter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
      withComponentInputBinding()
    ),
    provideHttpClient(withInterceptorsFromDi()), // Enable DI-based interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
};
