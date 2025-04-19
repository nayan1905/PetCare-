package com.example.service;

import java.util.List;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.entity.Pet;
import com.example.repo.PetRepository;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    // Method to create a new pet
    public Pet createPet(Pet pet) {
        return petRepository.save(pet);
    }

    // Method to update an existing pet
    public Pet updatePet(Long id, Pet petDetails) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found"));

        pet.setName(petDetails.getName());
        pet.setSpecies(petDetails.getSpecies());
        pet.setAge(petDetails.getAge());
        pet.setVaccinationDate(petDetails.getVaccinationDate());
        pet.setCommonMedicalProblems(petDetails.getCommonMedicalProblems());
        pet.setCareInstructions(petDetails.getCareInstructions());

        // Update next vet visit date
        pet.setNextVetVisitDate(petDetails.getNextVetVisitDate());

        return petRepository.save(pet);  // Save and return the updated pet
    }

    // Method to get all pets
    public List<Pet> getAllPets() {
        return petRepository.findAll();  // Assuming you're using a repository to fetch pets from the DB
    }

    // Method to get a pet by ID
    public Pet getPetById(Long id) {
        return petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found"));
    }

    // Method to delete a pet by ID
    public void deletePet(Long id) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found"));

        petRepository.delete(pet);
    }
}
