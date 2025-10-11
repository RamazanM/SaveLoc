package com.ramazanm.saveloc.data.model

import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.Id
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document("places")
data class Place(
    @Id val id: String?,
    val name:String,
    val description: String,
    val lat: Long,
    val long: Long,
    val createdBy: String,
    @CreatedDate val createdDate: LocalDateTime?,
    @LastModifiedDate val modifiedDate: LocalDateTime?
)
