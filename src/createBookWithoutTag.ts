import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const book = await prisma.book.create({
    data: {
      title: "Le Mythe de Sisyphe",
      author: { connect: { name: "Albert Camus" } }
    }
  });

  console.log("Livre sans tag créé :", book);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
