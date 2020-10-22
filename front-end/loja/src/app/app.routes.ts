import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './navegacao/home/home.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';

const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: '**', component: NotFoundComponent }
]

@NgModule({
    imports:[
        RouterModule.forRoot(rootRouterConfig, { useHash: false})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}
