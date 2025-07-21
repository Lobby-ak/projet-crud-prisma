import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const deleted = await prisma.author.delete({
    where: { id: 1 }  // Remplace 1 par l’ID réel de l’auteur
  });

  console.log("Auteur supprimé :", deleted);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
