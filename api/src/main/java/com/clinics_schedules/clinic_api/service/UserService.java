package com.clinics_schedules.clinic_api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinics_schedules.clinic_api.dto.UserDto;
import com.clinics_schedules.clinic_api.entity.User;
import com.clinics_schedules.clinic_api.exception.ResourceNotFoundException;
import com.clinics_schedules.clinic_api.interfaces.BasicCRUDService;
import com.clinics_schedules.clinic_api.repository.UserRepository;

@Service
public class UserService implements BasicCRUDService<User, UserDto, Integer> {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleService roleService;

    @Override
    public User save(UserDto userDto) {
        var newUser = userRepository.save(
                new User(
                        null,
                        userDto.getUsername(),
                        userDto.getPassword(),
                        userDto.getEmail(),
                        null));

        var roles = roleService.addRolesToUser(newUser.getId(), userDto.getRoles());
        newUser.setRoles(roles);
        return newUser;
    }

    @Override
    public List<User> getAll() {

        return userRepository.findAll();
    }

    @Override
    public User updateById(Integer id, UserDto userDto) {
        User currentUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "user_id", id.toString()));

        currentUser.setUsername(userDto.getUsername());
        currentUser.setPassword(userDto.getPassword());
        roleService.removeAllRolesFromUser(id);
        roleService.addRolesToUser(id, userDto.getRoles());

        return userRepository.save(currentUser);
    }

    @Override
    public void deleteById(Integer id) {
        roleService.removeAllRolesFromUser(id);
        userRepository.deleteById(id);
    }

}
