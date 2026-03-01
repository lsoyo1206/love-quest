export type LevelId = 1 | 2 | 3 | 4;

export type Choice = {
  text: string;
  isCorrect?: boolean; // 정답/성공 선택지
};

export type LevelData = {
  id: LevelId;
  title: string;
  story: string[];     // 대사/문장 배열 (한 줄씩 넘김)
  choices: Choice[];   // 마지막에 선택지
  rewardKey: string;   // 보상 잠금해제 키
};

export const LEVELS: Record<LevelId, LevelData> = {
  1: {
    id: 1,
    title: 'LEVEL 1 : 첫 만남',
    story: [
      '3월 20일, 강남 11번 출구 앞에서 널 기다리고 있었을 때',
      '저 길다란 사람이 나랑 연락한 사람이 맞나,,? 라는 생각을 했어',
      '처음 규리를 보고 내가 했던 말 기억나?',
    ],
    choices: [
      { text: '“안녕하세요, 오는데 얼마나 걸리셨어요?”' },
      { text: '“안녕! 와,, 키 엄청 크다!”' },
      { text: '“안녕 오는데 오래 걸렸지?!”', isCorrect: true },
      { text: '“안녕! 생각보다 더 빨리 왔네?”' },
    ],
    rewardKey: 'reward_level1',
  },
  2: {
    id: 2,
    title: 'LEVEL 2 : 첫 싸움 극복',
    story: [
      '우리가 처음 다퉜던 날',
      '규리는 나를 좋아하는 마음에 속상해했던 거였어',
      '그때 제일 중요했던 건?',
    ],
    choices: [
      { text: '서로의 마음을 끝까지 듣기', isCorrect: true },
      { text: '누가 더 맞는지 승부보기' },
      { text: '잠수타기' },
    ],
    rewardKey: 'reward_level2',
  },
  3: {
    id: 3,
    title: 'LEVEL 3 : 여행',
    story: [
      '우리 처음 기차타고 놀러간 곳은 바로 강릉으죠옹!!',
      '첫 여행이였던 만큼, 기대도 많이 하고 맛있는 것도 먹었지 ㅎㅎ',
      '숙소 앞 해변에서 사진도 찍고~ 폭죽도 터트렸지',
      '우리가 가지 않았던 곳은 어딜까??',
    ],
    choices: [
      { text: '사근진해변”', isCorrect: true },
      { text: '“송정해변”' },
      { text: '남항진동' },
    
    ],
    rewardKey: 'reward_level3',
  },
  4: {
    id: 4,
    title: 'LEVEL 4 : 오늘, 생일',
    story: [
      '오늘은 3월 9일 규리의 생일!! 🎂',
      '우리 강아지 생일 누구보다 내가 제일 축하해',
      '짠 하고!! 만들어 주려고 했는데 내가 너무 투명해서',
      '이거 만든다는 걸 들켜버렸어 ㅜㅜ',
      '그래도 막상 받게 되니까 기쁘지?',
      '태어나줘서 고마워 우리 규리',
      '그리고 내가 제일 사랑해',
    ],
    choices: [
      { text: '이게 머노!! 나도 만들겠네', isCorrect: true },
      { text: '너가 해주는 거면 뭐든 다 좋아', isCorrect: true },
      { text: '에이~ 그냥 그렇네~ ' },
    ],
    rewardKey: 'reward_level4',
  },
};