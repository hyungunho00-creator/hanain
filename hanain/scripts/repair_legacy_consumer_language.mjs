import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const targets = [
  path.join(root, 'src', 'data', 'qa.json'),
  path.join(root, 'public', 'qa.json'),
  path.join(root, 'src', 'data', 'localTrendBlogPosts.js'),
  path.join(root, 'src', 'data', 'insights', 'hospitalInsightConfigs.js'),
  ...fs
    .readdirSync(path.join(root, 'src', 'data', 'insights', 'posts'))
    .filter((name) => name.endsWith('.jsx'))
    .map((name) => path.join(root, 'src', 'data', 'insights', 'posts', name)),
  ...fs
    .readdirSync(path.join(root, 'src', 'data'))
    .filter((name) => /^localTrendBlogPostsRound\d+\.js$/.test(name))
    .map((name) => path.join(root, 'src', 'data', name)),
];

const replacements = [
  [/그렇게 말하면 안 됩니다\./g, '그렇게 단정하기보다 확인할 기록과 상담 기준을 먼저 세우는 편이 안전합니다.'],
  [/그렇게 표현하면 안 됩니다\./g, '그렇게 단정하기보다 회복 기록과 상담 기준을 함께 정리하는 표현이 더 적합합니다.'],
  [/처럼 말하면 안 됩니다\./g, '처럼 단정하기보다 회복 기록과 상담 기준을 함께 정리합니다.'],
  [/처럼 말하면 안 됩니다/g, '처럼 단정하기보다 회복 기록과 상담 기준을 함께 정리합니다'],
  [/처럼 표현하면 안 됩니다\./g, '처럼 단정하기보다 회복 기록과 상담 기준을 함께 정리합니다.'],
  [/처럼 표현하면 안 됩니다/g, '처럼 단정하기보다 회복 기록과 상담 기준을 함께 정리합니다'],
  [/설명하면 안 됩니다\./g, '설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다.'],
  [/설명하면 안 됩니다/g, '설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다'],
  [/표현하면 안 됩니다\./g, '단정 표현보다 확인할 기록과 상담 기준을 먼저 안내합니다.'],
  [/표현하면 안 됩니다/g, '단정 표현보다 확인할 기록과 상담 기준을 먼저 안내합니다'],
  [/단정하면 안 됩니다\./g, '단정하기보다 확인할 기록과 상담 기준을 먼저 안내합니다.'],
  [/단정하면 안 됩니다/g, '단정하기보다 확인할 기록과 상담 기준을 먼저 안내합니다'],
  [/말하면 안 됩니다\./g, '단정하기보다 회복 기록과 상담 기준을 먼저 세우는 편이 안전합니다.'],
  [/말하면 안 됩니다/g, '단정하기보다 회복 기록과 상담 기준을 먼저 세웁니다'],
  [/보장한다고 단정해서는 안 됩니다\./g, '보장 표현보다 회복 기록과 상담 기준 안에서 참고합니다.'],
  [/단정해서는 안 됩니다\./g, '단정 표현보다 회복 기록과 상담 기준 안에서 참고합니다.'],
  [/대체한다고 말하면 안 됩니다\./g, '대체 표현보다 회복 루틴을 이해하는 참고 축으로 설명합니다.'],
  [/대신한다고 말하면 안 됩니다\./g, '대신한다는 표현보다 회복 루틴을 이해하는 참고 축으로 설명합니다.'],
  [/상쇄한다고 말하면 안 됩니다\./g, '상쇄 표현보다 몸 반응 기록과 회복 루틴을 먼저 안내합니다.'],
  [/해결한다고 말하면 안 됩니다\./g, '해결 표현보다 증상 기록과 상담 기준을 먼저 안내합니다.'],
  [/예방하거나 치료한다고 말하면 안 됩니다\./g, '예방·치료 표현보다 위험 신호와 회복 기록을 구분해 안내합니다.'],
  [/치료한다고 말하면 안 됩니다\./g, '치료 표현보다 회복 기록과 상담 기준을 먼저 안내합니다.'],
  [/개선한다고 말하면 안 됩니다\./g, '개선 보장보다 변화 기록과 회복 루틴을 함께 봅니다.'],
  [/낮춘다고 말하면 안 됩니다\./g, '낮춘다는 단정보다 검사·기록·회복 루틴을 함께 봅니다.'],
  [/올린다고 말하면 안 됩니다\./g, '올린다는 단정보다 훈련·수면·회복 기록을 함께 봅니다.'],
  [/감태 기반 연구 소재로만/g, '감태 기반 회복 연구 소재로'],
  [/연구 소재로만/g, '회복 연구 소재로'],
  [/소재로만/g, '회복 루틴을 이해하는 참고 소재로'],
  [/배경 정보로만/g, '회복 기록을 이해하는 참고 정보로'],
  [/배경 소재로만/g, '회복 기록을 이해하는 참고 소재로'],
  [/보조 자료로만/g, '회복 루틴의 참고 자료로'],
  [/일반 건강정보로만/g, '생활 회복 정보로'],
  [/참고 정보일 뿐,/g, '회복 루틴을 이해하는 참고 정보이며,'],
  [/항산화 연구 맥락일 뿐/g, '항산화 연구 맥락에서 회복 루틴을 이해하는 참고 축이며'],
  [/치료가 아니라/g, '회복 기록의 관점에서'],
  [/예방·치료가 아니라/g, '위험 신호와 회복 기록을 구분하면서'],
  [/해결책처럼/g, '단일 해결책으로 단정하기보다'],
  [/성분 하나로/g, '성분 연구와 생활 기록을 함께 보며'],
];

let changedFiles = 0;
let replacementCount = 0;

for (const file of targets) {
  let text = fs.readFileSync(file, 'utf8');
  const original = text;
  for (const [pattern, replacement] of replacements) {
    text = text.replace(pattern, (...args) => {
      replacementCount += 1;
      return replacement;
    });
  }
  if (text !== original) {
    fs.writeFileSync(file, text, 'utf8');
    changedFiles += 1;
  }
}

console.log(JSON.stringify({ changedFiles, replacementCount }, null, 2));
