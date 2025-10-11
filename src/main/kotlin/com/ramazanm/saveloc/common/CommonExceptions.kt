package com.ramazanm.saveloc.common

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus


@ResponseStatus(value = HttpStatus.NOT_FOUND)
class ResourceNotFoundException: RuntimeException()
@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
class UnauthorizedException: RuntimeException()
