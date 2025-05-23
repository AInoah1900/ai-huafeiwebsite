import { format } from 'date-fns';
import { asArray } from './as-array';
import { sortByDateDesc } from './sort-by-date';
// eslint-disable-next-line import/no-useless-path-segments -- this will exist when we do `next build`
import { pageMap } from '.next/static/chunks/nextra-page-map-.mjs';

const blogFolder = pageMap.find(item => item.name === 'blog' && item.children).children;

export const allBlogs = blogFolder
  .filter(item => !item.data && item.route !== '/blog/tag')
  .map(blog => {
    if (blog.children) {
      blog = blog.children.find(item => item.name === 'index');
    }
    const { title, description, tags, authors, image, date, updateDate, thumbnail, canonical } =
      blog.frontMatter;
    const { route } = blog;

    if (title.length > 70) {
      throw new Error(
        `SEO issue: The title "${title}" is too long, should be less than 70 characters - route ${route}`,
      );
    }

    if (title.length < 10) {
      throw new Error(
        `SEO issue: The title "${title}" is too short, should be more than 10 characters - route ${route}`,
      );
    }

    if (description.length > 160) {
      throw new Error(
        `SEO issue: The description "${description}" is too long, should be less than 160 characters, not ${description.length}, route "${route}"`,
      );
    }

    if (description.length < 30) {
      throw new Error(
        `SEO issue: The description "${description}" is too short, should be more than 30 characters, not ${description.length}, route "${route}"`,
      );
    }

    return {
      title,
      description,
      tags,
      authors: asArray(authors),
      link: route,
      image,
      date: format(new Date(date), 'y-MM-dd'),
      thumbnail,
      canonical,
      updateDate: updateDate ? format(new Date(updateDate), 'y-MM-dd') : undefined,
    };
  })
  .sort(sortByDateDesc);

/**
 * 获取所有博客文章中的标签
 * @returns 所有标签的数组
 */
export function getAllTagsFromBlog() {
  // 收集所有标签
  const allTags = allBlogs.flatMap(blog => blog.tags || []);
  // 去重
  const uniqueTags = Array.from(new Set(allTags));
  return uniqueTags;
}
