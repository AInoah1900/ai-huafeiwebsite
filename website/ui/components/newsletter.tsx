import { ReactElement } from 'react';
import clsx from 'clsx';
import { toast } from 'react-hot-toast';
import { GuildButton, Heading, Input, Link } from '@/components';

const classes = {
  link: clsx(
    'text-[#24272e] dark:text-white underline hocus:no-underline _decoration-from-font [text-underline-position:from-font]',
  ),
};

export const Newsletter = ({ className }: { className?: string }): ReactElement => {
  return (
    <div
      className={clsx(
        'mb-16 flex gap-14 rounded-[30px] bg-[#f1f1f1] p-7 max-xl:flex-col md:p-24 lg:mb-32 xl:gap-48 dark:bg-[#24272E]/50',
        className,
      )}
    >
      <div className="text-[#7f818c] dark:text-[#7f818c]">
        <Heading className="mb-4">订阅，获取最新资讯！</Heading>
        <p className="mb-4">
          想第一时间获取我们的最新动态吗？
          <br />
          立即订阅，随时掌握最新资讯！
        </p>
        <p>
         *订阅即表示您同意公司的{' '}
          <a className={classes.link} href="https://jiujuaner.com/rules">
            服务条款
          </a>{' '}
          and{' '}
          <a className={classes.link} href="https://jiujuaner.com/privacy">
            隐私政策
          </a>
          .
        </p>
      </div>
      <form
        onSubmit={async e => {
          e.preventDefault();

          const email = e.currentTarget.email.value;

          const response = await fetch('https://utils.jiujuaner.com/api/newsletter-subscribe', {
            body: JSON.stringify({ email }),
            method: 'POST',
          });

          const responseData: { status: 'success' | 'error'; message: string } =
            await response.json();

          toast[responseData.status](responseData.message);
        }}
        name="beehiiv-form"
        target="_blank"
        className="grow"
      >
        <Input
          className="mb-14"
          type="email"
          name="email"
          id="member_email"
          placeholder="请输入您的邮箱 *"
        />
        <div className="flex items-start items-center justify-between gap-10 max-md:flex-col">
          {/* @ts-expect-error -- fixme */}
          <GuildButton
            as="button"
            type="submit"
            className="bg-[#24272e] !text-[#fcfcfc] dark:bg-[#fcfcfc] dark:!text-[#0f1114]"
          >
            提交
          </GuildButton>
          <Link href="https://jiujuaner.com/" className={classes.link}>
            我们的最新资讯
          </Link>
        </div>
      </form>
    </div>
  );
};
