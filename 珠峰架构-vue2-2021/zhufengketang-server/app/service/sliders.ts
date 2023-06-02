
import {Service} from 'egg';

export default class SliderService extends Service{
    async getSlider(){
        const sliders = [
            {url:'http://www.javascriptpeixun.cn/files/system/2018/09-18/111926eb7fd8309596.png?version=8.3.6'},
            {url:'http://www.javascriptpeixun.cn/files/system/2018/09-21/1154091603c0186386.png?version=8.3.6'},
            {url:'http://www.javascriptpeixun.cn/files/system/2018/09-21/115355363dbc278291.png?version=8.3.6'}
        ]

        return sliders
    }
}