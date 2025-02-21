package com.example.backend.repository.ChildParent;


import com.example.backend.domain.Child;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ChildRepository extends JpaRepository<Child, Long> {
}
