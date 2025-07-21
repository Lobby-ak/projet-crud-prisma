import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tagScience = await prisma.tag.create({ data: { name: "Science" } });
  const tagRoman = await prisma.tag.create({ data: { name: "Roman" } });

  const author = await prisma.author.create({
    data: {
      name: "Victor Hugo",
      books: {
        create: [
          {
            title: "Les Misérables",
            tags: { connect: [{ id: tagScience.id }, { id: tagRoman.id }] },
          },
          {
            title: "Notre-Dame de Paris",
            tags: { connect: [{ id: tagRoman.id }] },
          },
        ],
      },
    },
    include: {
      books: { include: { tags: true } },
    },
  });

  console.log("Auteur créé :", JSON.stringify(author, null, 2));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
 
