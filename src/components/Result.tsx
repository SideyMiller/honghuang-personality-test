
import { type FC } from 'react';
import { type ScoreResult } from '../utils/scoring';
import { type Personality } from '../data/personalities';

interface ResultProps {
  result: ScoreResult;
  personalityMap: Record<string, Personality>;
  onRestart: () => void;
  onViewAllTypes?: () => void;
  onBackToHome?: () => void;
}

const Result: FC<ResultProps> = ({ result, personalityMap, onRestart, onViewAllTypes, onBackToHome }) => {
  const p = result.personality;
  const bestMatchP = personalityMap[p.bestMatch];
  const worstMatchP = personalityMap[p.worstMatch];

  return (
    <div className="flex flex-col items-center min-h-dvh px-5 py-8">
      {/* 稀有度标签 */}
      <div
        className="px-4 py-1 rounded-full text-xs tracking-wider mb-6 border"
        style={{
          borderColor: p.color,
          color: p.color,
          backgroundColor: `${p.color}15`,
        }}
      >
        {p.rarity}
      </div>

      {/* 异兽 emoji */}
      <div className="text-7xl mb-4 result-emoji">{p.emoji}</div>

      {/* 异兽名称 */}
      <h2 className="text-3xl font-bold text-ink tracking-wider mb-2">
        {p.beast}
      </h2>

      {/* 毒舌称号 */}
      <p
        className="text-sm font-medium mb-2 tracking-wide"
        style={{ color: p.color }}
      >
        「{p.title}」
      </p>

      {/* 编码 + 维度 */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs text-text-muted font-mono">{p.code}</span>
        <span className="text-xs text-text-muted">·</span>
        <span className="text-xs text-text-muted">
          {result.dimensions.map((d) => d.poleName).join(' · ')}
        </span>
      </div>

      {/* 完整描述 */}
      <div className="w-full bg-paper-light border border-paper-dark rounded-lg p-5 mb-6">
        <p className="text-sm leading-relaxed text-ink-light">
          {p.fullDesc}
        </p>
      </div>

      {/* 优缺点 */}
      <div className="w-full grid grid-cols-1 gap-4 mb-6">
        {/* 优点 */}
        <div className="bg-paper-light border border-paper-dark rounded-lg p-4">
          <h3 className="text-sm font-bold text-cyan-dark mb-3">✅ 天赋神通</h3>
          <ul className="space-y-2">
            {p.strengths.map((s, i) => (
              <li key={i} className="text-xs text-ink-light leading-relaxed pl-4 relative">
                <span className="absolute left-0 text-cyan">·</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* 缺点 */}
        <div className="bg-paper-light border border-paper-dark rounded-lg p-4">
          <h3 className="text-sm font-bold text-cinnabar mb-3">❌ 劫数难逃</h3>
          <ul className="space-y-2">
            {p.weaknesses.map((w, i) => (
              <li key={i} className="text-xs text-ink-light leading-relaxed pl-4 relative">
                <span className="absolute left-0 text-cinnabar">·</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CP 匹配 */}
      <div className="w-full flex gap-3 mb-8">
        {bestMatchP && (
          <div className="flex-1 bg-paper-light border border-paper-dark rounded-lg p-3 text-center">
            <p className="text-xs text-text-muted mb-1">💕 天定良缘</p>
            <p className="text-lg mb-1">{bestMatchP.emoji}</p>
            <p className="text-xs font-bold text-ink">{bestMatchP.beast}</p>
          </div>
        )}
        {worstMatchP && (
          <div className="flex-1 bg-paper-light border border-paper-dark rounded-lg p-3 text-center">
            <p className="text-xs text-text-muted mb-1">💔 冤家路窄</p>
            <p className="text-lg mb-1">{worstMatchP.emoji}</p>
            <p className="text-xs font-bold text-ink">{worstMatchP.beast}</p>
          </div>
        )}
      </div>

      {/* 四维度得分 */}
      <div className="w-full bg-paper-light border border-paper-dark rounded-lg p-4 mb-8">
        <h3 className="text-sm font-bold text-ink mb-3 text-center">四维天命</h3>
        <div className="space-y-3">
          {result.dimensions.map((dim) => {
            const maxRaw = 10; // 5题 × 最高2分
            const normalizedPct = Math.min(Math.abs(dim.raw) / maxRaw, 1) * 100;
            return (
              <div key={dim.dimensionId}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text-muted">{dim.dimensionName}</span>
                  <span className="font-bold" style={{ color: p.color }}>
                    {dim.poleName}
                  </span>
                </div>
                <div className="w-full h-2 bg-paper-dark rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${Math.max(normalizedPct, 15)}%`,
                      backgroundColor: p.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="w-full flex flex-col gap-3 mb-6">
        <button
          onClick={onRestart}
          className="w-full py-3 bg-transparent border border-paper-dark text-text-muted text-sm
                     tracking-wider rounded-md hover:bg-paper-dark/50 active:scale-[0.98] transition-all"
        >
          🔄 再测一次
        </button>
        {onViewAllTypes && (
          <button
            onClick={onViewAllTypes}
            className="w-full py-3 bg-transparent border border-paper-dark text-text-muted text-sm
                       tracking-wider rounded-md hover:bg-paper-dark/50 active:scale-[0.98] transition-all"
          >
            📖 查看全部类型
          </button>
        )}
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="w-full py-3 bg-transparent border border-gold/40 text-text-muted text-sm
                       tracking-wider rounded-md hover:bg-gold/10 active:scale-[0.98] transition-all"
          >
            🏠 返回首页
          </button>
        )}
      </div>

      {/* 底部水印 */}
      <p className="text-xs text-text-muted opacity-50 mb-4">
        基于山海经 · 原作 Neil-Federer · MIT
      </p>

      {/* emoji 出场动画 */}
      <style>{`
        .result-emoji {
          animation: emojiPop .6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes emojiPop {
          0% { opacity: 0; transform: scale(0.3) rotate(-10deg); }
          60% { opacity: 1; transform: scale(1.15) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default Result;
