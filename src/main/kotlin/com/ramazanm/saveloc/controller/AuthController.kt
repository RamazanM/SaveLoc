package com.ramazanm.saveloc.controller

import com.ramazanm.saveloc.data.dto.LoginRequest
import com.ramazanm.saveloc.data.dto.RegisterRequest
import com.ramazanm.saveloc.data.dto.TokenPairResponse
import com.ramazanm.saveloc.data.model.User
import com.ramazanm.saveloc.data.repository.UserRepository
import com.ramazanm.saveloc.security.AuthService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController




@RestController
@RequestMapping("/auth")
class AuthController constructor(val authService: AuthService) {
    @PostMapping("/register")
    fun register(@RequestBody req: RegisterRequest): String {
        authService.register(req)
        return "OK"
    }
    @PostMapping("/login")
    fun login(@RequestBody req: LoginRequest): TokenPairResponse {
        return authService.login(req.email,req.password)

    }
}