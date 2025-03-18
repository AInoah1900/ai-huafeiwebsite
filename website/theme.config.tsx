// 主题配置
import { Video } from '@/components';
import { CodeSandbox } from '@/shared/embed/code-sandbox';
import { Gfycat } from '@/shared/embed/gfycat';
import { LinkPreview } from '@/shared/embed/link-preview';
import { OgCard } from '@/shared/embed/og-card';
import { StackBlitz } from '@/shared/embed/stack-blitz';
import { Tweet } from '@/shared/embed/tweet';
import { Callout, defineConfig, Steps, useConfig } from '@theguild/components';
// 导入 Image 组件（如果需要使用图片）
import Image from 'next/image';

// 确保 URL 是绝对路径
function ensureAbsolute(url: string): string {
  return url.startsWith('/') ? `https://jiujuaner.com${url}` : url;
}

// 网站描述和名称
const siteDescription = 'AI数字智能产业领导者，提供智能数据分析、决策支持系统和企业数字化转型解决方案。';
const siteName = '华飞数智互联网科技'; //'重庆华飞数智互联网科技有限责任公司';

// 导出默认配置
export default defineConfig({
  // 背景颜色配置
  backgroundColor: {
    dark: '15,17,20',
    light: '250,250,250',
  },
  docsRepositoryBase: 'https://github.com/AInoah1900/website-huafei',

  // 自定义 head 标签
  head: function useHead() {
    const { frontMatter, title: pageTitle, normalizePagesResult } = useConfig();

    // const title = `${pageTitle} (${siteName})`; //origin
    const title = `${siteName}`;
    const {
      description = `${siteName}: ${siteDescription}`,
      canonical = 'https://jiujuaner.com',
      image = '/static/logo-bot-group.svg',
      thumbnail = '/static/logo-bot-group.svg',
    } = frontMatter;

    // 获取当前页面路径
    const pagePath = normalizePagesResult.activePath[normalizePagesResult.activePath.length - 1];

    if (!pagePath) {
      throw new Error('No path found for a page.');
    }

    if (!pagePath.route) {
      throw new Error('No route found for page.');
    }

    return (
      <>
        {/* 设置页面标题 */}
        <title>{title}</title>
        {/* 设置Open Graph标题，用于社交媒体分享时显示 */}
        <meta property="og:title" content={title} />
        {/* 设置页面描述，用于搜索引擎优化(SEO) */}
        <meta name="description" content={description} />
        {/* 设置Open Graph描述，用于社交媒体分享时显示 */}
        <meta property="og:description" content={description} />
        {/* 设置规范链接，帮助搜索引擎识别原始内容，避免重复内容问题 */}
        <link rel="canonical" href={canonical ?? ensureAbsolute(pagePath.route)} />
        {/* 
          设置Open Graph图片，用于社交媒体分享时显示
          按优先级使用：1.缩略图 2.图片 3.默认生成的图片
          ensureAbsolute函数确保URL是绝对路径
        */}
        <meta
          name="og:image"
          content={ensureAbsolute(
            thumbnail ||
              image ||
              `https://jiujuaner.com/static/download_huafei.png`,
          )}
        />
        {/* 设置Open Graph网站名称，用于社交媒体分享时显示 */}
        <meta property="og:site_name" content={siteName} />
        
        {/* 设置网站favicon（浏览器标签页上显示的小图标） */}
        <link rel="icon" href="/static/logo-bot-group.svg" type="image/svg+xml" />
      </>
    );
  },
  // 组件配置
  components: {
    Callout,
    Video,
    CodeSandbox,
    LinkPreview,
    OgCard,
    Gfycat,
    Tweet,
    StackBlitz,
    Steps,
  },
  // 网站名称和描述
  websiteName: '华飞数智互联网科技',
  description: siteDescription,
  // 搜索配置
  search: {
    placeholder: '搜索…',
  },
});
