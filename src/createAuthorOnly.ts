import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const author = await prisma.author.create({
    data: { name: "Albert Camus" }
  });

  console.log("Auteur sans livre créé :", author);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
