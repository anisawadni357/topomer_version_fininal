import { Component, OnInit,NgZone} from '@angular/core';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { isPlatform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
//import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false
}) 

export class LoginPage implements OnInit {
  debugLog: any = null;

  errorlogin="";
  user={
    email:"",
    password:"",
  
 
  }
  userVerif={
    email:"",

    password:"",
   
  }
  userVerifstyle={
    email:"",
  
    password:"",
  
  }
  
  firstName: string = '';
  lastName: string = '';
  loggedIn: boolean = false;
  isAndroid:any=false;
  users:any=[];
  resp:any=[];
  constructor(private ngZone: NgZone,private platform: Platform,private router: Router,private profileService:ProfileService,private toastController: ToastController) {
   
   }
   
  ngOnInit() {
   
    //GoogleAuth.initialize();
   
  }
  async loginWithGoogle() {
    /*try {
    const response = await GoogleAuth.signIn();
      this.resp=response;
    } catch (error) {
      this.resp=error;
    }*/
  }

  

  login()
  {
   
      if(this.user.email.length<3 || this.user.email.length>50)
      {
        this.userVerif.email = "This email or username incorrect";
        this.userVerifstyle.email = "border-bottom:1px solid red !important";
      }else 
      {
        this.userVerif.email = "";
        this.userVerifstyle.email = "";
      }
      if(this.user.password.length<6 || this.user.password.length>50)
        {
          this.userVerif.password = "This password incorrect";
          this.userVerifstyle.password = "border-bottom:1px solid red !important";
        }else 
        {
          this.userVerif.password = "";
          this.userVerifstyle.password = "";
        }
        if(this.userVerif.email=="" && this.userVerif.password=="")
        {
          this.profileService.login(this.user)
            .subscribe(
              data => {
                if (data) {
                 console.log(data)
                 if(data.error)
                 {
                    this.errorlogin="Email or password incorrect";
                    this.userVerifstyle.email="border-bottom:1px solid red !important";
                    this.userVerifstyle.password = "border-bottom:1px solid red !important";
                  
                 }else  if(data.user)
                 {
                  this.errorlogin="";
                  this.userVerifstyle.email="";
                  this.userVerifstyle.password = "";
                 
                  
                    sessionStorage.setItem('user',JSON.stringify(data.user));
                    let  user=sessionStorage.getItem("user");
                    let users = user ? JSON.parse(user) : null;
                    let tags=JSON.parse(users.tags);
                    this.showSuccessToast();
                    if (data.user.type == null || (data.user.type != 1 && data.user.type != 2)) {
                     
                    setTimeout(() => {
                        this.router.navigate(['/choice-type']);
                      }, 1000);
                   
                    } else if(tags==null || Object.keys(tags).length === 0 || tags.length === 0)
                      {
                       setTimeout(() => {
                         this.router.navigate(['/tags-management']);
                       }, 1000); 
                      } 
                    else {
                      setTimeout(() => {
                        this.router.navigate(['/']);
                      }, 1000); 
                    }
                 
                 }
                }else 
                {
                  this.showErrorToast("please try again later.");
                }
              },
              error => {
                this.showErrorToast("please try again later.");
              }
            );
        }
  }

  
  async showSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Successful login',  
      duration: 3000,  
      position: 'top',  
      color: 'success', 
      cssClass: 'custom-toast-class' 
    });

    toast.present(); 
  }

  async showErrorToast(msg:any) {
    const toast = await this.toastController.create({
      message:msg,  
      duration: 3000,  
      position: 'top',  
      color: 'danger', 
      cssClass: 'custom-toast-class' 
    });

    toast.present(); 
  }

  

  
  

}
