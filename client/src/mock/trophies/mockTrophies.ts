export const mockTrophies = [
  {
    _id: '6183b3490756c7b43ae1d4ae',
    name: 'IFL Segunda División',
    year: 2020,
    isWinner: true,
    isFinal: false,
    __typename: 'Trophy',
  },
  {
    _id: '61831e4aed7eb6ac6d35f24d',
    name: 'IFL Copa',
    year: 2018,
    isWinner: false,
    isFinal: true,
    __typename: 'Trophy',
  },
  {
    _id: '61831ada4244b18dd6d599e4',
    name: 'IFL Segunda',
    year: 2015,
    isWinner: false,
    isFinal: false,
    __typename: 'Trophy',
  },
];

export const mockTrophy = {
  _id: '61831e4aed7eb6ac6d35f24d',
  name: 'IFL Copa',
  year: 2018,
  isWinner: false,
  isFinal: true,
  opponent: 'Los Galácticos',
  description: 'This is the description',
  __typename: 'Trophy',
};

export const mockTrophyCupWin = {
  _id: '61831e4aed7eb6ac6d35f24d',
  name: 'IFL Copa',
  year: 2018,
  isWinner: true,
  isFinal: true,
  opponent: 'Los Galácticos',
  description: '',
  __typename: 'Trophy',
};

export const mockTrophyCupLoss = {
  _id: '61831e4aed7eb6ac6d35f24d',
  name: 'IFL Copa',
  year: 2018,
  isWinner: false,
  isFinal: true,
  opponent: 'Los Galácticos',
  description: '',
  __typename: 'Trophy',
};

export const mockTrophyLeagueWin = {
  _id: '61831e4aed7eb6ac6d35f24d',
  name: 'Division One',
  year: 2018,
  isWinner: true,
  isFinal: false,
  opponent: '',
  description: '',
  __typename: 'Trophy',
};

export const mockTrophyLeagueLoss = {
  _id: '61831e4aed7eb6ac6d35f24d',
  name: 'Division One',
  year: 2018,
  isWinner: false,
  isFinal: false,
  opponent: '',
  description: '',
  __typename: 'Trophy',
};

export const mockTrophyTotals = {
  total: 3,
  totalFinals: 1,
  wins: 1,
  runnerUp: 2,
  __typename: 'TrophyTotals',
};
