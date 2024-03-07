// pdf-export.service.ts
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Utilisez cette importation si vous voulez inclure des tableaux.
import { Claim } from '../models/claim';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {

  constructor() { }

  exportClaimsToPdf(claims: Claim[]) {
    const doc = new jsPDF();
    
    const tableColumn = ["Title", "Content", "User's Email", "UserStory Name"];
    const tableRows: (string | number)[][] = [];

    claims.forEach(claim => {
      const claimData = [
        claim.title,
        claim.content,
        claim.user.email, // Utilisation de user.email
        claim.userstory.name // Utilisation de userstory.name
      ];
      tableRows.push(claimData);
    });

    // Titre du document PDF
    doc.setFontSize(20);
    doc.text("Liste des Réclamations", 14, 15);
    
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'striped',
      didDrawCell: (data) => {},
    });

    doc.save("liste_des_reclamations.pdf");
  }
}
