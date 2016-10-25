import * as types from '../mutation-types';
import * as helloService from '../services/hello';
import createAction from '../utils/create-action';


export const changeHelloMessage = createAction(types.CHANGE_HELLO_MESSAGE,
    ({id}) => helloService.getUsers(id),
    ({id}) => ({
        id,
        sync: 'hello',
    }));
