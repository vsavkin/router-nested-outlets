import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule, ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
  selector: "app-main",
  template: `
    <div style="background-color: green">
      main outle
    </div>
  `
})
export class MainComponent {}

@Component({
  selector: "app-aux",
  template: `
    <div style="background-color: lightblue">
      aux outlet
      <router-outlet></router-outlet>
    </div>
  `
})
export class AuxComponent {}

@Component({
  selector: "app-child-aux",
  template: `
    <div>child aux: {{ parent | async }} {{ child | async }}</div>

    <div>
      Actions
      <div><a [routerLink]="['../../newparentvalue/newchildvalue']">Change parent</a></div>
      <div><a [routerLink]="['../otherchildvalue']">Change child</a></div>
    </div>
  `
})
export class ChildAuxComponent {
  constructor(private readonly route: ActivatedRoute) {}
  parent = this.route.parent.params.pipe(map(p => p["parent"]));
  child = this.route.params.pipe(map(p => p["child"]));
}

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/mainroute(aux:auxroute/parentparamvalue/childparamvalue)"
  },
  {
    path: "mainroute",
    component: MainComponent
  },
  {
    path: "auxroute/:parent",
    component: AuxComponent,
    outlet: "aux",
    children: [
      {
        path: ":child",
        component: ChildAuxComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
