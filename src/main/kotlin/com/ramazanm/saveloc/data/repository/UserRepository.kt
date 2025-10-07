package com.ramazanm.saveloc.data.repository

import com.ramazanm.saveloc.data.model.User
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: MongoRepository<User, Int> {

}