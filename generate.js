const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const os = require('os');
const utf8 = require('utf8');
const airportOverridesData = require('./lib/airportOverrides');

// Load large airport data
const largeAirportData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'large-airports.json'), 'utf8'));
// Load all airport data
const allAirportData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'airport-codes.json'), 'utf8'));
// Load countries data
const countriesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'country-codes.json'), 'utf8'));

const writeCSV = locations => {
  const csvPath = path.join(__dirname, 'dist', 'googlecloud-edge-locations.csv');
  const data = locations.map(e => {
    return `${e.code},${e.city},${e.state || ''},${e.country},${e.countryCode},${e.latitude},${e.longitude},${e.count}`;
  });
  // Add header
  data.unshift('code,city,state,country,country_code,latitude,longitude,count');
  fs.writeFileSync(csvPath, data.join(os.EOL), 'utf8');
}

const writeJSON = locations => {
  const jsonPath = path.join(__dirname, 'dist', 'googlecloud-edge-locations.json');
  const data = {};
  locations.forEach(location => {
    data[location.code] = {
      city: location.city,
      state: location.state || null,
      country: location.country,
      countryCode: location.countryCode,
      latitude: location.latitude,
      longitude: location.longitude,
      count: location.count,
    }
  });
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
}

const lookupCountry = (countryCode) => {
  const foundCountry = countriesData.filter(country => country.Code === countryCode);
  if (foundCountry.length === 1) {
    return foundCountry[0].Name;
  } else {
    return '';
  }
}

const lookupAirport = (city, dataSource = largeAirportData) => {
  const matches = [];
  let match = null;
  // Search for matches
  dataSource.forEach(entry => {
    if (entry.municipality && entry.municipality.toLowerCase() === city.toLowerCase()) {
      matches.push(entry);
    }
  });
  if (matches.length > 1) { // Handle multiple matches
    const tempMatches = [];
    matches.forEach(m => {
      if (m.name.toLowerCase().indexOf('international') !== -1) {
        tempMatches.push(m);
      }
    });
    if (tempMatches.length > 0) { // Multiple matches, take first one, kind of random selection
      match = tempMatches[0];
    } else { // no "international" tempMatches, fallback to first el of unfiltered matches
      match = matches[0];
    }
  } else { // Single match
    match = matches[0];
  }
  return match;
}

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', consoleObj => console.log(consoleObj.text()));

  const response = await page.goto('https://cloud.google.com/vpc/docs/edge-locations')

  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`)
  }

  const data = await page.evaluate(() => {
    const cities = [];
    const rawCities = document.evaluate('//html/body/section/section/main/devsite-content/article/div[2]/ul[position() > 1 and position() < 9]/li', document);

    // First iterator
    let citiesIterator = rawCities.iterateNext();

    // Iterate over entries
    while (citiesIterator) {
      cities.push(citiesIterator.textContent); 
      citiesIterator = rawCities.iterateNext();
    }

    // US Countries
    const usStates = {"AL":"Alabama","AK":"Alaska","AZ":"Arizona","AR":"Arkansas","CA":"California","CO":"Colorado","CT":"Connecticut","DE":"Delaware","FL":"Florida","GA":"Georgia","HI":"Hawaii","ID":"Idaho","IL":"Illinois","IN":"Indiana","IA":"Iowa","KS":"Kansas","KY":"Kentucky","LA":"Louisiana","ME":"Maine","MD":"Maryland","MA":"Massachusetts","MI":"Michigan","MN":"Minnesota","MS":"Mississippi","MO":"Missouri","MT":"Montana","NE":"Nebraska","NV":"Nevada","NH":"New Hampshire","NJ":"New Jersey","NM":"New Mexico","NY":"New York","NC":"North Carolina","ND":"North Dakota","OH":"Ohio","OK":"Oklahoma","OR":"Oregon","PA":"Pennsylvania","RI":"Rhode Island","SC":"South Carolina","SD":"South Dakota","TN":"Tennessee","TX":"Texas","UT":"Utah","VT":"Vermont","VA":"Virginia","WA":"Washington","WV":"West Virginia","WI":"Wisconsin","WY":"Wyoming","AS":"American Samoa","DC":"District of Columbia","FM":"Federated States of Micronesia","GU":"Guam","MH":"Marshall Islands","MP":"Northern Mariana Islands","PW":"Palau","PR":"Puerto Rico","VI":"Virgin Islands"};
    const cityReplacements = {"Singapore": "Singapore, Singapore", "Zürich": "Zurich", "Frankfurt": "Frankfurt am Main", "Bogotá": "Bogota", "Saint Petersburg": "St. Petersburg", "Hong Kong SAR": "Hong Kong", "Delhi": "New Delhi", "Turin": "Torino"}
    const cleanedCities = cities.map((cityString) => {
      Object.getOwnPropertyNames(cityReplacements).forEach(replacement => {
        cityString = cityString.replace(replacement, cityReplacements[replacement]);
      })
        
      const temp = cityString.replace("Singapore", "Singapore, Singapore").split(', ');

      const c = {};
      const countRegex = /\((.*)\)/;
      let testResult;

      if (temp.length === 2) {
        c.city = temp[0];
        testResult = countRegex.exec(temp[1]) || [];
        if (testResult.length === 2) {
          c.country = temp[1].replace(` ${testResult[0]}`, '');
          c.count = parseInt(testResult[1]);
        } else {
          c.country = temp[1];
          c.count = 1;
        }
      } else if (temp.length === 3) {
        c.city = temp[0];
        c.state = usStates[temp[1]];
        c.country = "United States";
        testResult = countRegex.exec(temp[2]) || [];
        if (testResult.length === 2) {
          c.count = parseInt(testResult[1]);
        } else {
          c.count = 1;
        }
      } else {
        console.log("error " + city);
      }
      return c;
    });

    return cleanedCities;
  });

  await page.close();
  await browser.close();

  const withAirports = data.map((city) => {
    const location = {
      ...city
    };
    const airport = lookupAirport(utf8.encode(location.city));
    if (airportOverridesData.hasOwnProperty(location.city.toLowerCase())) {
      const overrideData = airportOverridesData[location.city.toLowerCase()];
      location.code = overrideData.code;
      location.countryCode = overrideData.countryCode;
      location.country = lookupCountry(overrideData.countryCode);
      location.latitude = overrideData.latitude;
      location.longitude = overrideData.longitude;
    } else if (airport) {
      location.code = airport.iata_code;
      location.countryCode = airport.iso_country;
      location.country = lookupCountry(airport.iso_country);
      const coordinate = airport.coordinates.split(', ');
      location.latitude = parseFloat(coordinate[1]);
      location.longitude = parseFloat(coordinate[0]);
    } else {
      // Run a second pass with all airports if not found before. Increases data quality
      const smallAirport = lookupAirport(utf8.encode(location.city), allAirportData);
      if (smallAirport) {
        location.code = smallAirport.iata_code;
        location.countryCode = smallAirport.iso_country;
        location.country = lookupCountry(smallAirport.iso_country);
        const coordinate = smallAirport.coordinates.split(', ');
        location.latitude = parseFloat(coordinate[1]);
        location.longitude = parseFloat(coordinate[0]);
      }
    }
    return location;
  });

  console.log(JSON.stringify(withAirports));

  writeJSON(withAirports);

  invalidCounter = 1;

  writeCSV(withAirports);
}

run();
