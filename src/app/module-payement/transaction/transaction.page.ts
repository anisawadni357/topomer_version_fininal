import { Component, OnInit } from '@angular/core';
import { PaimentsService } from 'src/app/services/paiments/paiments.service';
import { environment } from 'src/environments/environment';
//import { jsPDF } from 'jspdf';
//import html2canvas from 'html2canvas';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
  standalone:false
})
export class TransactionPage implements OnInit {
  userId:any=0;
  detail:any=[];
  isModalOpen = false;
  base_url_file=environment.BASE_URL_file
  constructor(private paimentService:PaimentsService) { }
  data:any=[];
  data2:any=[];
  user:any=[];
  ngOnInit() {
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    this.userId = users.id;
    this.user=users;
        this.getData();
  }
  getData()
  {
    this.paimentService.get(this.userId)
    .subscribe(
      data => {
        if (data.records) {
          this.data=data.records;
          console.log(this.data)
        }
      },
      error => {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
      }
    );
    this.paimentService.getuser(this.userId)
    .subscribe(
      data => {
        if (data.records) {
          this.data2=data.records;
        }
      },
      error => {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
      }
    );
  }

  closeModal() {
    this.isModalOpen = false;
  }
  openModal(key:any) {
    this.detail=key;
    this.isModalOpen = true;
  }
  exportToPDF() {
    /*const content = document.querySelector('ion-card'); // Sélectionne uniquement la carte des détails
    if (content) {
      html2canvas(content, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save('Transaction_Details.pdf');
      });
    }*/
  }
}
