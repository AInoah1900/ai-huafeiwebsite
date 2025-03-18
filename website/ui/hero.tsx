import { MouseEvent, useCallback, useState } from 'react';
import NextImage from 'next/image';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { GuildButton } from '@/components';
// import hiveHero from '@/hive-hero.png';
import hiveHero from '../public/static/chatbot.png' // 可能的路径
// import meshHero from '@/mesh-hero.svg';
import meshHero from '../public/static/ai-digital-human.png' // 可能的路径
import { PRODUCTS } from '@theguild/components';

const MotionNextImage = motion(NextImage);

export function Hero() {
  const [isHive, setIsHive] = useState(true);

  const { primaryColor } = isHive ? PRODUCTS.HIVE : PRODUCTS.MESH;

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const isHive = e.currentTarget.dataset.name === 'hive';
    setIsHive(isHive);
  }, []);

  return (
    <div
      className="nextra-container pb-14 pt-20 lg:pb-36 lg:pt-28"
      // min-h-[calc(100vh-var(--nextra-navbar-height))] flex flex-col justify-center
    >
      <div className="mb-8 flex gap-10 text-sm font-medium max-lg:justify-center lg:mb-12 lg:text-lg">
        <button
          className={clsx(
            'flex items-center gap-2.5 border-b-2 pb-2.5 lg:pb-3.5',
            !isHive && 'border-gray-500 text-gray-500',
          )}
          style={isHive ? { borderColor: primaryColor } : undefined}
          data-name="hive"
          onClick={handleClick}
        >
          <PRODUCTS.HIVE.logo className={clsx('h-7 w-auto', !isHive && 'fill-current')} />
          AI 智能聊天机器人
        </button>
        <button
          className={clsx(
            'flex items-center gap-2.5 border-b-2 pb-3.5',
            isHive && 'border-gray-500 text-gray-500',
          )}
          style={isHive ? undefined : { borderColor: primaryColor }}
          onClick={handleClick}
        >
          <PRODUCTS.MESH.logo className={clsx('h-7 w-auto', isHive && 'fill-current')} />
          AI 虚拟数字人
        </button>
      </div>
      <div className="flex gap-24">
        <div
          className={clsx('max-lg:w-full max-lg:text-center', isHive ? 'lg:w-[45%]' : 'lg:w-1/3')}
        >
          <h2 className="mb-4 text-4xl/snug font-medium lg:text-[3.625rem]/tight">
            {isHive ? (
              <>
                ChatBot
                <br />
                多轮会话
                <br />
                多模态支持
              </>
            ) : (
              <>
                AI Digital Human
                <br />
                释放你的想象力
              </>
            )}
          </h2>
          <p className="mb-10 text-gray-500 lg:mb-12">
            {isHive
              ? '问答机器人是一种基于人工智能的交互式工具，适用于电商、企业官网、行政机构等场景，可提供自动回答用户问题，提供24小时实时客服支持，为客户提供便捷的自助服务。'
              : 'AI 数字人是一种基于人工智能的虚拟交互角色，适用于电商、教育、金融等领域，它可以模拟真人对话，进行智能客服、内容讲解、品牌代言等服务'}
          </p>
          <GuildButton
            href={isHive ? '/chatbot' : '/digitalhuman'}
            style={{ background: primaryColor }}
            title={
              isHive
                ? 'ChatBot - 智能聊天机器人'
                : 'Digital Human - AI 数字人'
            }
          >
            Explore {isHive ? 'ChatBot' : 'AI Digital Human'}
          </GuildButton>
        </div>
        <AnimatePresence mode="popLayout" initial={false}>
          <MotionNextImage
            key={isHive.toString()}
            className={clsx(
              'pointer-events-none h-full max-lg:hidden',
              isHive ? 'w-[55%]' : 'w-2/3',
            )}
            src={isHive ? hiveHero : meshHero}
            alt={isHive ? 'ChatBot' : 'AI Digital Human'}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
