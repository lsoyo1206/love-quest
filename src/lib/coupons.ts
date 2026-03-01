export type Coupon = {
  id: string;
  title: string;
  desc: string;
  emoji: string;
};

export const COUPONS_BY_LEVEL: Record<1 | 2 | 3 | 4, Coupon> = {
  1: {
    id: 'coupon_lv1',
    title: '마사지 10분권',
    desc: '오늘은 내가 손으로 정성껏 풀어드림 😌',
    emoji: '💆‍♀️',
  },
  2: {
    id: 'coupon_lv2',
    title: '디저트 픽업권',
    desc: '먹고 싶은 디저트 하나 콕! 내가 사올게 🍰',
    emoji: '🍰',
  },
  3: {
    id: 'coupon_lv3',
    title: '소원 1개권',
    desc: '합리적인 선에서 소원 1개 들어주기 ✨',
    emoji: '✨',
  },
  4: {
    id: 'coupon_lv4',
    title: '데이트 코스 결정권',
    desc: '오늘 데이트는 너가 대장! 내가 따라갈게 🗺️',
    emoji: '🗺️',
  },
};