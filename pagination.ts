import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Pagination simple : sauter 2, prendre 3
  const paginatedPosts = await prisma.post.findMany({
    skip: 2,
    take: 3,
    orderBy: {
      id: "asc"
    }
  });

  console.log(" Posts paginés (ID croissant, 2 ignorés, 3 récupérés) :");
  console.log(paginatedPosts);

  // Derniers posts : tri par createdAt décroissant
  const recentPosts = await prisma.post.findMany({
    skip: 0,
    take: 5,
    orderBy: {
      createdAt: "desc"
    }
  });

  console.log(" Posts récents (les 5 plus récents) :");
  console.log(recentPosts);
}

main()
  .catch(e => {
    console.error("Erreur rencontrée :", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
