package com.ramazanm.saveloc.service

import com.ramazanm.saveloc.common.ResourceNotFoundException
import com.ramazanm.saveloc.common.UnauthorizedException
import com.ramazanm.saveloc.data.dto.UploadFileResponse
import com.ramazanm.saveloc.data.model.FileEntity
import com.ramazanm.saveloc.data.repository.FileRepository
import jakarta.validation.UnexpectedTypeException
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.InputStreamResource
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream
import java.util.*
import kotlin.jvm.optionals.getOrNull

@Service
class FileService(val fileRepository: FileRepository, @Value("\${dir.upload}") private val uploadDirectory: String) :
    FileServiceInterface {

    @Throws(Exception::class)
    override fun uploadFile(file: MultipartFile): UploadFileResponse {
        val ext = file.originalFilename?.let {
            it.substring(it.lastIndexOf("."))
        } ?: throw UnexpectedTypeException()
        val hashedFileName = UUID.randomUUID().toString() + ext
        val filePath = uploadDirectory + File.separator + hashedFileName
        try {
            with(FileOutputStream(filePath)) {
                write(file.bytes)
                close()
            }
            val savedFileEntity = fileRepository.save(
                FileEntity(
                    id = null,
                    path = filePath,
                    createdBy = SecurityContextHolder.getContext().authentication.principal.toString(),
                    createdAt = null
                )
            )
            return UploadFileResponse(savedFileEntity.id ?: throw ResourceNotFoundException())
        } catch (e: Exception) {
            throw e
        }
    }

    override fun downloadFile(fileId: String): ResponseEntity<Any> {
        val fileEntity = fileRepository.findById(fileId).getOrNull() ?: throw ResourceNotFoundException()
        if (fileEntity.createdBy != SecurityContextHolder.getContext().authentication.principal) throw UnauthorizedException()
        val file = File(fileEntity.path)
        val fileStreamResource = InputStreamResource(FileInputStream(file))
        val headerValue =
            "attachment; filename=\"" + fileEntity.path.substring(fileEntity.path.lastIndexOf("\\")) + "\""
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM)
            .header(HttpHeaders.CONTENT_DISPOSITION, headerValue).body(fileStreamResource)
    }
}