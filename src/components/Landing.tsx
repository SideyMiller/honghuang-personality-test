
import { type FC } from 'react';

interface LandingProps {
  onStart: () => void;
}

const Landing: FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-dvh px-6 overflow-hidden">
      {/* 水墨云雾背景动效 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ink-cloud ink-cloud-1" />
        <div className="ink-cloud ink-cloud-2" />
        <div className="ink-cloud ink-cloud-3" />
      </div>

      {/* 主内容 */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* 装饰线 */}
        <div className="w-16 h-px bg-gold mb-6 opacity-60" />

        {/* 主标题 */}
        <h1 className="text-4xl font-bold text-ink tracking-[0.3em] mb-3">
          洪荒人格测试
        </h1>

        {/* 英文副标题 */}
        <p className="text-xs text-text-muted tracking-[0.2em] uppercase mb-8">
          Primordial Personality Test
        </p>

        {/* 中文副标题 */}
        <p className="text-lg text-ink-light mb-2">
          「汝乃何方神圣？」
        </p>
        <p className="text-sm text-text-muted leading-relaxed mb-12 max-w-[280px]">
          测测你是山海经里的哪只异兽<br />
          答 20 道天命之卦，揭晓你的洪荒真身
        </p>

        {/* 开启天命按钮 */}
        <button
          onClick={onStart}
          className="group relative px-10 py-4 bg-cinnabar text-paper-light text-lg tracking-[0.15em] rounded-sm
                     shadow-lg hover:bg-cinnabar-dark active:scale-95
                     transition-all duration-200 ease-out"
        >
          <span className="relative z-10">⚡ 开启天命 ⚡</span>
          {/* 按钮光晕 */}
          <div className="absolute inset-0 rounded-sm bg-cinnabar opacity-30 blur-xl group-hover:opacity-50 transition-opacity" />
        </button>

        {/* 底部装饰 */}
        <div className="mt-16 flex flex-col items-center">
          <div className="w-8 h-px bg-gold opacity-40 mb-3" />
          <p className="text-xs text-text-muted opacity-60">
            基于山海经 · 原作 Neil-Federer · MIT
          </p>
        </div>
      </div>

      {/* 内联样式: 水墨云雾动画 */}
      <style>{`
        .ink-cloud {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.08;
          background: radial-gradient(circle, #2C2C2C 0%, transparent 70%);
        }
        .ink-cloud-1 {
          width: 300px; height: 300px;
          top: -80px; left: -60px;
          animation: drift1 12s ease-in-out infinite alternate;
        }
        .ink-cloud-2 {
          width: 250px; height: 250px;
          bottom: -50px; right: -80px;
          animation: drift2 15s ease-in-out infinite alternate;
        }
        .ink-cloud-3 {
          width: 200px; height: 200px;
          top: 40%; left: 50%;
          transform: translateX(-50%);
          animation: drift3 10s ease-in-out infinite alternate;
        }
        @keyframes drift1 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.06; }
          100% { transform: translate(30px, 20px) scale(1.1); opacity: 0.1; }
        }
        @keyframes drift2 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.05; }
          100% { transform: translate(-20px, -30px) scale(1.15); opacity: 0.09; }
        }
        @keyframes drift3 {
          0% { transform: translateX(-50%) scale(0.8); opacity: 0.04; }
          100% { transform: translateX(-40%) scale(1.2); opacity: 0.08; }
        }
      `}</style>
    </div>
  );
};

export default Landing;
