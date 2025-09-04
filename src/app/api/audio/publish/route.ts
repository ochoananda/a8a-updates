import { prisma } from "@/lib/prisma"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3 = new S3Client({ region: process.env.AWS_REGION })

export async function POST(req: Request) {
  const { title, key } = await req.json()
  if (!title || !key) return new Response("Missing", { status: 400 })

  const publicUrl = await getSignedUrl(
    s3,
    new GetObjectCommand({ Bucket: process.env.S3_BUCKET!, Key: key }),
    { expiresIn: 7 * 24 * 3600 }
  )

  const audio = await prisma.audio.create({
    data: { title, s3Key: key, publicUrl, published: true }
  })

  return Response.json({ audio })
}
