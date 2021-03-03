import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore'
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './shared/components/header/header.component';
import { HeaderModule } from './shared/components/header/header.module';
import { CustomerFormModule } from './shared/components/customer-form/customer-form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductFormModule } from './shared/components/product-form/product-form.module';
import { ProductFormComponent } from './shared/components/product-form/product-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HeaderModule,
    CustomerFormModule,
    BrowserAnimationsModule,
    ProductFormModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
