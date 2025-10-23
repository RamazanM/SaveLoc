package com.ramazanm.saveloc.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.util.*


@Service
class JWTService(
    @Value("\${jwt.secret}") private val jwtSecret: String
) {
    companion object{
        const val accessTokenValidityMs = 15 * 60 * 1000L // 15 mins in milliseconds
    }

    enum class TokenType { ACCESS_TOKEN, REFRESH_TOKEN }


    private val secretKey = Keys.hmacShaKeyFor(Base64.getDecoder().decode(jwtSecret))
    private val refreshTokenValidityMs = 10 * 24 * 60 * 60 * 1000L // 10 days in milliseconds

    private fun generateToken(
        userId: String, type: TokenType, expiry: Long
    ): String {
        return Jwts.builder()
            .subject(userId)
            .claim("type", type.name)
            .issuedAt(Date())
            .expiration(Date(Date().time + expiry))
            .signWith(
                secretKey, Jwts.SIG.HS256
            ).compact()
    }

    private fun parseAllClaims(token: String): Claims? {
        return try {
            Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .payload
        } catch (_: Exception) {
            null
        }
    }

    fun generateAccessToken(userId: String) = generateToken(userId, TokenType.ACCESS_TOKEN, accessTokenValidityMs)
    fun generateRefreshToken(userId: String) = generateToken(userId, TokenType.REFRESH_TOKEN, refreshTokenValidityMs)

    fun validateAccessToken(token: String): Boolean {
        val rawToken = token.removePrefix("Bearer ")
        val claims = parseAllClaims(rawToken) ?: return false
        val tokenType = claims["type"] as? String ?: return false
        if(claims.expiration==null) return false
        if (claims.expiration.before(Date())) return false
        return tokenType == TokenType.ACCESS_TOKEN.name
    }

    fun validateRefreshToken(token: String): Boolean {
        val claims = parseAllClaims(token) ?: return false
        val tokenType = claims["type"] as? String ?: return false
        if(claims.expiration==null) return false
        if (claims.expiration.before(Date())) return false

        return tokenType == TokenType.REFRESH_TOKEN.name
    }

    fun getUserIdFromToken(token: String): String? {
        val rawToken = token.removePrefix("Bearer ")
        val claims = parseAllClaims(rawToken)
        return claims?.subject
    }

}
