package com.example.backend.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonalityRepository extends JpaRepository<Personality, Long> {

    Optional<Personality> findByPersonalityName(String personalityName);
}
