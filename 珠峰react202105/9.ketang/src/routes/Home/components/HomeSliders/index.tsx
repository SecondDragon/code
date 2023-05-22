import React, { PropsWithChildren, useEffect } from 'react';
import Slider from '@/typings/slider';
import {Carousel} from 'antd';
import './index.less';
type Props = PropsWithChildren<{
    sliders: Slider[],
    getSliders: any,
}>;
function HomeSliders(props: Props) {
    useEffect(()=>{
        if(props.sliders.length===0){
            props.getSliders();
        }
    },[])
    return (
        <Carousel effect="scrollx" autoplay>
            {
                props.sliders.map((item:Slider,index:number)=>(
                    <div key={index}>
                        <img src={item.url}/>
                    </div>
                ))
            }
        </Carousel>
    )
}

export default HomeSliders;