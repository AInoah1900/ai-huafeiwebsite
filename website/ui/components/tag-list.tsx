import { ComponentProps, ReactElement } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Anchor } from '@theguild/components';

const Tag = ({
  children,
  isActive = false,
  href = '',
  ...props
}: Omit<ComponentProps<'a'>, 'ref'> & {
  isActive?: boolean;
}): ReactElement => {
  return (
    <Anchor
      href={href}
      className={clsx(
        'rounded-md bg-gray-200 hover:!no-underline dark:bg-[#24272E]',
        'flex px-2.5 py-1.5 text-sm font-medium transition-colors',
        href
          ? 'hover:text-black hover:dark:bg-[#15AFD04C] hover:dark:text-[#82E9FF]'
          : 'cursor-default',
        isActive ? 'dark:bg-[#15AFD04C] dark:text-[#82E9FF]' : 'text-gray-500 dark:text-[#7F818C]',
      )}
      {...props}
    >
      {children}
    </Anchor>
  );
};

export const TagList = ({
  tags,
  asLink = false,
  withCount = false,
  className,
  ...props
}: {
  tags:
    | Array<{
        tag: string;
        title: string;
        count: number;
      }>
    | string[];
  asLink?: boolean;
  withCount?: boolean;
  className?: string;
}): ReactElement => {
  const router = useRouter();
  const currentTag = router.query.tag;
  
  return (
    <div className={clsx('flex flex-wrap justify-center gap-2.5', className)} {...props}>
      {tags.map(tag => {
        const tagToDisplay = typeof tag === 'string' ? tag.replaceAll('-', ' ') : tag.title;
        const tagSlug = typeof tag === 'string' ? tag : tag.tag;
        const count = typeof tag === 'string' ? 0 : tag.count;
        const isActive = Array.isArray(currentTag) 
          ? currentTag.includes(tagSlug)
          : tagSlug === currentTag;

        // 创建带有标签查询参数的URL
        const tagUrl = asLink ? `/blog?tag=${encodeURIComponent(tagSlug)}` : '';

        return (
          <Tag
            key={tagToDisplay}
            href={tagUrl}
            title={`查看与${tagToDisplay}相关的文章`}
            isActive={isActive}
          >
            {withCount && count > 0 ? `${tagToDisplay} (${count})` : tagToDisplay}
          </Tag>
        );
      })}
    </div>
  );
};
