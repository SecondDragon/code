import React from "react"
import Parcel from "single-spa-react/parcel"
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom"
import Home from "./Home"
import About from "./About"

export default function Root(props) {
  return (
    <BrowserRouter basename="/todos">
      <Parcel config={System.import("@study/navbar")} />
      <div>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
