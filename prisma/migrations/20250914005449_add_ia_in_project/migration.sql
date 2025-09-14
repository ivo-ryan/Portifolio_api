-- CreateEnum
CREATE TYPE "public"."Roles" AS ENUM ('user', 'assistant');

-- CreateTable
CREATE TABLE "public"."Techs" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "imgUrl" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Techs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "imgUrl" VARCHAR(255) NOT NULL,
    "vercelUrl" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "gitUrl" VARCHAR(255) NOT NULL,
    "technologies" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChatMessage" (
    "id" SERIAL NOT NULL,
    "role" "public"."Roles" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);
