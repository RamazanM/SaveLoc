package com.ramazanm.saveloc.controller.unitTest

import com.ramazanm.saveloc.controller.AuthController
import com.ramazanm.saveloc.data.model.User
import com.ramazanm.saveloc.data.repository.UserRepository
import com.ramazanm.saveloc.security.AuthService
import com.ramazanm.saveloc.security.JWTService
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.any
import org.mockito.ArgumentMatchers.anyString
import org.mockito.Mockito
import org.mockito.stubbing.OngoingStubbing
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.lang.Exception

inline fun <reified T> mock(): T = Mockito.mock(T::class.java)

// To avoid having to use backticks for "when"
fun <T> whenever(methodCall: T): OngoingStubbing<T> = Mockito.`when`(methodCall)

class AuthControllerTest {
    val mockUserRepository: UserRepository = mock()
    val mockJwtService: JWTService = mock()
    val controller = AuthController(AuthService(mockJwtService, mockUserRepository))
    val userList = arrayListOf<User>()

    @BeforeEach
    fun prepareMock() {
        userList.clear()
        whenever(mockUserRepository.save(any(User::class.java))).thenAnswer {
            userList.add(it.getArgument(0))
            return@thenAnswer User("1", "", "", "", "", listOf())
        }
        whenever(mockUserRepository.findByEmail(anyString())).thenAnswer {
            return@thenAnswer userList.filter { f ->
                f.email == it.getArgument<User>(
                    0
                ).email
            }
        }
    }

    @Test
    fun `should save the user and return OK response when register called with a valid user`() {
        val response = controller.register(
            RegisterRequest(
                name = "Test1Name", surname = "Test1Surname", email = "Test1Email", password = "Test1Password"
            )
        )
        assert(userList.isNotEmpty())
        assertEquals("OK", response)
    }

    //TODO: Choose a proper error for existing user
    @Test
    fun `should throw an error when register called with an existing email`() {
        val firstRegisterReq = RegisterRequest(
            name = "Test1Name", surname = "Test1Surname", email = "Test1Email", password = "Test1Password"
        )

        val secondRegisterReq = RegisterRequest(
            name = "Test2Name", surname = "Test2Surname", email = "Test1Email", password = "Test2Password"
        )

        controller.register(firstRegisterReq)
        assertThrows(Exception::class.java) { controller.register(secondRegisterReq) }
    }

    @Test
    fun `should store hashed password when register called`() {
        controller.register(
            RegisterRequest(
                name = "Test1Name", surname = "Test1Surname", email = "Test1Email", password = "Test1Password"
            )
        )
        val savedUser = userList[0]
        assertTrue { BCryptPasswordEncoder().matches("Test1Password", savedUser.password) }
    }

    //TODO: Move these tests to correct test layer
    fun `should throw an exception when email can not be validated`() {}
    fun `should throw an exception when password can not be validated`() {}

}