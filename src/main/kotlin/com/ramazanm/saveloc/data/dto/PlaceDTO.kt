package com.ramazanm.saveloc.data.dto

import com.ramazanm.saveloc.data.model.Place

data class PlaceDTO(
    val name: String,
    val description: String,
    val lat: Float,
    val long: Float,
    val photos: List<String>
) {
    fun toPlaceEntity(userId: String) = Place(
        name = name,
        description = description,
        lat = lat,
        long = long,
        createdBy = userId,
        id = null,
        createdDate = null,
        modifiedDate = null,
        photos = photos
    )

}