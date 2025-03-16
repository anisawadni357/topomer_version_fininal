import { Injectable } from '@angular/core';
import { ProfileService } from './module-auth/profile.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


declare global {
  interface Window {
    google: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleSigninService {
 
   
  }
 

