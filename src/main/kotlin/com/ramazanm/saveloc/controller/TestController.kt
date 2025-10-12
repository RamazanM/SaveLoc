package com.ramazanm.saveloc.controller

import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@SecurityRequirement(name = "Bearer Authentication")
@RestController
@RequestMapping("/test")
class TestController {
    @GetMapping("/hello")
    fun hello(): String {
        return "Hello, World"
    }
}
