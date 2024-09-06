import { Country, State, City } from "country-state-city";

export function CountryStateCity(selectedCountry: any, selectedState: any) {
  const countries: any = Country.getAllCountries().map((country: any) => ({
    value: country.isoCode,
    label: country.name,
  }));

  let selectedCountryISOCode = countries.find(
    (country: any) => country.label === selectedCountry
  )?.value;

  const states: any = selectedCountry
    ? State.getStatesOfCountry(selectedCountryISOCode)?.map((state: any) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  const selectedStateISOCode = states.find(
    (state: any) => state.label === selectedState
  )?.value;

  const cities: any = selectedState
    ? City.getCitiesOfState(selectedCountryISOCode, selectedStateISOCode)?.map(
        (city: any) => ({
          value: city.name,
          label: city.name,
        })
      )
    : [];

  return { countries, states, cities };
}

export function CountryCity(selectedCountry: any) {
  const countries: any = Country.getAllCountries().map((country: any) => ({
    value: country.isoCode,
    label: country.name,
  }));

  let selectedCountryISOCode = countries.find(
    (country: any) => country.label === selectedCountry
  )?.value;

  const cities: any = selectedCountry
    ? City.getCitiesOfCountry(selectedCountryISOCode)?.map((city: any) => ({
        value: city.name,
        label: city.name,
      }))
    : [];

  return { countries, cities };
}
