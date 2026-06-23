import { type FC } from 'react';
import { PERSONALITIES } from '../data/personalities';

interface AllTypesProps {
  /** 当前用户测出的人格编码，高亮显示 */
  currentCode?: string;
  onBack: () => void;
}

const RARITY_ORDER = ['上古凶兽', '远古灵兽', '洪荒瑞兽', '太古妖兽'];

const RARITY_LABEL: Record<string, { tag: string; desc: string }> = {
  '上古凶兽': { tag: 'SSR', desc: '上古凶兽' },
  '远古灵兽': { tag: 'SR', desc: '远古灵兽' },
  '洪荒瑞兽': { tag: 'R', desc: '洪荒瑞兽' },
  '太古妖兽': { tag: 'N', desc: '太古妖兽' },
};

const AllTypes: FC<AllTypesProps> = ({ currentCode, onBack }) => {
  return (
    <div className="flex flex-col items-center min-h-dvh px-5 py-8">
      {/* 标题 */}
      <h2 className="text-2xl font-bold text-ink tracking-wider mb-2">
        山海异兽录
      </h2>
      <p className="text-xs text-text-muted mb-6">
        洪荒十六异兽 · 你属哪一类？
      </p>

      {/* 按稀有度分组 */}
      {RARITY_ORDER.map((rarity) => {
        const group = PERSONALITIES.filter((p) => p.rarity === rarity);
        if (group.length === 0) return null;

        const label = RARITY_LABEL[rarity];

        return (
          <div key={rarity} className="w-full mb-6">
            {/* 稀有度分隔标题 */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-gold tracking-wider">{label.tag}</span>
              <span className="text-xs text-text-muted">{label.desc}</span>
              <div className="flex-1 h-px bg-paper-dark" />
            </div>

            {/* 人格卡片 */}
            <div className="grid grid-cols-1 gap-3">
              {group.map((p) => {
                const isCurrent = p.code === currentCode;
                return (
                  <div
                    key={p.code}
                    className={`relative bg-paper-light border rounded-lg p-4 transition-all ${
                      isCurrent
                        ? 'border-2 shadow-md'
                        : 'border-paper-dark'
                    }`}
                    style={isCurrent ? { borderColor: p.color, boxShadow: `0 2px 12px ${p.color}30` } : {}}
                  >
                    {/* 当前标记 */}
                    {isCurrent && (
                      <span
                        className="absolute -top-2 -right-2 text-[10px] px-2 py-0.5 rounded-full text-white font-bold"
                        style={{ backgroundColor: p.color }}
                      >
                        你的本命
                      </span>
                    )}

                    <div className="flex items-start gap-3">
                      {/* Emoji */}
                      <div className="text-4xl flex-shrink-0">{p.emoji}</div>

                      {/* 信息 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base font-bold text-ink">{p.beast}</span>
                          <span className="text-[10px] font-mono text-text-muted">{p.code}</span>
                        </div>
                        <p className="text-xs mb-1.5" style={{ color: p.color }}>
                          「{p.title}」
                        </p>
                        <p className="text-xs text-ink-light leading-relaxed">
                          {p.shortDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* 返回按钮 */}
      <button
        onClick={onBack}
        className="w-full py-3 bg-transparent border border-paper-dark text-text-muted text-sm
                   tracking-wider rounded-md hover:bg-paper-dark/50 active:scale-[0.98] transition-all mt-2 mb-6"
      >
        ← 返回我的结果
      </button>

      {/* 底部水印 */}
      <p className="text-xs text-text-muted opacity-50 mb-4">
        基于山海经 · 原作 Neil-Federer · MIT
      </p>
    </div>
  );
};

export default AllTypes;
