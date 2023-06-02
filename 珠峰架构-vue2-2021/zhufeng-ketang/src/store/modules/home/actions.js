import * as Types from '@/store/action-types';
import {fecthSlides} from '@/api/home.js'
const homeActions = {
    async [Types.SET_SLIDES]({commit}){
       let slides =  await fecthSlides();
       commit(Types.SET_SLIDES,slides); // 交给mutation去更改状态
    }
}

export default homeActions;
