import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Nettoyer la base pour éviter les doublons
  await prisma.post.deleteMany();   // D'abord les posts (car liés aux users)
  await prisma.user.deleteMany();   // Ensuite les users

  // Créer deux utilisateurs
  const user1 = await prisma.user.create({
    data: { email: "alice@example.com", name: "Alice" }
  });

  const user2 = await prisma.user.create({
    data: { email: "bob@example.com", name: "Bob" }
  });

  console.log(" Utilisateurs créés :", user1, user2);

  // Créer deux posts avec published
  const post1 = await prisma.post.create({
    data: {
      title: "Premier post",
      content: "Contenu du premier post",
      authorId: user1.id,
      published: true
    }
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Deuxième post",
      content: "Contenu du deuxième post",
      authorId: user2.id,
      published: false
    }
  });

  console.log(" Posts créés :", post1, post2);

  // Lire tous les posts d’Alice
  const postsAlice = await prisma.post.findMany({
    where: { authorId: user1.id }
  });

  console.log(" Posts d'Alice :", postsAlice);

  // Mettre à jour un post
  const updatedPost = await prisma.post.update({
    where: { id: post1.id },
    data: { title: "Titre mis à jour" }
  });

  console.log(" Post mis à jour :", updatedPost);

  // Supprimer un post
  const deletedPost = await prisma.post.delete({
    where: { id: post2.id }
  });

  console.log(" Post supprimé :", deletedPost);

  // Pagination simple
  const paginatedPosts = await prisma.post.findMany({
    skip: 0,
    take: 5,
    orderBy: {
      id: "asc"
    }
  });

  console.log(" Pagination (5 premiers posts) :", paginatedPosts);

  // Test d’erreur : doublon email
  try {
    await prisma.user.create({
      data: { email: "alice@example.com" } // déjà existant
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error(" Erreur d'unicité sur l'email :", e.message);
    } else {
      console.error(" Erreur inconnue :", e);
    }
  }

  // Récupérer uniquement les posts publiés
  const publishedPosts = await prisma.post.findMany({
    where: { published: true }
  });

  console.log(" Posts publiés :", publishedPosts);
}

main()
  .catch((e) => {
    console.error(" Erreur globale :", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
