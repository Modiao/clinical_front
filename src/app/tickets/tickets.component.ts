import { Component, OnInit } from '@angular/core';
import { Utils } from '../shared/Utils/Utils.class';
import { TicketService } from './tickets.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.sass'],
  providers: [TicketService]
})
export class TicketsComponent implements OnInit {
  tickets = [];
  searchTicket = '';
  new_ticket = {
    type: "",
    nom_patient: "",
    penom_patient: "",
    is_valid: true
  };
  typesOfTickets: any = [
    { value: 'Consultation_pediatrique', text: 'CONSULTATION PEDIATRIQUE' },
    { value: 'Consultation_orl', text: 'CONSULTATION ORL' },
    { value: 'Consultation_sage_femme', text: 'CONSULTATION SAGE FEMME' },
    { value: 'Consultation_orphtalologie', text: 'CONSULTATION OPTHTALMO' },
    { value: 'Consultation_medecine_general', text: 'CONSULTATION MEDECINE GENERALE' },
    { value: 'Hospitalisation_categorie_2', text: 'HOSPITALISATION CATEGORIE 2' }
  ];
  currentTicket: any = null;
  ticketLoading = false;
  closeResult: string;

  constructor(private ticketService: TicketService, private modalService: NgbModal) { }

  ngOnInit(): void {
    moment.locale('fr');
    this.loadTickets();
  }
  getFormatedDate(date) {
    return moment(date).format('LLLL');
  }
  getTypeOfTicket(type) {
    let types = {
      'Consultation_pediatrique': 'CONSULTATION PEDIATRIQUE',
      'Consultation_orl': 'CONSULTATION ORL',
      'Consultation_sage_femme': 'CONSULTATION SAGE FEMME',
      'Consultation_orphtalologie': 'CONSULTATION OPTHTALMO',
      'Consultation_medecine_general': 'CONSULTATION MEDECINE GENERALE',
      'Hospitalisation_categorie_2': 'HOSPITALISATION CATEGORIE 2'
    };
    return types[type] ? types[type] : type;
  }
  getStatus(status) {
    return status ? 'VALIDE' : 'INVALIDE';
  }
  get slicedTickets() {
    if(this.searchTicket.length) {
      return this.tickets.filter(t => t.patient.toLowerCase().includes(this.searchTicket.toLowerCase()
        || t.id_ticket.toLowerCase().indexOf(this.searchTicket.toLowerCase()) != -1));
    } else {
      return this.tickets;
    }
  }
  addTicket(ticket) {
    let req = {
      type: ticket.type,
      nom_patient: ticket.nom_patient,
      penom_patient: ticket.penom_patient,
      is_valid: ticket.is_valid
    };
    this.ticketService.addTicket(req)
      .subscribe(createdTicket => {
        Utils.notify('success', 'Ticket créé avec succés !')
        this.tickets.unshift(createdTicket);
        this.new_ticket = {
          type: "",
          nom_patient: "",
          penom_patient: "",
          is_valid: true
        };
      }, err => {
        Utils.notify('error', 'Echec création de ticket');
      })
  }
  open(content, donnees) {
    this.currentTicket = donnees;
    // call susceptibles transactions
    this.modalService.open(content, { backdrop: false, keyboard: false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openAdd(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return `with: ${reason}`;
    }
  }
  loadTickets() {
    this.ticketLoading = true;
    this.ticketService.loadTickets()
      .subscribe(tickets => {
        this.tickets = tickets || [];
      },
      err => {
        Utils.notify('error', 'Echec récuperation des tickets');
      },
      () => this.ticketLoading = false)
  }
  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  exportToPDF(ticket) {
    const options = {
      margin: 5,
      name: `ticket-${ticket.id_ticket}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      jsPDF: { orientation: 'landscape' }
    };
    let el = document.querySelector("#detailTicketPDF");
    this.topFunction();
    html2pdf().from(el).set(options).save(`ticket-${ticket.id_ticket}.pdf`);
  }
}
