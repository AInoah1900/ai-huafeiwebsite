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
  output: 'export',
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
});
