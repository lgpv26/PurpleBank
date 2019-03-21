import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { InterfaceAccountComponent } from './interface-account/interface-account.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/auth/auth.guard';

const ROUTES = [
    {path: '', component: HomeComponent},
    {path: 'user-account', component: InterfaceAccountComponent, canActivate: [AuthGuard]}
]
@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}