/**
 * Created by dobyeongsu on 2016. 10. 31..
 */
import { Map } from 'immutable';

export function getLoginUser(Users, AuthStore) {
  const user = Users ? Users.get(String(AuthStore.get('userId'))) : null;
  if (user) {
    return user;
  } else {
    return Map({});
  }
}
