import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadBarComponent } from './head-bar/head-bar';
import { SearchBarComponent } from './search-bar/search-bar';
import { Auto } from './auto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeadBarComponent, SearchBarComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  // simple SVG placeholder data-URI used for new cars without dedicated photos
  placeholderPhoto: string = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><rect width="100%" height="100%" fill="%233b82f6"/><text x="50%" y="50%" fill="white" font-size="36" font-family="Arial, Helvetica, sans-serif" text-anchor="middle" dominant-baseline="middle">Photo indisponible</text></svg>';

  autoList: Auto[] = [
    {
      marque: 'BMW',
      modele: 'BMW X5',
      prix: 150000,
      puissance: 340,
      photo: '/Photos/bmw-x5.avif',
      disponibilite: 5
    },
    {
      marque: 'BMW',
      modele: 'BMW Serie 3',
      prix: 95000,
      puissance: 255,
      photo: '/Photos/bmw-serie3.jpg',
      disponibilite: 8
    },
    {
      marque: 'BMW',
      modele: 'BMW M4',
      prix: 180000,
      puissance: 510,
      photo: '/Photos/bmw-m4.jpg',
      disponibilite: 3
    },
    {
      marque: 'Mercedes',
      modele: 'Mercedes Classe C',
      prix: 105000,
      puissance: 258,
      photo: '/Photos/mercedes-c.jpg',
      disponibilite: 6
    },
    {
      marque: 'Mercedes',
      modele: 'Mercedes GLE',
      prix: 165000,
      puissance: 367,
      photo: '/Photos/mercedes-gle.jpeg',
      disponibilite: 4
    },
    {
      marque: 'Audi',
      modele: 'Audi A4',
      prix: 98000,
      puissance: 249,
      photo: '/Photos/audi-a4.jpg',
      disponibilite: 7
    },
    {
      marque: 'Audi',
      modele: 'Audi Q7',
      prix: 155000,
      puissance: 335,
      photo: '/Photos/audi-q7.jpg',
      disponibilite: 5
    }
    ,
    {
      marque: 'Tesla',
      modele: 'Model S Plaid',
      prix: 230000,
      puissance: 1020,
      photo: '/Photos/tesla-model-s-plaid.webp',
      disponibilite: 2
    },
    {
      marque: 'Porsche',
      modele: '911 Carrera',
      prix: 350000,
      puissance: 385,
      photo: '/Photos/porsche-911-carrera.jpg',
      disponibilite: 1
    },
    {
      marque: 'Ford',
      modele: 'Mustang GT',
      prix: 145000,
      puissance: 450,
      photo: '/Photos/ford-mustang-gt.jpg',
      disponibilite: 4
    },
    {
      marque: 'Volkswagen',
      modele: 'Golf GTI',
      prix: 55000,
      puissance: 245,
      photo: '/Photos/vw-golf-gti.webp',
      disponibilite: 12
    },
    {
      marque: 'Renault',
      modele: 'Clio RS',
      prix: 35000,
      puissance: 200,
      photo: '/Photos/renault-clio-rs.webp',
      disponibilite: 9
    },
    {
      marque: 'Nissan',
      modele: 'GT-R',
      prix: 320000,
      puissance: 570,
      photo: '/Photos/nissan-gt-r.avif',
      disponibilite: 1
    },
    {
      marque: 'Lexus',
      modele: 'RX 450h',
      prix: 130000,
      puissance: 308,
      photo: '/Photos/lexus-rx-450h.avif',
      disponibilite: 6
    },
    {
      marque: 'Honda',
      modele: 'Civic Type R',
      prix: 62000,
      puissance: 320,
      photo: '/Photos/honda-civic-type-r.avif',
      disponibilite: 7
    }
  ];

  selectedAuto: Auto | null = null;

  // Return autos grouped by marque, sorted by marque and price
  get groupedAutos(): { marque: string; autos: Auto[] }[] {
    const map = new Map<string, Auto[]>();
    for (const a of this.autoList) {
      const key = a.marque || 'Autres';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(a);
    }

    const groups: { marque: string; autos: Auto[] }[] = [];
    Array.from(map.keys()).sort().forEach(m => {
      const list = map.get(m)!.slice().sort((x, y) => x.prix - y.prix);
      groups.push({ marque: m, autos: list });
    });
    return groups;
  }

  formatPrice(value: number): string {
    return value.toLocaleString() + ' DT';
  }

  updateAuto(auto: Auto): void {
    this.selectedAuto = auto;

    // smooth scroll to the details container once it's rendered
    setTimeout(() => {
      const detailsElement = document.querySelector('.details-container');
      if (detailsElement) {
        detailsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  closeDetails(): void {
    this.selectedAuto = null;
  }
}