export interface Country {
    name: {
        common: string;
        official: string;
    };
    capital: string[];
    cca3: string;
    flags: {
        alt: string;
        png: string;
        svg: string;
    };
    population: number;
    region: string;
    currencies: string[];
    languages: string[];
    
}