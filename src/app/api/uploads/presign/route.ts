import { NextRequest } from "next/server"
import crypto from "node:crypto"
import { S3Client } from "@aws-sdk/client-s3"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post"

const s3 = new S3Client({ region: process.env.AWS_REGION })

export async function POST(req: NextRequest) {
  const { filename, mime } = await req.json()
  if (!mime?.startsWith("audio/")) {
    return new Response("Only audio uploads", { status: 400 })
  }

  const key = `audio/${Date.now()}-${crypto.randomUUID()}-${filename}`

  const { url, fields } = await createPresignedPost(s3, {
    Bucket: process.env.S3_BUCKET!,
    Key: key,
    Conditions: [["content-length-range", 0, 100_000_000]], // up to ~100MB
    Fields: { "Content-Type": mime },
    Expires: 600 // 10 minutes
  })

  return Response.json({ url, fields, key })
}
