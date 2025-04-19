package com.example.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {
}
