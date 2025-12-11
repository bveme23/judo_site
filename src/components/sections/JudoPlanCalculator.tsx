'use client';

import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';

type DojoCount = '1' | '2' | '3';
type ParticipantType = 'u18' | 'adult';

// 利益率（必要に応じてここを 0.25 などに変えれば全体が変わります）
const PROFIT_MARGIN = 0.3;

/**
 * 元の表に記載されている「保険料」列。
 * 想定：各日数プラン（1〜31日）に対する保険料の合計金額。
 */
const INSURANCE_PER_DAY: { [day: number]: number } = {
  1: 800,
  2: 1220,
  3: 1620,
  4: 1950,
  5: 2300,
  6: 2650,
  7: 2960,
  8: 3260,
  9: 3520,
  10: 3790,
  11: 4060,
  12: 4330,
  13: 4620,
  14: 4870,
  15: 5090,
  16: 9420,
  17: 5450,
  18: 9420,
  19: 5950,
  20: 9420,
  21: 6470,
  22: 9420,
  23: 7010,
  24: 9420,
  25: 7580,
  26: 9420,
  27: 8140,
  28: 9420,
  29: 8720,
  30: 9420,
  31: 9420,
};

/**
 * 1日あたりの人件費（2,000円 × 時間数）
 * 1拠点：3時間 → 6,000円
 * 2拠点：6時間 → 12,000円
 * 3拠点：9時間 → 18,000円
 */
const LABOUR_COST_PER_DAY: Record<DojoCount, number> = {
  '1': 6000,
  '2': 12000,
  '3': 18000,
};

/**
 * 1日あたりの施設利用料
 * 1拠点：1,000円/日
 * 2拠点：2,000円/日
 * 3拠点：3,000円/日
 */
const USAGE_FEE_PER_DAY: Record<DojoCount, number> = {
  '1': 1000,
  '2': 2000,
  '3': 3000,
};

function formatYen(value: number): string {
  return value.toLocaleString('ja-JP') + '円';
}

function formatPercent(value: number): string {
  return (value * 100).toFixed(1) + '%';
}

/**
 * プラン全体のコスト計算
 *
 * 想定ロジック：
 * - 保険料は「日数プラン全体」で固定（INSURANCE_PER_DAY[d]）
 * - 人件費は「1日あたり × 日数」
 * - 施設利用料は「1日あたり × 日数」
 */
function calcPlanCost(days: number, dojoCount: DojoCount) {
  const insurance = INSURANCE_PER_DAY[days] ?? 0;
  const labour = LABOUR_COST_PER_DAY[dojoCount] * days;
  const usageFee = USAGE_FEE_PER_DAY[dojoCount] * days;
  const totalCost = insurance + labour + usageFee;
  return { insurance, labour, usageFee, totalCost };
}

/**
 * 利益率30%になるような販売価格を算出
 *
 * (price - cost) / price = PROFIT_MARGIN
 * → price = cost / (1 - PROFIT_MARGIN)
 *
 * 表示上は10円単位で丸める。
 */
function calcPlanPrice(days: number, dojoCount: DojoCount) {
  const { insurance, labour, usageFee, totalCost } = calcPlanCost(days, dojoCount);

  if (!INSURANCE_PER_DAY[days]) {
    return {
      totalPrice: 0,
      insurance,
      labour,
      usageFee,
      profit: 0,
      margin: 0,
    };
  }

  const rawPrice = totalCost / (1 - PROFIT_MARGIN);
  const roundedPrice = Math.round(rawPrice / 10) * 10;
  const profit = roundedPrice - totalCost;
  const margin = roundedPrice > 0 ? profit / roundedPrice : 0;

  return {
    totalPrice: roundedPrice,
    insurance,
    labour,
    usageFee,
    profit,
    margin,
  };
}

/**
 * メインコンポーネント
 */
