-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "game" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);
