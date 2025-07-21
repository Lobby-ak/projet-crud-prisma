import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const deleted = await prisma.tag.delete({
    where: { name: "Roman" }
  });

  console.log("Tag supprimé :", deleted);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
