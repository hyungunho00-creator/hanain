import React from 'react'
import { H2, P, UL, Callout, RelLink, Table, Hr } from '../_helpers'

const PUB = '2026-05-27'

export default {
  slug: 'gamtae-keyword-map-sleep-dieckol-side-effects',
  title: '감태 연관키워드 지도: 수면·디에콜·부작용·먹는법',
  description:
    '감태 효능, 감태추출물, 감태 수면영양제, 디에콜, 요오드·갑상선, 먹는법, 가격, 후기 키워드를 검색 의도별로 정리했습니다.',
  keywords: '감태 연관검색어,감태 효능,감태 수면영양제,감태 디에콜,감태 부작용,감태 먹는법',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'research',
  categoryLabel: '연구 동향',
  tags: ['감태', '연관키워드', '수면영양제', '디에콜', 'SEO'],
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '감태 키워드는 효능 하나로 묶기보다 음식 감태, 감태추출물, 수면영양제, 디에콜, 안전성, 구매 의도로 나눠야 합니다',
    '기존 대표 글이 많은 상태에서는 롱테일 의도별 글이 중복 SEO를 피하면서 검색면을 넓히는 방식입니다',
    '후기와 가격 키워드는 구매 직전 의도이므로 성분표 점검 CTA와 연결하는 편이 자연스럽습니다',
  ],
  faqs: [
    {
      q: '감태 효능 글을 계속 많이 쓰면 좋은가요?',
      a: '아닙니다. 같은 주제를 반복하면 중복 SEO 위험이 커집니다. 효능 대표 글은 유지하고 수면, 디에콜, 요오드, 먹는법, 가격처럼 의도별로 분리하는 편이 좋습니다.',
    },
    {
      q: '감태와 감태추출물은 같은 키워드로 보면 되나요?',
      a: '검색어는 겹치지만 콘텐츠에서는 구분해야 합니다. 음식 감태는 식재료이고 감태추출물은 플로로탄닌 표준화와 안전성 자료를 보는 원료입니다.',
    },
  ],
  body: (
    <>
      <H2 id="map">왜 키워드 지도가 필요한가</H2>
      <P speakable>
        감태는 이미 넓은 대표 키워드가 많이 발행된 주제입니다. 이 상태에서 같은 제목의 글을 더 쓰면
        검색엔진 입장에서는 어느 글을 대표로 볼지 흐려질 수 있습니다. 그래서 이번 클러스터는 감태 효능
        반복이 아니라 연관검색어별 검색 의도를 분리하는 방식으로 설계했습니다.
      </P>

      <H2 id="intent">검색 의도별 분류</H2>
      <Table
        headers={['키워드 묶음', '사용자 의도', '콘텐츠 방향']}
        rows={[
          ['감태 효능', '전체 개요를 빠르게 확인', '음식 감태와 감태추출물 차이부터 정리'],
          ['감태 수면영양제', '잠, 수면의 질, 기능성 원료 확인', '디에콜·GABA 경로와 주의점 분리'],
          ['감태 디에콜', '성분표와 표준화 이해', '플로로탄닌 계열명과 디에콜 지표 구분'],
          ['감태 요오드 갑상선', '안전성 불안 해소', '다시마·미역과 혼동하지 않게 안내'],
          ['감태 먹는법', '원물·분말·환·캡슐 선택', '식품과 추출물의 목적별 차이 정리'],
          ['감태 가격 후기', '구매 직전 비교', '성분표, 함량, 안전성 자료 확인 CTA 연결'],
        ]}
      />

      <H2 id="evidence">근거를 붙이는 기준</H2>
      <P>
        감태 수면 쪽은 플로로탄닌 인체 연구와 약학정보원 수면영양제 자료를 함께 봅니다. 디에콜 쪽은
        2025년 플로로탄닌 종설과 2026년 디에콜 전임상 논문을 참고하되, 전임상 결과를 사람 결과처럼
        확대하지 않습니다. 안전성은 EFSA 자료와 국내 수면영양제 주의문을 바닥에 둡니다.
      </P>
      <UL
        items={[
          '인체 연구와 세포·동물 연구를 같은 문장으로 섞지 않습니다',
          '감태추출물 자료를 생감태·건감태 반찬 결과로 확대하지 않습니다',
          '후기는 맛과 편의성 참고로만 쓰고 건강 결과의 근거로 쓰지 않습니다',
          'CTA는 구매 압박보다 성분표 점검과 상담 전 정보 정리에 둡니다',
        ]}
      />

      <Callout type="key" title="운영 방향">
        감태 클러스터는 한 번에 과발행하지 않고 1차 8개 블로그와 2개 인사이트로 시작합니다. 이후
        Search Console에서 노출이 잡히는 키워드를 보고 수면, 가격, 후기, 갑상선 축을 2차로 확장합니다.
      </Callout>

      <Hr />
      <P>
        관련 글: <RelLink to="/blog/gamtae-sleep-supplement-dieckol-quality-guide">감태 수면영양제 고르는 법</RelLink>
        {' '}·{' '}
        <RelLink to="/blog/gamtae-dieckol-phlorotannin-label-reading-guide">감태 디에콜 성분표 읽기</RelLink>
        {' '}·{' '}
        <RelLink to="/blog/gamtae-iodine-thyroid-dasima-difference">감태 요오드·갑상선 걱정</RelLink>.
      </P>

      <p
        style={{
          margin: '32px 0 8px',
          padding: '16px 0',
          borderTop: '1px solid #D8D2C4',
          borderBottom: '1px solid #D8D2C4',
          textAlign: 'center',
          fontFamily: "'Noto Serif KR', serif",
        }}
      >
        <a
          href="/consult"
          style={{ color: '#0D1B3E', textDecoration: 'none', fontSize: 15, letterSpacing: '0.02em' }}
        >
          감태 제품 성분표와 검색 의도 점검 요청하기
          <span style={{ color: '#B8953A', fontFamily: 'Georgia, serif', marginLeft: 6 }}>&rarr;</span>
        </a>
      </p>
    </>
  ),
}
