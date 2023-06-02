/**
 * history.push(path, [state])
 * history.replace(path, [state])
 * history.go(n)
 * history.goBack()
 * history.goForward()
 *
 * history.listen(func) // listen for changes to the current location
 *
 */
import { createHashHistory } from 'history';

const HISTORY = createHashHistory({
  basename: '/',
});

export default HISTORY;
