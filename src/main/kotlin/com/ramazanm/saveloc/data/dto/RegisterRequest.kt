package com.ramazanm.saveloc.data.dto

data class RegisterRequest(
    val name: String,
    val surname: String,
    val email: String,
    val password: String,
)