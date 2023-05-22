
import React from 'react';
import RouterContext from './RouterContext';
function withRouter(OldComponent){
  return props=>(
    <RouterContext.Consumer>
        {
            (value)=>(
                <OldComponent {...value} {...props}/>
            )
        }
    </RouterContext.Consumer>
  )
}
export default withRouter;