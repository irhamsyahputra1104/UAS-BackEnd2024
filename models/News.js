// import database
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// membuat class News
class News {
  static async index() {
    try {
      return await prisma.news.findMany();
    } catch (error) {
      console.error("Error fetching news:", error);
      return { error: "Failed to fetch news" };
    }
  }

  static async store(data) {
    try {
      // Validasi input
      if (!data.title || !data.description || !data.content || !data.category) {
        return { error: "Title, description, content, and category are required." };
      }

      return await prisma.news.create({
        data: {
          title: data.title,
          description: data.description,
          content: data.content,
          published: data.published ?? true,
          image: data.image || null,
          url: data.url || null,
          publishedAt: new Date().toISOString(),
          category: data.category,
        },
      });
    } catch (error) {
      console.error("Error creating news:", error);
      return { error: "Failed to create news" };
    }
  }

  static async update(id, data) {
    try {
      return await prisma.news.update({
        where: { id: parseInt(id) },
        data: {
          title: data.title,
          description: data.description,
          content: data.content,
          published: data.published ?? true,
          image: data.image || null,
          url: data.url || null,
          category: data.category,
          publishedAt: new Date().toISOString(), // Update timestamp
        },
      });
    } catch (error) {
      console.error("Error updating news:", error);
      return { error: "Failed to update news" };
    }
  }

  static async delete(id) { // Sebelumnya `destroy()`, harusnya `delete()`
    try {
      return await prisma.news.delete({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      console.error("Error deleting news:", error);
      return { error: "Failed to delete news" };
    }
  }

  static async show(id) {
    try {
      return await prisma.news.findUnique({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      console.error("Error fetching news detail:", error);
      return { error: "Failed to fetch news detail" };
    }
  }

  static async search(query) {
    try {
      return await prisma.news.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } }, // Case-insensitive search
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
      });
    } catch (error) {
      console.error("Error searching news:", error);
      return { error: "Failed to search news" };
    }
  }

  static async category(category) {
    try {
      return await prisma.news.findMany({
        where: { category },
      });
    } catch (error) {
      console.error("Error fetching category:", error);
      return { error: "Failed to fetch category" };
    }
  }
}

// export class News
export default News;
