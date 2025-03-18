import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const blogDir = path.join(process.cwd(), 'pages/blog');

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().optional(),
  published: z.boolean().optional(),
  image: z.string().optional(),
  alt: z.string().optional(),
  authors: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export type Post = z.infer<typeof postSchema> & {
  slug: string;
  content: string;
};

export async function getPostBySlug(slug: string) {
  const filePath = path.join(blogDir, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const parsedData = postSchema.parse(data);

  return {
    ...parsedData,
    slug,
    content,
  };
}

export async function getAllPosts() {
  const files = fs.readdirSync(blogDir);
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(blogDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      const parsedData = postSchema.parse(data);
      const slug = file.replace(/\.mdx$/, '');

      return {
        ...parsedData,
        slug,
        url: `/blog/${slug}`,
        image: parsedData.image || null,
        alt: parsedData.alt || parsedData.title,
      };
    })
    .filter((post) => post.published !== false)
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

  return posts;
} 