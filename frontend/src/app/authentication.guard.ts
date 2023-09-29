import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from './user.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  return inject(UserService).isLoggedIn();
};

