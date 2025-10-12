package com.ramazanm.saveloc.service

import com.ramazanm.saveloc.data.dto.UploadFileResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.multipart.MultipartFile

interface FileServiceInterface {
    fun uploadFile(file: MultipartFile): UploadFileResponse
    fun downloadFile(fileId: String): ResponseEntity<Any>
}