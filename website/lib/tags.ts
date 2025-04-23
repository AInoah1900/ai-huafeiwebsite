export const definedTags: {
  [tag: string]: {
    title: string;
    description: string;
  };
} = {
  graphql: {
    title: 'GraphQL',
    description: 'Articles about GraphQL and its ecosystem.',
  },
  'graphql-federation': {
    title: 'GraphQL Federation',
    description: 'Articles about GraphQL federation, Apollo Federation, and more.',
  },
  'graphql-hive': {
    title: 'GraphQL Hive',
    description:
      'Articles about Hive - Open Source GraphQL Federation Platform (Registry, Gateway, and more)',
  },
  'graphql-mesh': {
    title: 'GraphQL Mesh',
    description: 'Articles about GraphQL Mesh - Query anything, run anywhere',
  },
  '工业4.0': {
    title: '工业4.0',
    description: '关于工业4.0和智能制造的文章',
  },
  '个性化学习': {
    title: '个性化学习',
    description: '关于个性化学习和教育创新的文章',
  },
  '智能制造': {
    title: '智能制造',
    description: '关于智能制造技术和应用的文章',
  },
  '城市治理': {
    title: '城市治理',
    description: '关于城市治理和智慧城市建设的文章',
  },
  'AI应用': {
    title: 'AI应用',
    description: '关于人工智能应用场景和实践的文章',
  },
  '智慧城市': {
    title: '智慧城市',
    description: '关于智慧城市建设与发展的文章',
  },
  '教育科技': {
    title: '教育科技',
    description: '关于教育科技创新与应用的文章',
  },
  '品牌营销': {
    title: '品牌营销',
    description: '关于品牌营销策略与实践的文章',
  },
  '大语言模型': {
    title: '大语言模型',
    description: '关于大语言模型技术与应用的文章',
  },
  '企业应用': {
    title: '企业应用',
    description: '关于企业应用解决方案的文章',
  },
  'AI转型': {
    title: 'AI转型',
    description: '关于企业AI转型的文章',
  },
  'AI数字人': {
    title: 'AI数字人',
    description: '关于AI数字人技术与应用的文章',
  },
  '虚拟代言人': {
    title: '虚拟代言人',
    description: '关于虚拟代言人和数字人技术的文章',
  },
  '人工智能治理': {
    title: '人工智能治理',
    description: '关于人工智能治理和伦理的文章',
  },
  '对话机器人': {
    title: '对话机器人',
    description: '关于对话机器人技术与应用的文章',
  },
  '客户服务': {
    title: '客户服务',
    description: '关于客户服务创新与提升的文章',
  },
  '数字化转型': {
    title: '数字化转型',
    description: '关于企业数字化转型策略与实践的文章',
  },
  '可持续发展': {
    title: '可持续发展',
    description: '关于可持续发展与绿色技术的文章',
  },
  'AI伦理': {
    title: 'AI伦理',
    description: '关于人工智能伦理与道德的文章',
  },
  '负责任AI': {
    title: '负责任AI',
    description: '关于负责任的人工智能开发与应用的文章',
  },
  '技术伦理': {
    title: '技术伦理',
    description: '关于技术伦理与社会责任的文章',
  },
  'AI零售': {
    title: 'AI零售',
    description: '关于人工智能在零售行业应用的文章',
  },
  '智慧门店': {
    title: '智慧门店',
    description: '关于智慧门店与未来零售的文章',
  },
  '零售科技': {
    title: '零售科技',
    description: '关于零售科技创新与应用的文章',
  },
  '消费升级': {
    title: '消费升级',
    description: '关于消费升级与新消费的文章',
  },
  'AI金融': {
    title: 'AI金融',
    description: '关于人工智能在金融行业应用的文章',
  },
  '智能风控': {
    title: '智能风控',
    description: '关于智能风控与金融安全的文章',
  },
  '金融科技': {
    title: '金融科技',
    description: '关于金融科技创新与应用的文章',
  },
  '普惠金融': {
    title: '普惠金融',
    description: '关于普惠金融与金融服务的文章',
  },
  'AI医疗': {
    title: 'AI医疗',
    description: '关于人工智能在医疗行业应用的文章',
  },
  '智慧医疗': {
    title: '智慧医疗',
    description: '关于智慧医疗与健康服务的文章',
  },
  '健康科技': {
    title: '健康科技',
    description: '关于健康科技创新与应用的文章',
  },
  '医疗创新': {
    title: '医疗创新',
    description: '关于医疗创新与健康服务的文章',
  },
  'AI教育': {
    title: 'AI教育',
    description: '关于人工智能在教育行业应用的文章',
  },
  '智慧校园': {
    title: '智慧校园',
    description: '关于智慧校园与未来教育的文章',
  },
  'LLM': {
    title: '大语言模型',
    description: '关于大语言模型技术与应用的文章',
  },
  'AI': {
    title: '人工智能',
    description: '关于人工智能技术与应用的文章',
  },
};

export function extractRelevantTags(
  articles: Array<{
    tags?: string[];
  }>,
) {
  const allTags = articles.flatMap(article => article.tags || []);
  const tagMap: {
    [tag: string]: {
      count: number;
      title: string;
    };
  } = {};

  for (const tag of allTags) {
    // eslint-disable-next-line logical-assignment-operators
    if (!tagMap[tag]) {
      tagMap[tag] = {
        count: 0,
        title: definedTags[tag]?.title ?? tag,
      };
    }
    tagMap[tag].count += 1;
  }

  const top10: Array<{
    tag: string;
    title: string;
    count: number;
  }> = Object.entries(tagMap)
    // Sort by count
    .sort((a, b) => b[1].count - a[1].count)
    // Take top 10
    .slice(0, 10)
    // Map to the final format
    .map(([tag, { title, count }]) => ({ tag, title, count }));

  // Ensure that the most important tags are always present
  const importantTags = ['codegen', 'graphql-hive', 'graphql-federation'];

  for (const tag of importantTags) {
    if (!top10.some(({ tag: t }) => t === tag)) {
      top10.unshift({
        tag,
        title: definedTags[tag]?.title ?? tag,
        count: 0,
      });
    }
  }

  // Return only top 10 as we could have more
  // than 10 because of the important tags
  return top10.slice(0, 10);
}

/**
 * 从单个博客文章的标签中提取标签字符串数组
 * @param tags 博客的标签列表或者标签字符串
 * @returns 标签字符串数组
 */
export function extractTagsFromBlog(tags: string[] | string | undefined): string[] {
  if (!tags) return [];
  return Array.isArray(tags) ? tags : [tags];
}
