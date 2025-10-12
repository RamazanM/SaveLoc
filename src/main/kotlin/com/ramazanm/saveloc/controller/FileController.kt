package com.ramazanm.saveloc.controller

import com.ramazanm.saveloc.data.dto.UploadFileResponse
import com.ramazanm.saveloc.service.FileService
import com.ramazanm.saveloc.service.FileServiceInterface
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.data.repository.query.Param
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/file")
@SecurityRequirement(name = "Bearer Authentication")
class FileController(val fileService: FileServiceInterface) {
    @GetMapping("/{id}")
    fun getFile(@Param("id") id: String): ResponseEntity<Any> {
        return fileService.downloadFile(id)
    }

    @PostMapping(consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun uploadFile(@RequestPart("file") file: MultipartFile): UploadFileResponse {
        return fileService.uploadFile(file)
    }
}