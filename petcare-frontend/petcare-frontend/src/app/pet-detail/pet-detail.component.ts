import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from '../models/pet.model';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-detail',
  standalone: false,
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {
  pet: Pet | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.petService.getPetById(id).subscribe({
        next: (data) => this.pet = data,
        error: (err) => console.error('Error loading pet details', err)
      });
    }
  }

  onDelete(): void {
    if (this.pet && this.pet.id) {
      const petId = this.pet.id;
      if (confirm('Are you sure you want to delete this pet?')) {
        this.petService.deletePet(petId).subscribe(() => {
          alert('Pet deleted successfully!');
          // After deletion, you can redirect or perform any other action
        });
      }
    } else {
      alert('Pet ID is missing!');
    }
  }

  editPet(): void {
    if (this.pet) {
      this.router.navigate(['/edit', this.pet.id]);
    }
  }

  // Method to handle updating the next vet visit date
  updateNextVetVisitDate(): void {
    if (this.pet && this.pet.nextVetVisitDate) {
      // Your logic to update the next vet visit date
      alert('Next vet visit date will be updated!');
    } else {
      alert('Next vet visit date is not set!');
    }
  }
}
