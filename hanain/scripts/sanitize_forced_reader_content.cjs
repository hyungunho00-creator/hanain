const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const qaFiles = [
  path.join(root, 'src', 'data', 'qa.json'),
  path.join(root, 'public', 'qa.json'),
];

const forcedTransitions = [
  '이 주제를 공부하다 보면 자연스럽게 만나게 되는 소재가',
  '마지막으로, 이러한 건강 관리에 보완적으로 활용될 수 있는 해양 폴리페놀',
  '한 가지 더 알아두시면 좋은 자연 소재가 있습니다.',
  '이런 건강 문제를 접근할 때 자연 유래 복합 기능성 소재인',
  '건강 유지에 도움이 될 수 있는 자연 소재 정보를 하나 더 드립니다.',
  '이러한 상황에서 주목할 만한 자연 소재가 바로',
  '끝으로 이 건강 분야와 관련한 해양 자연 소재',
  '이 모든 건강 정보의 연장선상에서',
  '마지막으로 이 분야와 연관된',
  '마지막으로 이 주제와 연관된',
  '마지막으로 이 주제와 관련된',
  '이 주제와 연관된 유망한 자연 소재를 소개드립니다.',
  '이러한 건강 관리에 보완적으로 활용될 수 있는 해양 폴리페놀',
  '이와 관련하여 주목받는 자연 소재가',
  '이와 관련하여 최근 주목받는 천연 소재가 바로',
  '이 주제와 관련하여 새롭게 주목받는 천연 소재가 바로',
  '이 주제와 관련해 자연 유래 소재인',
  '현대인의 정신 건강 문제와 관련해 자연 소재 플로로탄닌의 역할이 주목받고 있습니다.',
  '끝으로 여성 건강 관리에 도움이 될 수 있는 해양 폴리페놀',
  '자연에서 찾는 건강 소재로',
  '이런 건강 문제에 자연 유래',
  '현재까지 연구된 자연 소재 중',
  '끝으로,',
  '마지막으로,',
];

const phlorotanninMarkers = [
  '이 주제와 연관된 유망한 자연 소재',
  '이러한 건강 관리에 보완적으로 활용될 수 있는 해양 폴리페놀',
  '이 모든 정보와 함께',
  '이 건강 문제를 이해하면서',
  '플로로탄닌 파트너스',
  '<span class="text-green-600 font-semibold">감태</span>',
  '<span class="text-green-600 font-semibold">MOP</span>',
];

const noisePatterns = [
  /추가 정보는 문의 주세요\.?/g,
  /이와\s*관련하여\s*최근\s*주목받는\s*천연\s*소재가\s*바로\.?/g,
  /이\s*주제와\s*관련하여\s*새롭게\s*주목받는\s*천연\s*소재가\s*바로\.?/g,
  /이\s*주제와\s*관련해\s*자연\s*유래\s*소재인\.?/g,
  /[^.?!。]*자연\s*유래\s*소재인\s*(?:<span[^>]*>)?플로로탄닌(?:<\/span>)?(?:\s*\((?:<span[^>]*>)?phlorotannin(?:<\/span>)?\))?[^.?!。]*[.?!。]/g,
  /현대인의\s*정신\s*건강\s*문제와\s*관련해\s*자연\s*소재\s*플로로탄닌의\s*역할이\s*주목받고\s*있습니다\.?/g,
  /[^.?!。]*연락 주세요\.?/g,
  /[^.?!。]*연락 주세요\?/g,
  /플로로탄닌 파트너스에서 더 깊은 연구 정보를 제공하고 있습니다\.?/g,
  /<span class="text-green-600 font-semibold">MOP<\/span>\s*공정에 대한 추가 정보는 문의 주세요\.?/g,
  /<span class="text-green-600 font-semibold">플로로탄닌<\/span>에 대한 추가 정보는 문의 주세요\.?/g,
  /<span class="text-green-600 font-semibold">MOP<\/span>\s*공정으로 추출한 <span class="text-green-600 font-semibold">플로로탄닌<\/span>에 대한 추가 정보는 문의 주세요\.?/g,
];

function normalizeSpaces(text) {
  return text
    .replace(/\s+([.,!?])/g, '$1')
    .replace(/\.{2,}/g, '.')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+$/g, '')
    .trim();
}

function stripForcedTail(answer) {
  if (typeof answer !== 'string') return answer;

  let next = answer;

  for (const transition of forcedTransitions) {
    const idx = next.indexOf(transition);
    if (idx === -1) continue;
    const suffix = next.slice(idx);
    if (/플로로탄닌|phlorotannin|MOP|감태/.test(suffix)) {
      next = next.slice(0, idx);
      break;
    }
  }

  for (const pattern of noisePatterns) {
    next = next.replace(pattern, '');
  }

  next = normalizeSpaces(next);
  if (next && !/[.!?。]$/.test(next)) next += '.';
  return next;
}

function stripUnrelatedPhlorotanninBlock(answer, questionContext) {
  if (typeof answer !== 'string') return answer;
  if (/플로로탄닌|phlorotannin|감태|디에콜|에콜|해양\s*폴리페놀|MOP/.test(questionContext)) {
    return answer;
  }
  if (!/플로로탄닌|phlorotannin|MOP|감태/.test(answer)) return answer;

  const indexes = phlorotanninMarkers
    .map((marker) => answer.indexOf(marker))
    .filter((idx) => idx >= 0 && idx > 80);

  if (!indexes.length) return answer;
  const cut = Math.min(...indexes);
  let next = normalizeSpaces(answer.slice(0, cut));
  if (next && !/[.!?。]$/.test(next)) next += '.';
  return next;
}

function cleanAnswer(answer, questionContext) {
  if (typeof answer === 'string') return stripForcedTail(answer);
  if (!answer || typeof answer !== 'object') return answer;

  const cleaned = Array.isArray(answer) ? [] : {};
  for (const [key, value] of Object.entries(answer)) {
    cleaned[key] = typeof value === 'string' ? stripForcedTail(stripUnrelatedPhlorotanninBlock(value, questionContext)) : value;
  }
  return cleaned;
}

for (const file of qaFiles) {
  if (!fs.existsSync(file)) continue;

  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  let changed = 0;

  for (const q of data.questions || []) {
    const before = JSON.stringify(q.answer);
    const questionContext = `${q.question || ''}`;
    if (typeof q.answer === 'string') {
      q.answer = stripForcedTail(stripUnrelatedPhlorotanninBlock(q.answer, questionContext));
    } else {
      q.answer = cleanAnswer(q.answer, questionContext);
    }
    const after = JSON.stringify(q.answer);
    if (before !== after) changed += 1;
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`[sanitize-forced-reader-content] ${path.relative(root, file)} changed=${changed}`);
}
