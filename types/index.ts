export interface Country {
    name: {
      common: string;
      official: string;
    };
    cca3: string;
    capital?: string[];
    population: number;
    region: string;
    flags: {
      png: string;
      svg: string;
    };
    languages?: {
      [key: string]: string;
    };
    currencies?: {
      [key: string]: {
        name: string;
        symbol: string;
      };
    };
    timezones?: string[];
    idd: {
      root: string;
      suffixes: string[];
    };
    car?: {
      side: string;
    };
  }