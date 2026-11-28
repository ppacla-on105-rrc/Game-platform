-- CreateTable
CREATE TABLE "LibraryEntry" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Not Installed',

    CONSTRAINT "LibraryEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LibraryEntry_gameId_key" ON "LibraryEntry"("gameId");

-- AddForeignKey
ALTER TABLE "LibraryEntry" ADD CONSTRAINT "LibraryEntry_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
