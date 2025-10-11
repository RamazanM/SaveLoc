package com.ramazanm.saveloc.data.repository

import com.ramazanm.saveloc.data.model.Place
import org.springframework.data.mongodb.repository.MongoRepository

interface PlaceRepository: MongoRepository<Place, String> {
    fun findByCreatedBy(createdBy: String):List<Place>
}