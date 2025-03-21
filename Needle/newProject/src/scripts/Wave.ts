type Wave = {
  enemies: number[];
  interval: number;
};

export const WAVES: Wave[] = [
  {
    enemies: [0, 1, 2, 1, 0, 3],
    interval: 1,
  },
  {
    enemies: [2, 2, 2, 2, 2, 2, 2, 2, 2],
    interval: 0.5,
  },
  {
    enemies: [0, 0, 1, 1, 2, 2, 0, 1, 2, 0, 1, 2],
    interval: 0.5,
  },
];
