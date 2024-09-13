//fetchCountries

export interface Country {
  name: {
    common: string;
  };
}

export const fetchCountries = async (): Promise<string[]> => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data: Country[] = await response.json();
    const countryNames = data.map((country) => country.name.common);
    // console.log(data);
    return countryNames;
  } catch (error) {
    console.error("Error fetching country data:", error);
    return [];
  }
};
