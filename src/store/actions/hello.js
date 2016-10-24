import * as types from '../mutation-types';
import * as helloService from '../services/hello';
import createAction from '../utils/create-action';


export const changeHelloMessage = createAction(types.CHANGE_HELLO_MESSAGE,
    ({id}) => {
        console.log(`payloadCreator:${id}`);
        return helloService.getMessage(id);
    },
    ({id}) => {
        console.log(`metaCreator:${id}`);
        return {
            id,
        };
    });
/*
 export const changeHelloMessage = ({commit}, payload) => {
 const id = payload.id;
 console.log(payload);
 const message = helloService.getMessage(id);
 commit(types.CHANGE_HELLO_MESSAGE, {
 payload: {message},
 });
 };
 */
