import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const author = await prisma.author.findFirst({
    where: { name: "Victor Hugo" },
    include: {
      books: {
        include: {
          tags: true
        }
      }
    }
  });

  console.log("Auteur et ses livres avec tags :", JSON.stringify(author, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => prisma.$disconnect());
