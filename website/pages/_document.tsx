import Document, { Head, Html, Main, NextScript } from 'next/document';
import { OrganizationJsonLd } from 'next-seo';
import { getCssText } from '../stitches.config';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-CN">
        <Head>
          <OrganizationJsonLd
            url="https://jiujuaner.com"
            logo="https://jiujuaner.com/static/logo-bot-group.svg"
            name="华飞数智互联网科技"
          />
          <style dangerouslySetInnerHTML={{ __html: getCssText() }} />
          <meta charSet="utf-8" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS Feed for jiujuaner.com"
            href="/feed.xml"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
