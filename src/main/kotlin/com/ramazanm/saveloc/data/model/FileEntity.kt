package com.ramazanm.saveloc.data.model

import org.springframework.data.annotation.CreatedDate
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document("files")
data class FileEntity(
    val id:String?,
    val path: String,
    val createdBy: String,
    @CreatedDate val createdAt: LocalDateTime?
)
