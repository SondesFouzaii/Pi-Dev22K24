// pdf-export.service.ts
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { User } from '../models/user';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {

  constructor() { }

  generatePdfForTeam(team: any) {
    const doc = new jsPDF();

    // Initialiser startY pour la première utilisation d'autoTable
    let startY = 20;

    doc.text(`Équipe: ${team.name}`, 14, 10);

    // Section des utilisateurs
    const userColumns = ["Nom", "Email", "Numéro de Téléphone", "Rôle", "Genre"];
    const userRows = team.users.map((user: User) => [
      `${user.first_name} ${user.last_name}`,
      user.email,
      user.phone_number,
      user.role,
      user.gender,
    ]);

    autoTable(doc, {
      head: [userColumns],
      body: userRows,
      startY: startY,
      didDrawPage: (data) => {
        if (data.cursor) { // Vérifiez que data.cursor n'est pas null
          startY = data.cursor.y; // Mise à jour de startY pour la prochaine table
        }
      }
    });

    // Mise à jour de startY après la table des utilisateurs, plus un espace
    startY += 10;

    // Section des projets
    const projectColumns = ["Nom du Projet", "Date de Création", "Date Limite"];
    const projectRows = team.projects.map((project: Project) => [
      project.name,
      project.creationdate,
      project.deadline,
    ]);

    autoTable(doc, {
      head: [projectColumns],
      body: projectRows,
      startY: startY, // Utiliser startY mis à jour
      didDrawPage: (data) => {
        if (data.cursor) { // Vérifiez que data.cursor n'est pas null
          startY = data.cursor.y; // Mise à jour de startY pour la prochaine table
        }
      }
    });

    doc.save(`${team.name}-liste.pdf`);
  }
}
