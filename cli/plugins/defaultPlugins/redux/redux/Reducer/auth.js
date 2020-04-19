import { createAction, handleActions } from 'redux-actions';
import { createAjaxAction } from '@/common/http';

const defaultLoginState = {
  userInfo: {},
  loading: false,
};

const loginStart = createAction('login start');
const loginEnd = createAction('login end');

export const login = createAjaxAction(loginStart, loginEnd);

export default handleActions({
  'login start': () => ({
    userInfo: {},
    loading: true,
  }),
  'login end': (state, action) => ({
    userInfo: action.payload,
    loading: false,
  }),
  logout: () => ({
    userInfo: {},
    loading: false,
  }),
}, defaultLoginState);
