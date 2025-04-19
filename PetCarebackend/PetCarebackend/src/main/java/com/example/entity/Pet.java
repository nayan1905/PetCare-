package com.example.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String species;
    private int age;
    private LocalDate vaccinationDate;
    
    @Column(name = "next_vet_visit")
    private LocalDate nextVetVisitDate;
    
    @Column(length = 1000)
    @NotEmpty(message = "Common medical problems must be provided")
    private String commonMedicalProblems;

    @Column(length = 1000)
    @NotEmpty(message = "Care instructions must be provided")
    private String careInstructions;
    
    
	public String getCommonMedicalProblems() {
		return commonMedicalProblems;
	}
	public void setCommonMedicalProblems(String commonMedicalProblems) {
		this.commonMedicalProblems = commonMedicalProblems;
	}
	public String getCareInstructions() {
		return careInstructions;
	}
	public void setCareInstructions(String careInstructions) {
		this.careInstructions = careInstructions;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSpecies() {
		return species;
	}
	public void setSpecies(String species) {
		this.species = species;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public LocalDate getVaccinationDate() {
		return vaccinationDate;
	}
	public void setVaccinationDate(LocalDate vaccinationDate) {
		this.vaccinationDate = vaccinationDate;
	}
	public LocalDate getNextVetVisitDate() {
		return nextVetVisitDate;
	}
	public void setNextVetVisitDate(LocalDate nextVetVisitDate) {
		this.nextVetVisitDate = nextVetVisitDate;
	}
    
    
}
