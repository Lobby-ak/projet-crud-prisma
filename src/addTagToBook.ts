import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const tag = await prisma.tag.create({
    data: { name: "Philosophie" }
  });

  const updatedBook = await prisma.book.update({
    where: { title: "Le Mythe de Sisyphe" },
    data: {
      tags: {
        connect: { id: tag.id }
      }
    },
    include: { tags: true }
  });

  console.log("Livre mis à jour avec tag :", updatedBook);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
