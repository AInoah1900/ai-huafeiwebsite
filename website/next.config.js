import { withGuildDocs } from '@theguild/components/next.config';

// 使用 withGuildDocs 函数来配置 Next.js 项目
export default withGuildDocs({
  eslint: {
    // 在构建过程中忽略 ESLint 错误
    ignoreDuringBuilds: true,
  },
  env: {
    // 设置环境变量，用于 <link rel="canonical" /> 标签
    SITE_URL: 'https://jiujuaner.com',
  },
  // 设置输出模式为静态导出
  // output: 'export', // Next.js 会将你的应用程序构建为静态 HTML 文件，并将它们放在 out 目录中。
  // 对于静态导出添加尾斜杠，这对于处理动态路由很重要
  trailingSlash: true,
  // 在静态导出期间优化
  images: {
    unoptimized: true, // 静态导出时不优化图片
  },
  experimental: {
    // 启用实验性功能以提高构建性能
    scrollRestoration: true,
  },
  // 跳过路由验证，避免中文路径问题
  skipValidation: true,
  skipMiddlewareUrlNormalize: true,
  // 配置 URL 重定向
  redirects: () =>
    Object.entries({
      '/contact': '/#get-in-touch', // 将 /contact 重定向到 /#get-in-touch
      '/solutions': '/#platform', // 将 /solutions 重定向到 /#platform
      '/connected-build': '/', // 将 /connected-build 重定向到 /
      '/services': '/#services', // 将 /services 重定向到 /#services
      '/blog/announcing-graphql-hive-public': '/blog/announcing-graphql-hive-release', // 重定向旧博客路径到新路径
      '/blog/announcing-graphql-yoga-2': '/blog/announcing-graphql-yoga-v2', // 重定向旧博客路径到新路径
      '/blog/graphql-eslint-3': '/blog/graphql-eslint-3.14', // 重定向旧博客路径到新路径
      '/blog/graphql-cli': '/blog/graphql-cli-is-back', // 重定向旧博客路径到新路径
      '/open-source': '/about-us', // 将 /open-source 重定向到 /about-us
    }).map(([from, to]) => ({
      source: from,
      destination: to,
      permanent: true, // 设置为永久重定向
    })),
  // 忽略构建错误
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // 禁用特定页面的静态导出（需要服务器端渲染或动态路由）
  // 这将在构建时跳过这些页面的预渲染
  exportPathMap: async function (defaultPathMap) {
    // 从defaultPathMap中删除动态标签页面
    const newPathMap = { ...defaultPathMap };
    // 删除所有带有[tag]的路径
    Object.keys(newPathMap).forEach(path => {
      if (path.includes('/blog/tag/')) {
        delete newPathMap[path];
      }
    });
    return newPathMap;
  },
});
