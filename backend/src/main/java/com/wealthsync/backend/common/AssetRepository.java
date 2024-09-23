package com.wealthsync.backend.common;

import com.wealthsync.backend.model.Asset;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepository extends CrudRepository<Asset, Long> {

    // Find all assets belonging to a specific user
    List<Asset> findByUserId(Long userId);
}

