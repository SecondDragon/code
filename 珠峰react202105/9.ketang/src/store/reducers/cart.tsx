import { AnyAction } from 'redux';
import { CartItem } from '@/typings/cart'
import * as actionTypes from '@/store/action-types';

export type CartState=CartItem[]
let initialState: CartState = []
function cart(state:CartState = initialState, action: AnyAction): CartState {
    switch (action.type) {
        case actionTypes.ADD_CART_ITEM:
            let oldIndex = state.findIndex(item => item.lesson.id === action.payload.id);
            if (oldIndex === -1) {
                state.push({
                    checked: false,
                    count: 1,
                    lesson: action.payload
                });
            } else {
                state[oldIndex].count += 1;
            }
            break;
        default:
            break;
    }
    return state;
}
export default cart;