-- CreateEnum
CREATE TYPE "public"."Tier" AS ENUM ('free', 'standard', 'premium');

-- AlterTable
ALTER TABLE "public"."Client" ADD COLUMN     "tier" "public"."Tier" NOT NULL DEFAULT 'free';