export function JudoPlanCalculator() {
  const [days, setDays] = useState<number | ''>(1);
  const [dojoCount, setDojoCount] = useState<DojoCount>('1');
  const [participantType, setParticipantType] = useState<ParticipantType>('u18');

  const handleDaysChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === '') {
      setDays('');
      return;
    }
    const numValue = Number(value);
    if (Number.isNaN(numValue)) return;
    if (numValue < 0 || numValue > 31) return;
    setDays(numValue);
  };

  const handleDojoCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as DojoCount;
    setDojoCount(value);
  };

  const handleParticipantTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as ParticipantType;
    setParticipantType(value);
  };

  // Convert days to number (0 if empty or 0)
  const daysNum = days === '' || days === 0 ? 0 : days;
  
  const { totalPrice, insurance, labour, usageFee, profit, margin } = calcPlanPrice(
    daysNum,
    dojoCount
  );

  const isValid = daysNum > 0 && !!INSURANCE_PER_DAY[daysNum];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl bg-card p-6 shadow-xl lg:p-8"
    >
      {/* ヘッダー */}
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-bold text-primary tracking-tight sm:text-3xl mb-2">
          サービスプラン・料金シミュレーター
        </h2>
        <p className="text-sm text-textMuted">
          日数と1日あたりの訪問道場数を選ぶと、想定コストから利益率30％で算出した概算料金が表示されます。
        </p>
      </div>

      {/* 横長レイアウト - すべて1行で表示 */}
      <div className="flex flex-wrap items-end gap-4 lg:gap-6">
        {/* 日数 */}
        <div className="group flex items-center gap-3">
          <label
            htmlFor="days"
            className="text-sm font-semibold text-primary whitespace-nowrap"
          >
            日数
          </label>
          <input
            id="days"
            type="number"
            min={0}
            max={31}
            value={days}
            onChange={handleDaysChange}
            className="w-20 rounded-lg border border-subtle bg-white px-3 py-2 text-sm text-textMain transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-primary/50"
          />
        </div>

        {/* 道場数 */}
        <div className="group flex items-center gap-3">
          <label
            htmlFor="dojoCount"
            className="text-sm font-semibold text-primary whitespace-nowrap"
          >
            1日あたりの訪問道場数
          </label>
          <select
            id="dojoCount"
            value={dojoCount}
            onChange={handleDojoCountChange}
            className="w-24 rounded-lg border border-subtle bg-white px-3 py-2 text-sm text-textMain transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-primary/50 cursor-pointer"
          >
            <option value="1">1拠点</option>
            <option value="2">2拠点</option>
            <option value="3">3拠点</option>
          </select>
        </div>

        {/* 参加者区分 */}
        <div className="group flex items-center gap-3">
          <span className="text-sm font-semibold text-primary whitespace-nowrap">
            参加者区分
          </span>
          <div className="flex items-center gap-4">
            <label className="group flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="participantType"
                value="u18"
                checked={participantType === 'u18'}
                onChange={handleParticipantTypeChange}
                className="w-4 h-4 text-primary border-subtle focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all duration-200"
              />
              <span className="text-sm text-textMain group-hover:text-primary transition-colors duration-200 whitespace-nowrap">
                U18
              </span>
            </label>
            <label className="group flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="participantType"
                value="adult"
                checked={participantType === 'adult'}
                onChange={handleParticipantTypeChange}
                className="w-4 h-4 text-primary border-subtle focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all duration-200"
              />
              <span className="text-sm text-textMain group-hover:text-primary transition-colors duration-200 whitespace-nowrap">
                大人
              </span>
            </label>
          </div>
        </div>

        {/* 選択内容の要約 - 横一列 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 rounded-lg bg-muted px-4 py-2 border border-subtle"
        >
          <div className="text-sm font-semibold text-primary whitespace-nowrap">選択中のプラン：</div>
          <div className="flex items-center gap-3 text-sm text-textMain">
            <span>日数：{days === '' ? '（未入力）' : `${days}日`}</span>
            <span className="text-textMuted">|</span>
            <span>{dojoCount}拠点</span>
            <span className="text-textMuted">|</span>
            <span>{participantType === 'u18' ? 'U18' : '大人'}</span>
          </div>
        </motion.div>

        {/* 計算結果エリア - 横一列 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="ml-auto"
        >
          <div className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-primarySoft to-primary/5 px-5 py-3 border border-primary/10 shadow-lg">
            <div className="text-xs font-semibold text-primary uppercase tracking-wide whitespace-nowrap">
              概算料金（1名あたり）
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-primary">
              {daysNum === 0 || days === '' ? (
                formatYen(0)
              ) : !isValid ? (
                <span className="text-sm text-primary font-medium">データなし</span>
              ) : (
                <motion.span
                  key={totalPrice}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                >
                  {formatYen(totalPrice)}
                </motion.span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
