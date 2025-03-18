import { productsItems } from '@theguild/components';

export default {
  index: {
    display: 'hidden',
    theme: {
      layout: 'raw',
    },
  },
  // products: {
  //   type: 'menu',
  //   title: '产品生态',
  //   items: productsItems,
  // },
  products: {
    type: 'page',
    title: '产品生态',
    theme: {
      layout: 'full',
      timestamp: false,
    },
  },
  service: {
    type: 'page',
    title: '服务案例',
    theme: {
      layout: 'full',
      timestamp: false,
    },
  },
  blog: {
    type: 'page',
    title: '新闻资讯',
    theme: {
      layout: 'full',
      timestamp: false,
    },
  },
  'about-us': {
    type: 'page',
    title: '关于我们',
    theme: {
      typesetting: 'article',
      timestamp: false,
    },
  },
  logos: {
    type: 'page',
    display: 'hidden',
    theme: {
      typesetting: 'article',
      timestamp: false,
    },
  },
  contact: {
    title: '关于我们',
    type: 'page',
    display: 'hidden',
    route: '/contact',
  },
  chatbot: {
    title: '关于我们',
    type: 'page',
    display: 'hidden',
    route: '/chatbot',
  },
  digitalhuman: {
    title: '关于我们',
    type: 'page',
    display: 'hidden',
    route: '/digitalhuman',
  },
  rules: {
    title: '服务条款',
    type: 'page',
    display: 'hidden',
    route: '/rules',
  },
  privacy: {
    title: '隐私政策',
    type: 'page',
    display: 'hidden',
    route: '/privacy',
  },
  404: {
    type: 'page',
    theme: {
      timestamp: false,
      typesetting: 'article',
    },
  },
};
