import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../pet.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pet } from '../models/pet.model';

@Component({
  selector: 'app-pet-form',
  standalone: false,
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent implements OnInit {
  petForm!: FormGroup;
  petId: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.petId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.petId && this.petId !== 'new';

    this.petForm = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0)]],
      vaccinationDate: ['', Validators.required],
      commonMedicalProblems: [''],
      careInstructions: [''],
      nextVetVisitDate: ['']  
    });

    if (this.isEditMode && this.petId) {
      this.petService.getPetById(this.petId).subscribe({
        next: (data: Pet) => this.petForm.patchValue(data),
        error: (err) => console.error('Error loading pet data', err)
      });
    }
  }

  onSubmit(): void {
    if (this.petForm.invalid) return;

    const petData: Pet = this.petForm.value;

    if (this.isEditMode && this.petId) {
      this.petService.updatePet(this.petId, petData).subscribe(() => {
        this.router.navigate(['/pets']);
      });
    } else {
      this.petService.createPet(petData).subscribe(() => {
        this.router.navigate(['/pets']);
      });
    }
  }
}
