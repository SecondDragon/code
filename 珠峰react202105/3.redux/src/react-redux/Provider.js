import React from 'react';
import ReactReduxContext from './ReactReduxContext';

function Provider(props){
    return (
        <ReactReduxContext.Provider value={{store:props.store}}>
            {props.children}
        </ReactReduxContext.Provider>
    )
}
export default Provider;