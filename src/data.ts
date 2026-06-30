import { ZoneInfo, StayItem, ProgramItem } from './types';

export const ZONES_DATA: ZoneInfo[] = [
  {
    id: 'start',
    name: '시작의 별채',
    subName: '북부/서부 권역 [함백탄광 기점]',
    title: '문곡소도동 & 삼수동 일대',
    desc: '검은 탄을 캐기 위해 처음 땅을 다지던 그 첫 마음처럼, 인공의 불빛이 닿지 않는 가장 깊은 자연 속에서 태백의 첫 번째 밤을 마주합니다. 해발고도가 가장 높고 빛 공해가 없어 은하수 관측의 최적지입니다. 압도적인 대자연과 태초의 고요함을 마주합니다.',
    mapDesc: '삼수동 상단(매봉산 바람의 언덕 자락) 및 문곡소도동(태백산·함백산 관문) 구역',
    mapCoordinates: { x: 30, y: 35 },
    themeColor: 'from-[#1C2541] to-[#3A506B]',
    tag: '자연 / 휴양',
  },
  {
    id: 'journey',
    name: '여정의 별채',
    subName: '중부 도심 권역 [장성광업소 기점]',
    title: '황지동 · 상장동 · 장성동 일대',
    desc: '광부들이 땀을 씻어내고 따뜻한 한 끼를 나누던 골목. 태백의 활기찬 낮과 아늑한 밤이 교차하는 이곳에서 일상은 여행이 됩니다. 황지연못 중심의 낙동강 발원지로서 광부들의 온기가 머무는 따스하고 소박한 로컬 도심 권역입니다.',
    mapDesc: '태백 도심의 심장부(황지연못 인근)에서 장성동 광업소 주거축 영역',
    mapCoordinates: { x: 50, y: 55 },
    themeColor: 'from-[#1A2E40] to-[#2B546E]',
    tag: '도심 / 로컬',
  },
  {
    id: 'memory',
    name: '기억의 별채',
    subName: '동남부 권역 [한보탄광 기점]',
    title: '황연동 · 철암동 · 구문소동 일대',
    desc: '화려했던 석탄의 기억을 품은 폐갱도가 밤의 불빛과 미디어아트로 살아납니다. 어둠이 짙을수록 더욱 빛나는 은하수처럼 멈춘 시간을 재생합니다. 옛 흔적의 레트로한 감성과 밤의 이색적 야경이 공존하는 문화 예술 재생 권역입니다.',
    mapDesc: '통리역(오로라파크) 및 철암역두선탄장·역사촌 문화 재생 영역',
    mapCoordinates: { x: 75, y: 70 },
    themeColor: 'from-[#221F3B] to-[#453A6B]',
    tag: '역사 / 문화',
  },
];

export const STAYS_DATA: StayItem[] = [
  // 시작의 별채 (start)
  {
    id: 'stay-forest',
    zoneId: 'start',
    name: '숲속의 별채',
    desc: '태백산 국립공원 자락에 위치하여 피톤치드 가득한 전나무 숲 소리를 듣고 깊은 잠에 드는 친환경 오두막 스테이입니다. 넓은 테라스에 설치된 아웃도어 빈백에서 밤하늘 은하수를 온전히 관측할 수 있습니다.',
    location: '강원특별자치도 태백시 태백산로 (소도동)',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    capacity: '기준 2인 (최대 4인)',
    features: ['단독 테라스', 'Stargazing 빈백', '빔프로젝터', '조식 바구니'],
    price: 180000,
  },
  {
    id: 'stay-sky',
    zoneId: 'start',
    name: '하늘의 별채',
    desc: '함백산 해발 1,100m 고지대에 자리잡아 마치 하늘에 떠 있는 듯한 구름 위에서의 하루를 선사합니다. 통창 밖으로 끝없이 펼쳐지는 산맥과 쏟아지는 별무리를 침대에 누워 볼 수 있습니다.',
    location: '강원특별자치도 태백시 함백산길 (황지동)',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80',
    capacity: '기준 2인 (최대 2인)',
    features: ['파노라마 통창', '고급 천체망원경', 'LP 플레이어', '프라이빗 자쿠지'],
    price: 240000,
  },

  // 여정의 별채 (journey)
  {
    id: 'stay-alley',
    zoneId: 'journey',
    name: '골목의 별채 (연화스테이)',
    desc: '태백 황지동 도심의 옛 주택을 현대적 감각으로 재해석한 한옥 감성 스테이입니다. 조용한 골목 정원과 야간 마당 라이팅, 정갈한 실내 다도가 여정의 차분함을 더합니다.',
    location: '강원특별자치도 태백시 황지연못길 (황지동)',
    image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=800&q=80',
    capacity: '기준 2인 (최대 3인)',
    features: ['야간 마당 정원', '전통 다도 세트', '오가닉 침구', '핸드드립 커피바'],
    price: 150000,
  },
  {
    id: 'stay-privacy',
    zoneId: 'journey',
    name: '여여한 사생활',
    desc: '바쁜 일상에서 벗어나 오직 나만의 고요한 집중에 몰입할 수 있도록 설계된 도심형 미니멀 스테이입니다. 세련된 서재 공간과 명상 존이 마련되어 있습니다.',
    location: '강원특별자치도 태백시 장성1길 (장성동)',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    capacity: '기준 1인 (최대 2인)',
    features: ['독서 라운지', '싱잉볼 명상 키트', '스마트 워크데스크', '아로마 디퓨저'],
    price: 130000,
  },

  // 기억의 별채 (memory)
  {
    id: 'stay-time',
    zoneId: 'memory',
    name: '시간의 별채',
    desc: '철암 탄광 역사촌 인근의 유휴 공간을 아날로그적 감성으로 가꾼 뉴트로 스테이입니다. 빈티지 오디오와 은은한 에디슨 전구 조명이 아련한 역사와 온화한 밤 분위기를 선사합니다.',
    location: '강원특별자치도 태백시 동태백로 (철암동)',
    image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80',
    capacity: '기준 2인 (최대 4인)',
    features: ['빈티지 카세트 오디오', '필름카메라 대여', '에디슨 조명', '불멍 화로대'],
    price: 160000,
  },
  {
    id: 'stay-highland',
    zoneId: 'memory',
    name: '태백고원자연휴양림 스테이',
    desc: '푸르른 원시림 속에 숨겨진 클래식 통나무집 스테이입니다. 산새 소리와 계곡 물소리가 들려오는 자연 친화적 공간으로 밤이 되면 사방이 어두워 별빛 쏟아지는 감동을 극대화합니다.',
    location: '강원특별자치도 태백시 머리골길 (황연동)',
    image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=800&q=80',
    capacity: '기준 4인 (최대 6인)',
    features: ['자연 친화 통나무 구조', '계곡 뷰 베란다', '대형 우드 테이블', '벽난로 감성'],
    price: 200000,
  },
];

