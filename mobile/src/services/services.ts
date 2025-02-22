import { ENV } from '~/common/enums/enums';

import { AuthApi } from './auth-api/auth-api.service';
import { Http } from './http/http.service';
import { Notification } from './notification/notification.service';

const http = new Http();

const authApi = new AuthApi({
  http,
  apiPrefix: ENV.APP.API_PATH,
});

const notification = new Notification();

export { authApi, notification };
