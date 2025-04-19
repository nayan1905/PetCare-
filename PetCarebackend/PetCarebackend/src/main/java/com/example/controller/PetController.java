package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.entity.Pet;
import com.example.repo.PetRepository;
import com.example.service.PetService;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200") // Angular default port
@RestController
@RequestMapping("/api/pets")
public class PetController {

    @Autowired
    private PetService petService;
    private PetRepository petRepository;

    @PostMapping
    public Pet createPet(@RequestBody Pet pet) {
        return petService.createPet(pet);
    }
    @GetMapping
    public List<Pet> getAllPets() {
        return petService.getAllPets();
    }

    @GetMapping("/{id}")
    public Pet getPetById(@PathVariable Long id) {
        return petService.getPetById(id);  // Pass Long directly
    }
    
    @GetMapping("/upcoming-visits")
    public List<Pet> getPetsWithUpcomingVisits() {
        LocalDate today = LocalDate.now();
        LocalDate in7Days = today.plusDays(7);
        return petRepository.findAll().stream()
                .filter(pet -> pet.getNextVetVisitDate() != null
                        && !pet.getNextVetVisitDate().isBefore(today)
                        && !pet.getNextVetVisitDate().isAfter(in7Days))
                .collect(Collectors.toList());
    }


    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @RequestBody Pet petDetails) {
        Pet updatedPet = petService.updatePet(id, petDetails);
        return ResponseEntity.ok(updatedPet);
    }


    @DeleteMapping("/{id}")
    public void deletePet(@PathVariable Long id) {
        petService.deletePet(id);
    }
}
