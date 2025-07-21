import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";

// Initialisation de Prisma avec logs activés
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"]
});

// Schéma de validation Zod
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

//  Fonction avec transaction : crée un user + deux posts
async function registerWithPosts(data: { email: string; password: string }) {
  const parsed = userSchema.safeParse(data);

  if (!parsed.success) {
    console.error(" Erreur de validation :", parsed.error.format());
    return;
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

  const result = await prisma.$transaction(async (tx) => {
    // Créer l'utilisateur
    const user = await tx.user.create({
      data: {
        email: parsed.data.email,
        password: hashedPassword
      }
    });

    // Créer le premier post
    const post1 = await tx.post.create({
      data: {
        title: "Premier post",
        authorId: user.id
      }
    });

    // Créer le deuxième post
    const post2 = await tx.post.create({
      data: {
        title: "Deuxième post",
        authorId: user.id
      }
    });

    return { user, posts: [post1, post2] };
  });

  console.log(" Transaction complète :", result);
}

//  Appel de la fonction avec transaction
(async () => {
  await registerWithPosts({
    email: "pas_un_email",
    password: "123"
  });

  await prisma.$disconnect();
})();


