import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pet } from '../models/pet.model';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-list',
  standalone: false,
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  searchQuery: string = '';

  constructor(private petService: PetService, private router: Router) {}

  ngOnInit(): void {
    this.getAllPets();
  }

  getAllPets(): void {
    this.petService.getPets().subscribe({
      next: (data) => {
        this.pets = data;
        this.filteredPets = data; // initialize filtered list
      },
      error: (err) => console.error('Error fetching pets', err)
    });
  }

  viewInfo(id: string): void {
    this.router.navigate(['/pet-detail', id]);
  }

  editPet(id: string): void {
    this.router.navigate(['/edit', id]);
  }

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this pet?')) {
      this.petService.deletePet(id).subscribe(() => {
        this.pets = this.pets.filter(pet => pet.id !== id);
        this.filteredPets = this.filteredPets.filter(pet => pet.id !== id);
      });
    }
  }

  onSearchChange(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredPets = this.pets.filter(
      pet =>
        pet.name.toLowerCase().includes(query) ||
        pet.species.toLowerCase().includes(query)
    );
  }

  // Helper method to check if the pet has an appointment within the next 7 days
  isUpcomingVisit(nextVetVisitDate: string): boolean {
    const today = new Date();
    const visitDate = new Date(nextVetVisitDate);
    const diffTime = visitDate.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays > 0 && diffDays <= 7;
  }
}
