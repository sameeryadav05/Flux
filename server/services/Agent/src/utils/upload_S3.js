import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import dotenv from 'dotenv'
dotenv.config()
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../config/S3.js"

export const getURLFromS3 = async (filename,expiresIn=600)=>{
    return await getSignedUrl(
        s3,
        new GetObjectCommand(
            {
                Bucket:process.env.AWS_S3_BUCKET_NAME,
                Key:filename
            }),
        {expiresIn}
    )
}  

export const uploadTOS3 = async (filename,buffer,contentType)=>{
  
        await s3.send( new PutObjectCommand({
            Bucket:process.env.AWS_S3_BUCKET_NAME,
            Body:buffer,
            Key:filename,
            ContentType:contentType
        }))

        return filename;
}

