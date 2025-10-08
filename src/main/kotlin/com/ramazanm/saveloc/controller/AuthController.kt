package com.ramazanm.saveloc.controller

import com.ramazanm.saveloc.data.model.User
import com.ramazanm.saveloc.data.repository.UserRepository
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

data class RegisterRequest(
    val name: String,
    val surname: String,
    val email: String,
    val password: String,
)


@RestController
@RequestMapping("/auth")
class AuthController constructor(val userRepository: UserRepository) {
    @PostMapping("/register")
    fun register(@RequestBody req: RegisterRequest): String {
        val emailRegexPattern = "^(.+)@(\\S+)$"
        val passwordRegexPatter = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"

        if(userRepository.findByEmail(req.email).isNotEmpty()) throw Exception("User already exist")
        if(Regex(emailRegexPattern).matches(req.email)) throw Exception("")
        val passEncoder= BCryptPasswordEncoder(16)
        userRepository.save(User(
            id = null,
            name = req.name,
            surname = req.surname,
            email = req.email,
            password = passEncoder.encode(req.password),
            places = null))
        return "OK"
    }
}