import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choice-montant',
  templateUrl: './choice-montant.page.html',
  styleUrls: ['./choice-montant.page.scss'],
  standalone:false
})
export class ChoiceMontantPage implements OnInit {
  baseUrlFile: string = environment.BASE_URL_file;
  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private alertController: AlertController,
    private router: Router
  ) { }
  cardNumber: string = '';
  expDate: string = ''; // Format : MM/YY
  cvc: string = '';
  amount: number = 1000; // Montant en cents (par exemple
  id: any = 0;
  user: any = [];
  userId: any = 0;
  userSend: any = [];
  path: any = "";
  pay: any = 10.0;
  payEr: any = "";
  payStyle: any = "";
  type:any=1;
  livraisonAdresse="";
  livraisonNom="";
  livraisonPrenom="";
  livraison:any={
    nomStyle:"",
    prenomStyle:"",
    adresseSytle:"",
    nomMessage:"",
    prenomMessage:"",
    adresseMessage:""
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    this.userId = users.id;
    this.userSend = users;
    this.livraisonNom=users.nom;
    this.livraisonPrenom=users.prenom;
    if (sessionStorage.getItem('path')) {
      if (sessionStorage.getItem('path') != "") {
        this.path = sessionStorage.getItem('path');
      } else {
        this.path = "/";
      }
    }
    this.getData();
  }

  getData() {
    this.profileService.getByIdUser(this.id)
      .subscribe(
        data => {
          if (data) {
            this.user = data;
          }
        },
        error => {
          console.error("Erreur lors de la récupération des données utilisateur:", error);
        }
      );
  }

  next() {
    var ret=true;
     this.payEr = "";
      this.payStyle = "";
      this.livraison.adresseMessage="";
      this.livraison.adresseStyle= "";
      this.livraison.prenomMessage="";
      this.livraison.prenomStyle= "";
      this.livraison.nomMessage="";
      this.livraison.nomStyle= "";
    if (this.pay < 10 || this.pay > 10000) {
      this.payEr = "Amount unavailable.";
      this.payStyle = "border-bottom:1px solid red !important";
      ret=false;
    }if(this.type==2){
      if(this.livraisonNom.length<2 || this.livraisonNom.length>30)
      {
        this.livraison.nomMessage="Invalid name";
        this.livraison.nomStyle= "border-bottom:1px solid red !important";
        ret=false;
      }else if(this.livraisonPrenom.length<2 || this.livraisonPrenom.length>30)
      {
        this.livraison.prenomMessage="Invalid first name";
        this.livraison.prenomStyle= "border-bottom:1px solid red !important";
        ret=false;
        
      }else if(this.livraisonAdresse.length<5 || this.livraisonAdresse.length>150)
      {
        this.livraison.adresseMessage="Invalid adress";
        this.livraison.adresseStyle= "border-bottom:1px solid red !important";
        ret=false;
        
      }
    } if(ret) {
      sessionStorage.setItem('livraison_nom',this.livraisonNom)
      sessionStorage.setItem('livraison_prenom',this.livraisonPrenom)
      sessionStorage.setItem('livraison_adresse',this.livraisonAdresse)
      this.payEr = "";
      this.payStyle = "";
      this.livraison.adresseMessage="";
      this.livraison.adresseStyle= "";
      this.livraison.prenomMessage="";
      this.livraison.prenomStyle= "";
      this.livraison.nomMessage="";
      this.livraison.nomStyle= "";
      this.presentValidationAlert();
    }
  }

  async presentValidationAlert() {
  
    this.router.navigate(['/stripe/'+this.id+'/'+this.pay+"/"+this.type]);
  }

  async payement() {
    const data = {
      amount: this.pay * 100  // Assurez-vous que le montant est bien en cents
    };

 
  }

  async confirmPayment(clientSecret: string) {
   
  }

  async submitPayment() {
   
  }
  
}
