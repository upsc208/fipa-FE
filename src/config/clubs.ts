export interface ClubConfig {
  id: string;
  name: string;
  nameKo: string;
  shortName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    white: string;
    darkAccent: string;
    surface?: string;
  };
  links: {
    officialTickets: string;
    officialStore: string;
  };
  assets: {
    logoText: string;
  };
  design: {
    patternType: 'dots' | 'piping' | 'grunge' | 'geo';
    fontType: 'bebas' | 'kanit';
  };
}

export const CLUBS: Record<string, ClubConfig> = {
  manutd: {
    id: 'manutd',
    name: 'Manchester United',
    nameKo: '맨체스터 유나이티드',
    shortName: 'MAN UTD',
    colors: {
      primary: '#DA291C', // United Red
      secondary: '#000000', // Black accents
      accent: '#FBE122', // Yellow/Gold details
      white: '#FFFFFF',
      darkAccent: '#FBE122',
      surface: '#DA291C',
    },
    links: {
      officialTickets: 'https://www.manutd.com/en/tickets',
      officialStore: 'https://store.manutd.com/',
    },
    assets: {
      logoText: 'NEWS',
    },
    design: {
      patternType: 'dots',
      fontType: 'bebas',
    },
  },
  liverpool: {
    id: 'liverpool',
    name: 'Liverpool FC',
    nameKo: '리버풀',
    shortName: 'LFC',
    colors: {
      primary: '#C8102E', // Strawberry Red
      secondary: '#FFFFFF', // Crisp White details
      accent: '#00B2A9', // Teal/Green accent
      white: '#FFFFFF',
      darkAccent: '#00B2A9',
      surface: '#C8102E',
    },
    links: {
      officialTickets: 'https://www.liverpoolfc.com/tickets',
      officialStore: 'https://store.liverpoolfc.com/',
    },
    assets: {
      logoText: 'KOP',
    },
    design: {
      patternType: 'piping',
      fontType: 'kanit',
    },
  },
  chelsea: {
    id: 'chelsea',
    name: 'Chelsea FC',
    nameKo: '첼시',
    shortName: 'CHELSEA',
    colors: {
      primary: '#034694', // Rush Blue
      secondary: '#003366', // Darker Blue for two-tone
      accent: '#EE242C', // Speed Red accent
      white: '#FFFFFF',
      darkAccent: '#EE242C',
      surface: '#034694',
    },
    links: {
      officialTickets: 'https://www.chelseafc.com/en/tickets',
      officialStore: 'https://store.chelseafc.com/',
    },
    assets: {
      logoText: 'BLUES',
    },
    design: {
      patternType: 'grunge',
      fontType: 'bebas',
    },
  },
};

