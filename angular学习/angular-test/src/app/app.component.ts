import {
  animate,
  group,
  query,
  style,
  transition,
  trigger
} from "@angular/animations"
import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [],
  animations: [
    trigger("routerAnimation", [
      transition("one => two, one => three, two => three", [
        query(":enter", style({ transform: "translateX(100%)", opacity: 0 })),
        group([
          query(
            ":enter",
            animate(
              "0.4s ease-in",
              style({ transform: "translateX(0)", opacity: 1 })
            )
          ),
          query(
            ":leave",
            animate(
              "0.4s ease-out",
              style({ transform: "translateX(-100%)", opacity: 0 })
            )
          )
        ])
      ]),
      transition("three => two, three => one, two => one", [
        query(
          ":enter",
          style({ transform: "translateX(-100%)", opacity: 0 })
        ),
        group([
          query(
            ":enter",
            animate(
              "0.4s ease-in",
              style({ transform: "translateX(0)", opacity: 1 })
            )
          ),
          query(
            ":leave",
            animate(
              "0.4s ease-out",
              style({ transform: "translateX(100%)", opacity: 0 })
            )
          )
        ])
      ])
    ])
  ]
})
export class AppComponent {
  prepare(outlet: RouterOutlet) {
    if (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData.animation
    ) {
      return outlet.activatedRouteData.animation
    }
  }
}
