package com.ramazanm.saveloc.data.repository

import com.ramazanm.saveloc.data.model.FileEntity
import org.springframework.data.mongodb.repository.MongoRepository

interface FileRepository: MongoRepository<FileEntity, String> {
}