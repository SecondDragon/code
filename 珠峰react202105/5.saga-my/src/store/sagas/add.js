import { put, take} from '../../redux-saga/effects';
import * as actionTypes from '../action-types';
//监听saga
function* addListener(){
    for(let i=0;i<3;i++){
        yield take(actionTypes.ASYNC_ADD);
        yield put({type:actionTypes.ADD});
    }
    return 'add3';
}
export default addListener;