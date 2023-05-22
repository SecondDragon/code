import React from 'react';
import {matchPath,__RouterContext as RouterContext} from '../react-router-dom';
export function useHistory(){
   let contextValue =  React.useContext(RouterContext);
   return contextValue.history;
}
export function useLocation(){
  let contextValue =  React.useContext(RouterContext);
   return contextValue.location;
}
export function useParams(){
    let contextValue =  React.useContext(RouterContext);
   return contextValue.match.params;
}
export function useRouteMatch(path){
    let {location,match} =  React.useContext(RouterContext);
    return path?matchPath(location.pathname,path):match;
}