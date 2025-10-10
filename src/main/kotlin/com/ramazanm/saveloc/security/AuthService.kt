package com.ramazanm.saveloc.security

import com.ramazanm.saveloc.data.dto.RegisterRequest
import com.ramazanm.saveloc.data.dto.TokenPairResponse
import com.ramazanm.saveloc.data.model.User
import com.ramazanm.saveloc.data.repository.UserRepository
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val jwtService: JWTService,
    private val userRepository: UserRepository,
) {
    val passEncoder = BCryptPasswordEncoder(16)

    fun register(req: RegisterRequest) {
        if (userRepository.findByEmail(req.email) != null) throw Exception("User already exist")
        userRepository.save(
            User(
                id = null,
                name = req.name,
                surname = req.surname,
                email = req.email,
                password = passEncoder.encode(req.password),
                places = null
            )
        )
    }

    fun login(email: String, password: String): TokenPairResponse {
        val user = userRepository.findByEmail(email) ?: throw BadCredentialsException("Invalid credentials.")
        if (!passEncoder.matches(password, user.password)) throw BadCredentialsException("Invalid credentials.")
        if(user.id==null) throw BadCredentialsException("Invalid credentials.")
        return TokenPairResponse(
            jwtService.generateAccessToken(user.id),
            jwtService.generateRefreshToken(user.id)
        )
    }

    fun refreshToken(token: String): TokenPairResponse {
        if(!jwtService.validateRefreshToken(token)) throw IllegalArgumentException("Invalid refresh token")
        val userId = jwtService.getUserIdFromToken(token) ?: throw IllegalArgumentException("Invalid refresh token")
        return TokenPairResponse(
            jwtService.generateAccessToken(userId),
            jwtService.generateRefreshToken(userId)
        )
    }



}