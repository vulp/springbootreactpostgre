package com.react.demo.repository;

import com.react.demo.model.Chart;
import com.react.demo.model.Documentation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChartRepository extends JpaRepository<Chart, Long> {
}
