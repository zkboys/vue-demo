import * as types from '../mutation-types';
import * as helloService from '../services/hello';

export const changeHelloMessage = ({commit}, id) => {
    const message = helloService.getMessage(id);
    commit(types.CHANGE_HELLO_MESSAGE, {message});
};
