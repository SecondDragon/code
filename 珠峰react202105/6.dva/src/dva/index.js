import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import prefixNamespace from './prefixNamespace';
import * as sagaEffects from 'redux-saga/effects';
import {routerMiddleware,connectRouter} from 'connected-react-router';
import {createHashHistory} from 'history';
export {
    connect
}
function dva(options={}) {
    const app = {
        model,
        _models: [],
        router,
        _router: null,
        start
    }
    let history = options.history||createHashHistory();
    let initialReducers = {router:connectRouter(history)};
    function model(model) {
        const prefixedModel = prefixNamespace(model);
        app._models.push(prefixedModel);
        return prefixedModel;
    }
    function router(router) {
        app._router = router;
    }
    function start(selector) {
        for (const model of app._models) {
            initialReducers[model.namespace] = getReducer(model);
        }
        let rootReducer = createReducer();
        const sagas = getSagas(app);
        const sagaMiddleware = createSagaMiddleware();
        //let store = createStore(rootReducer);
        let store = applyMiddleware(routerMiddleware(history),sagaMiddleware)(createStore)(rootReducer);
        sagas.forEach(saga => sagaMiddleware.run(saga));
        ReactDOM.render(
            <Provider store={store}>
                {app._router({history})}
            </Provider>
            , document.querySelector(selector));
        function createReducer() {
            return combineReducers(initialReducers);
        }
    }
    function getSagas(app) {
        let sagas = [];
        for (const model of app._models) {
            sagas.push(getSaga(model.effects, model));
        }
        return sagas;
    }
    function getSaga(effects, model) {
        return function* () {
            for (const key in effects) {
                const watcher = getWatcher(key, effects[key], model);
                yield sagaEffects.fork(watcher);
            }
        }
    }
    //rootSaga watcherSaga workerSaga
    /**
     * 返回一个watcherSaga 当每次向仓库派发asyncAdd的时候，都会执行asyncAddEffect saga
     * @param {*} key  asyncAdd
     * @param {*} effect  asyncAddEffect
     * @param {*} model 
     * @returns 
     */
    function getWatcher(key, effect, model) {
        return function* () {
            //saga的默认行为，就是每当动作派发的时候，在执行effect的时候会默认传递action
            yield sagaEffects.takeEvery(key, function* sagaWithCatch(...args) {
                console.log('args', args);
                yield effect(...args, {
                    ...sagaEffects, put: (action) => (
                        sagaEffects.put({ ...action, type: prefixType(action.type, model) })
                    )
                });
            });
        }
    }
    /**
     * 
     * @param {*} type add
     * @param {*} model 
     */
    function prefixType(type, model) {
        if (type.indexOf('/') === -1) {
            return `${model.namespace}/${type}`;//counter1/add
        } else {
            if (type.split('/')[0] === model.namespace) {
                console.warn(`Warning: [sagaEffects.put] ${type} should not be prefixed with namespace ${model.namespace}`);
            }
            return type;
        }
    }
    function getReducer(model) {
        let { reducers, state: initialState } = model;
        //state={number:0} action={type:"ADD"}
        let reducer = (state = initialState, action) => {
            let reducer = reducers[action.type];
            if (reducer)
                return reducer(state, action);
            return state;
        }
        return reducer
    }
    return app;
}

export default dva;