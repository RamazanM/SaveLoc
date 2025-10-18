package com.ramazanm.saveloc.controller

import com.ramazanm.saveloc.common.ResourceNotFoundException
import com.ramazanm.saveloc.common.UnauthorizedException
import com.ramazanm.saveloc.data.dto.PlaceDTO
import com.ramazanm.saveloc.data.model.Place
import com.ramazanm.saveloc.data.repository.PlaceRepository
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.data.repository.query.Param
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import kotlin.jvm.optionals.getOrNull


@SecurityRequirement(name = "Bearer Authentication")
@RestController
@RequestMapping("/places")
class PlacesController(val placesRepository: PlaceRepository) {
    @GetMapping()
    fun getAllPlacesOfUser(): List<Place> {
        val userId = SecurityContextHolder.getContext().authentication.principal.toString()
        return placesRepository.findByCreatedBy(userId)
    }

    @GetMapping("/{id}")
    fun getPlace(@PathVariable("id") id: String): Place {
        val place = placesRepository.findById(id).getOrNull() ?: throw ResourceNotFoundException()
        return place
    }

    @PostMapping
    fun addPlace(@RequestBody req: PlaceDTO): Place {
        val userId = SecurityContextHolder.getContext().authentication.principal.toString()
        return placesRepository.save(req.toPlaceEntity(userId))
    }

    @PutMapping("/{id}")
    fun editPlace(@Param("id") id: String, @RequestBody req: PlaceDTO): Place {
        val userId = SecurityContextHolder.getContext().authentication.principal.toString()
        val placeToEdit: Place = placesRepository.findById(id).getOrNull() ?: throw ResourceNotFoundException()
        if (placeToEdit.createdBy != userId) throw UnauthorizedException()

        placeToEdit.copy(
            name = req.name,
            description = req.description,
            lat = req.lat,
            long = req.long,
            photos = req.photos
        )
        return placesRepository.save(placeToEdit)
    }

    @DeleteMapping("/{id}")
    fun deletePlace(@Param("id") id: String) {
        val userId = SecurityContextHolder.getContext().authentication.principal.toString()
        val placeToDelete = placesRepository.findById(id).getOrNull() ?: throw ResourceNotFoundException()
        if (placeToDelete.createdBy != userId) throw UnauthorizedException()
        placesRepository.delete(placeToDelete)
    }
}