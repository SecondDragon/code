import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { AppComponent } from "./app.component"
import { HomeComponent } from "./pages/home/home.component"
import { AboutComponent } from "./pages/about/about.component"
import { NewsComponent } from "./pages/news/news.component"
import { RouterModule, Routes } from "@angular/router"

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full",
    data: {
      animation: "one"
    }
  },
  {
    path: "about",
    component: AboutComponent,
    data: {
      animation: "two"
    }
  },
  {
    path: "news",
    component: NewsComponent,
    data: {
      animation: "three"
    }
  }
]

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent, NewsComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
