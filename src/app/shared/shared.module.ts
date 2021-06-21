import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

//COMPONENTS
import { AppFooterComponent } from "./app-footer/app-footer.component";
import { AppHeaderComponent } from "./app-header/app-header.component";
import { AppSidebarComponent } from "./app-sidebar/app-sidebar.component";

@NgModule({
  exports: [
    CommonModule,
    AppFooterComponent,
    AppHeaderComponent,
    AppSidebarComponent,
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [
    AppHeaderComponent,
    AppSidebarComponent,
    AppFooterComponent
  ],
})
export class SharedModule { }
