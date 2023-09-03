package com.clinics_schedules.clinic_api.interfaces;

import java.util.List;

public interface BasicCRUDService<Entity , EntityDTO , EntityID > {
    Entity save(EntityDTO entity);
    List<Entity> getAll();
    Entity updateById(EntityID id ,  EntityDTO entity);
    void deleteById(EntityID id);
    
}
