import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,MatSelectCountryModule.forRoot('fr')
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
