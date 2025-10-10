package com.ramazanm.saveloc

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.mongodb.config.EnableMongoAuditing

@EnableMongoAuditing
@SpringBootApplication
class SavelocApplication

fun main(args: Array<String>) {
	runApplication<SavelocApplication>(*args)
}
