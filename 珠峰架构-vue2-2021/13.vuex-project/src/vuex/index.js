import install from './install';
import Store from './store'



function mapState(stateList) {
    let obj = {};
    for (let i = 0; i < stateList.length; i++) {
      let stateName = stateList[i];
      obj[stateName] = function () {
        return this.$store.state[stateName];
      };
    }
    return obj;
  }
  function mapGetters(gettersList) {
    let obj = {};
    for (let i = 0; i < gettersList.length; i++) {
      let getterName = gettersList[i];
      obj[getterName] = function () {
        return this.$store.getters[getterName];
      };
    }
    return obj;
  }
  function mapMutations(mutationList) {
    let obj = {};
    for (let i = 0; i < mutationList.length; i++) {
      obj[mutationList[i]] = function (payload) {
        this.$store.commit(mutationList[i], payload);
      };
    }
    return obj;
  }
  function mapActions(actionList) {
    let obj = {};
    for (let i = 0; i < actionList.length; i++) {
      obj[actionList[i]] = function (payload) {
        this.$store.dispatch(actionList[i], payload);
      };
    }
    return obj;
  }
export default {
    install,
    Store,
    mapState,
    mapGetters,
    mapMutations,
    mapActions
}