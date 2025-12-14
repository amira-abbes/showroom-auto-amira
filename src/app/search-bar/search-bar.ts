import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auto } from '../auto';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css']
})
export class SearchBarComponent {
  @Input() autos: Auto[] = [];
  @Output() selectAutoEvent = new EventEmitter<Auto>();

  marqueRecherche: string = '';
  filteredAutos: Auto[] = [];
  searched: boolean = false;

  // Recherche intelligente en temps réel
  searchAutoList(): void {
    this.searched = true;
    if (this.marqueRecherche.trim() === '') {
      this.filteredAutos = [];
      return;
    }

    const searchTerm = this.marqueRecherche.toLowerCase().trim();
    
    // Recherche par préfixe (commence par...)
    this.filteredAutos = this.autos.filter(auto =>
      auto.marque.toLowerCase().startsWith(searchTerm) ||
      auto.modele.toLowerCase().startsWith(searchTerm)
    );
  }

  // Recherche automatique pendant la frappe
  onSearchInput(): void {
    if (this.marqueRecherche.trim().length > 0) {
      this.searchAutoList();
    } else {
      this.filteredAutos = [];
      this.searched = false;
    }
  }

  selectedAuto(auto: Auto): void {
    this.selectAutoEvent.emit(auto);
    // Scroll smooth vers les détails
    setTimeout(() => {
      const detailsElement = document.querySelector('.details-container');
      if (detailsElement) {
        detailsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  clearSearch(): void {
    this.marqueRecherche = '';
    this.filteredAutos = [];
    this.searched = false;
  }
}