export const PROGRAMS_DATA: ProgramItem[] = [
  // 시작의 별채 (start)
  {
    id: 'prog-trail',
    zoneId: 'start',
    host: '아웃도어 가이드',
    name: '별빛 산악 트레일러닝',
    desc: '해발 1,000m 이상 고원지대의 야간 능선을 헤드랜턴에 의지해 달리는 짜릿하고 안전한 액티비티입니다. 시원한 고원의 밤바람과 달빛을 호흡합니다.',
    time: '매주 금, 토 오후 8:00 (소요시간 2시간)',
  },
  {
    id: 'prog-yoga',
    zoneId: 'start',
    host: '웰니스 요가 마스터',
    name: '은하수 아래, 힐링 요가',
    desc: '빛 공해가 전혀 없는 청정 고원 잔디밭에서 밤하늘 별을 보며 몸의 긴장을 풀고 싱잉볼 진동과 오가닉 차를 곁들이는 감성 명상 테라피입니다.',
    time: '매주 목, 토 오후 9:30 (소요시간 1.5시간)',
  },

  // 여정의 별채 (journey)
  {
    id: 'prog-tea',
    zoneId: 'journey',
    host: '로컬 티 블렌더',
    name: '태백 광부의 밤, 탄(炭) 티톡스',
    desc: '태백의 석탄을 모티브로 자체 개발한 시그니처 블랙 티와 달콤한 석탄 쿠키를 맛보며, 태백 로컬 주민들과 광부들의 따뜻한 정이 담긴 역사를 공유하는 소셜 살롱입니다.',
    time: '매주 금, 일 오후 7:00 (소요시간 2시간)',
  },
  {
    id: 'prog-craft',
    zoneId: 'journey',
    host: '섬유 공예가',
    name: '고원 숲의 숨결, 잎 두드림 체험',
    desc: '태백산에서 채집한 야생화와 다양한 나무 나뭇잎사귀를 아날로그 망치질 방식으로 패브릭 파우치나 스카프에 천연 무늬를 새기는 단 하나뿐인 로컬 크래프트 체험입니다.',
    time: '매일 오후 2:00 (소요시간 1.5시간)',
  },

  // 기억의 별채 (memory)
  {
    id: 'prog-gorp',
    zoneId: 'memory',
    host: '로컬 크리에이터',
    name: '폐탄광 투어 X 고프코어 룩북',
    desc: '일반인의 출입이 제한되었던 날것 그대로의 가공되지 않은 폐갱도를 탐험하며, 최근 핫한 테크웨어 및 고프코어 패션을 입고 인생 샷 스냅 앨범을 촬영하는 트렌디 투어입니다.',
    time: '매주 수, 토 오후 4:00 (소요시간 2.5시간)',
  },
  {
    id: 'prog-aurora',
    zoneId: 'memory',
    host: '미디어 아티스트',
    name: '오로라 테라피 (야간 미디어)',
    desc: '통리 오로라파크와 탄탄파크 폐갱도 미디어 인프라를 연계하여, 어두운 공간 속에서 형형색색의 오로라 조명 연출과 공간 오디오를 통해 감각적인 야간 도슨트를 전합니다.',
    time: '매주 금, 토 오후 9:00 (소요시간 1시간)',
  },
];
