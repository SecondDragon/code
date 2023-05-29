import React, { lazy, Suspense, useState, useEffect } from "react"
import { Router, Route, Switch, Redirect } from "react-router-dom"
import { createBrowserHistory } from "history"
// import MarketingApp from "./components/MarketingApp"
// import AuthApp from "./components/AuthApp"
import Header from "./components/Header"
import Progress from "./components/Progress"

const MarketingApp = lazy(() => import("./components/MarketingApp"))
const AuthApp = lazy(() => import("./components/AuthApp"))
const DashboardApp = lazy(() => import("./components/DashboardApp"))

const history = createBrowserHistory()

function App() {
  const [status, setStatus] = useState(false)
  useEffect(() => {
    console.log(status)
    if (status) {
      history.push("/dashboard")
    }
  }, [status])
  return (
    <Router history={history}>
      <Header status={status} setStatus={setStatus} />
      <Suspense fallback={<Progress />}>
        <Switch>
          <Route path="/auth/signin">
            <AuthApp setStatus={setStatus} />
          </Route>
          <Route path="/dashboard">
            {!status && <Redirect to="/" />}
            <DashboardApp />
          </Route>
          <Route path="/">
            <MarketingApp />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
