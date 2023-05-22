import { put,take} from '../../redux-saga/effects';
import * as actionTypes from '../action-types';
function* minusListener(){
    for(let i=0;i<2;i++){
        yield take(actionTypes.ASYNC_MINUS);
        yield put({type:actionTypes.MINUS});
    }
    return 'minus2';
}
export default minusListener;