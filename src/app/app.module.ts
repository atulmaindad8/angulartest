import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './user/create/create.component';
import { EditComponent } from './user/edit/edit.component';
import { IndexComponent } from './user/index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './user/detail/detail.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'user/add',
    component: CreateComponent
  },
  {
    path: 'user/:email',
    component: EditComponent
  },
  {
    path: 'details/:email',
    component: DetailComponent
  },
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'users',
    component: IndexComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    EditComponent,
    IndexComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
