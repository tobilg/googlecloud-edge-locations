# googlecloud-edge-locations
Approximation of Google Cloud edge locations, usable via a lookup mechanism.

## Contents

If you're here for the plain data, have a look at

* [List of Google Cloud Edge Locations (as CSV)](#csv-list) 
* [List of Google Cloud Edge Locations (as JSON)](#json-lookup)

## Installation
To install, you can do the following:

```bash
$ npm i googlecloud-edge-locations
```

## Usage

### Node

```javascript
const GoogleCloudEdgeLocations = require('googlecloud-edge-locations');
const el = new GoogleCloudEdgeLocations();
const location = el.lookup('IAD');

/* returns
{
  "city": "Ashburn",
  "state": "Virginia",
  "country": "United States",
  "countryCode": "US",
  "latitude": 38.94449997,
  "longitude": -77.45580292,
  "count": 2
}
*/

const invalid = el.lookup('FOO'); // returns false

// Get edge location count
const locationCount = el.getLocationCount(); // returns 60

// Get all edge locations
const locations = el.getLocations();

// Get PoP count
const popCount = el.getPoPCount() // returns 147
```

### Browser

This package is published as an UMD module, and can be used in the browser directly from [unpkg](https://unpkg.com/).

```html
<html>
    <head>
        <script src="https://unpkg.com/googlecloud-edge-locations"></script> 
    </head>
    <body>
        <script>
            // Using the global variable
            document.write('There are ' + googleCloudEdgeLocations.getLocationCount() + ' edge locations');
        </script>
    </body>
</html>
```

## Data generation

### TLDR

After installation of `jq` library, run `npm run generate`

### Explanation

To prepare the data regeneration, please run `npm run airports:download && npm run airports:filter && npm run countries:download`. This step requires an installation of [jq](https://github.com/stedolan/jq/wiki/Installation) on the machine where the commands are run.

The `generate.js` script will regenerate the `csv` and `json` versions of the googlecloud Edge Location list in the `dist` folder.

It does this by extracting the information from the [Google Cloud Edge Locations page](https://cloud.google.com/vpc/docs/edge-locations), cleaning and unifiying it, and merging it with [airport data](https://datahub.io/core/airport-codes/r/airport-codes.json) (the first three characters of the `location` field are IATA airport codes) to also get the latitude/longitude information.

Also, there are some manual overrides when it wasn't possible to automatically determine the correct IATA code from the city names.

## Data

This project is considered as in the `alpha` stage, so there's **no guarantee that the data is accurate**. Please feel free to test and give feedback either via creating an [issue](https://github.com/tobilg/googlecloud-edge-locations/issues) or a [pr](https://github.com/tobilg/googlecloud-edge-locations/pulls)

### CSV list

The CSV version of the data can be found at [dist/googlecloud-edge-locations.csv](dist/googlecloud-edge-locations.csv). The file is using `,` as field separator.

### CSV list

The CSV version of the data can be found at [dist/googlecloud-edge-locations.csv](dist/googlecloud-edge-locations.csv). The file is using `,` as field separator.

```csv
code,city,state,country,country_code,latitude,longitude,count
IAD,Ashburn,Virginia,United States,US,38.94449997,-77.45580292,2
ATL,Atlanta,Georgia,United States,US,33.6367,-84.428101,3
MDW,Chicago,Illinois,United States,US,41.785999,-87.752403,2
DEN,Denver,Colorado,United States,US,39.861698150635,-104.672996521,2
DAL,Dallas,Texas,United States,US,32.847099,-96.851799,3
LAX,Los Angeles,California,United States,US,33.942501,-118.407997,3
MIA,Miami,Florida,United States,US,25.79319953918457,-80.29060363769531,2
YUL,Montreal,,Canada,CA,45.470556,-73.740833,1
JFK,New York,New York,United States,US,40.639801,-73.7789,3
PAO,Palo Alto,California,United States,US,37.461111,-122.115,1
SJC,San Jose,California,United States,US,37.362598,-121.929001,1
SJC,Santa Clara,California,United States,US,37.3627777778,-121.9291666667,1
BFI,Seattle,Washington,United States,US,47.529998779296875,-122.302001953125,3
QRO,Quer??taro,,Mexico,MX,20.6173,-100.185997,2
YYZ,Toronto,,Canada,CA,43.6772003174,-79.63059997559999,2
BOG,Bogota,,Colombia,CO,4.70159,-74.1469,2
EZE,Buenos Aires,,Argentina,AR,-34.8222,-58.5358,1
GIG,Rio de Janeiro,,Brazil,BR,-22.8099994659,-43.2505569458,1
SCL,Santiago,,Chile,CL,-33.393001556396484,-70.78579711914062,1
GRU,S??o Paulo,,Brazil,BR,-23.435556411743164,-46.47305679321289,5
AMS,Amsterdam,,Netherlands,NL,52.308601,4.76389,5
BUD,Budapest,,Hungary,HU,47.42976,19.261093,1
OTP,Bucharest,,Romania,RO,44.5711111,26.085,1
DUB,Dublin,,Ireland,IE,53.421299,-6.27007,2
FRA,Frankfurt am Main,,Germany,DE,50.033333,8.570556,2
HAM,Hamburg,,Germany,DE,53.630401611328,9.9882297515869,3
KBP,Kiev,,Ukraine,UA,50.345001220703125,30.894699096679688,3
LIS,Lisbon,,Portugal,PT,38.7813,-9.13592,1
LTN,London,,United Kingdom,GB,51.874698638916016,-0.36833301186561584,7
MAD,Madrid,,Spain,ES,40.471926,-3.56264,2
MRS,Marseille,,France,FR,43.439271922,5.22142410278,1
MXP,Milan,,Italy,IT,45.6306,8.72811,2
MUC,Munich,,Germany,DE,48.353802,11.7861,1
ZIA,Moscow,,Russian Federation,RU,55.553299,38.150002,3
CDG,Paris,,France,FR,49.012798,2.55,8
PRG,Prague,,Czech Republic,CZ,50.1008,14.26,1
CIA,Rome,,Italy,IT,41.7994,12.5949,1
LED,St. Petersburg,,Russian Federation,RU,59.80030059814453,30.262500762939453,2
SOF,Sofia,,Bulgaria,BG,42.696693420410156,23.411436080932617,1
ARN,Stockholm,,Sweden,SE,59.651901245117,17.918600082397,3
WMI,Warsaw,,Poland,PL,52.451099,20.6518,2
ZAG,Zagreb,,Croatia,HR,45.7429008484,16.0687999725,1
ZRH,Zurich,,Switzerland,CH,47.464699,8.54917,4
FJR,Fujairah,,United Arab Emirates,AE,25.112222,56.324167,3
MCT,Muscat,,Oman,OM,23.593299865722656,58.284400939941406,1
MAA,Chennai,,India,IN,12.990005493164062,80.16929626464844,3
HKG,Hong Kong,,Hong Kong,HK,22.308901,113.915001,3
CGK,Jakarta,,Indonesia,ID,-6.1255698204,106.65599823,4
KUL,Kuala Lumpur,,Malaysia,MY,2.745579957962,101.70999908447,2
DEL,New Delhi,,India,IN,28.5665,77.103104,3
KIX,Osaka,,Japan,JP,34.42729949951172,135.24400329589844,2
BOM,Mumbai,,India,IN,19.0886993408,72.8678970337,2
ICN,Seoul,,Korea, Republic of,KR,37.46910095214844,126.45099639892578,4
SIN,Singapore,,Singapore,SG,1.35019,103.994003,3
TPE,Taipei,,Taiwan, Province of China,TW,25.0777,121.233002,4
NRT,Tokyo,,Japan,JP,35.764702,140.386002,7
SYD,Sydney,,Australia,AU,-33.94609832763672,151.177001953125,3
MEL,Melbourne,,Australia,AU,-37.673302,144.843002,2
JNB,Johannesburg,,South Africa,ZA,-26.1392,28.246,1
MBA,Mombasa,,Kenya,KE,-4.034830093383789,39.594200134277344,1
LOS,Lagos,,Nigeria,NG,6.5773701667785645,3.321160078048706,2
```

### JSON lookup

The JSON version of the data can be found at [dist/googlecloud-edge-locations.json](dist/googlecloud-edge-locations.json).

```javascript
{
  "IAD": {
    "city": "Ashburn",
    "state": "Virginia",
    "country": "United States",
    "countryCode": "US",
    "latitude": 38.94449997,
    "longitude": -77.45580292,
    "count": 2
  },
  "ATL": {
    "city": "Atlanta",
    "state": "Georgia",
    "country": "United States",
    "countryCode": "US",
    "latitude": 33.6367,
    "longitude": -84.428101,
    "count": 3
  },
  "MDW": {
    "city": "Chicago",
    "state": "Illinois",
    "country": "United States",
    "countryCode": "US",
    "latitude": 41.785999,
    "longitude": -87.752403,
    "count": 2
  },
  "DEN": {
    "city": "Denver",
    "state": "Colorado",
    "country": "United States",
    "countryCode": "US",
    "latitude": 39.861698150635,
    "longitude": -104.672996521,
    "count": 2
  },
  "DAL": {
    "city": "Dallas",
    "state": "Texas",
    "country": "United States",
    "countryCode": "US",
    "latitude": 32.847099,
    "longitude": -96.851799,
    "count": 3
  },
  "LAX": {
    "city": "Los Angeles",
    "state": "California",
    "country": "United States",
    "countryCode": "US",
    "latitude": 33.942501,
    "longitude": -118.407997,
    "count": 3
  },
  "MIA": {
    "city": "Miami",
    "state": "Florida",
    "country": "United States",
    "countryCode": "US",
    "latitude": 25.79319953918457,
    "longitude": -80.29060363769531,
    "count": 2
  },
  "YUL": {
    "city": "Montreal",
    "state": null,
    "country": "Canada",
    "countryCode": "CA",
    "latitude": 45.470556,
    "longitude": -73.740833,
    "count": 1
  },
  "JFK": {
    "city": "New York",
    "state": "New York",
    "country": "United States",
    "countryCode": "US",
    "latitude": 40.639801,
    "longitude": -73.7789,
    "count": 3
  },
  "PAO": {
    "city": "Palo Alto",
    "state": "California",
    "country": "United States",
    "countryCode": "US",
    "latitude": 37.461111,
    "longitude": -122.115,
    "count": 1
  },
  "SJC": {
    "city": "Santa Clara",
    "state": "California",
    "country": "United States",
    "countryCode": "US",
    "latitude": 37.3627777778,
    "longitude": -121.9291666667,
    "count": 1
  },
  "BFI": {
    "city": "Seattle",
    "state": "Washington",
    "country": "United States",
    "countryCode": "US",
    "latitude": 47.529998779296875,
    "longitude": -122.302001953125,
    "count": 3
  },
  "QRO": {
    "city": "Quer??taro",
    "state": null,
    "country": "Mexico",
    "countryCode": "MX",
    "latitude": 20.6173,
    "longitude": -100.185997,
    "count": 2
  },
  "YYZ": {
    "city": "Toronto",
    "state": null,
    "country": "Canada",
    "countryCode": "CA",
    "latitude": 43.6772003174,
    "longitude": -79.63059997559999,
    "count": 2
  },
  "BOG": {
    "city": "Bogota",
    "state": null,
    "country": "Colombia",
    "countryCode": "CO",
    "latitude": 4.70159,
    "longitude": -74.1469,
    "count": 2
  },
  "EZE": {
    "city": "Buenos Aires",
    "state": null,
    "country": "Argentina",
    "countryCode": "AR",
    "latitude": -34.8222,
    "longitude": -58.5358,
    "count": 1
  },
  "GIG": {
    "city": "Rio de Janeiro",
    "state": null,
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -22.8099994659,
    "longitude": -43.2505569458,
    "count": 1
  },
  "SCL": {
    "city": "Santiago",
    "state": null,
    "country": "Chile",
    "countryCode": "CL",
    "latitude": -33.393001556396484,
    "longitude": -70.78579711914062,
    "count": 1
  },
  "GRU": {
    "city": "S??o Paulo",
    "state": null,
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -23.435556411743164,
    "longitude": -46.47305679321289,
    "count": 5
  },
  "AMS": {
    "city": "Amsterdam",
    "state": null,
    "country": "Netherlands",
    "countryCode": "NL",
    "latitude": 52.308601,
    "longitude": 4.76389,
    "count": 5
  },
  "BUD": {
    "city": "Budapest",
    "state": null,
    "country": "Hungary",
    "countryCode": "HU",
    "latitude": 47.42976,
    "longitude": 19.261093,
    "count": 1
  },
  "OTP": {
    "city": "Bucharest",
    "state": null,
    "country": "Romania",
    "countryCode": "RO",
    "latitude": 44.5711111,
    "longitude": 26.085,
    "count": 1
  },
  "DUB": {
    "city": "Dublin",
    "state": null,
    "country": "Ireland",
    "countryCode": "IE",
    "latitude": 53.421299,
    "longitude": -6.27007,
    "count": 2
  },
  "FRA": {
    "city": "Frankfurt am Main",
    "state": null,
    "country": "Germany",
    "countryCode": "DE",
    "latitude": 50.033333,
    "longitude": 8.570556,
    "count": 2
  },
  "HAM": {
    "city": "Hamburg",
    "state": null,
    "country": "Germany",
    "countryCode": "DE",
    "latitude": 53.630401611328,
    "longitude": 9.9882297515869,
    "count": 3
  },
  "KBP": {
    "city": "Kiev",
    "state": null,
    "country": "Ukraine",
    "countryCode": "UA",
    "latitude": 50.345001220703125,
    "longitude": 30.894699096679688,
    "count": 3
  },
  "LIS": {
    "city": "Lisbon",
    "state": null,
    "country": "Portugal",
    "countryCode": "PT",
    "latitude": 38.7813,
    "longitude": -9.13592,
    "count": 1
  },
  "LTN": {
    "city": "London",
    "state": null,
    "country": "United Kingdom",
    "countryCode": "GB",
    "latitude": 51.874698638916016,
    "longitude": -0.36833301186561584,
    "count": 7
  },
  "MAD": {
    "city": "Madrid",
    "state": null,
    "country": "Spain",
    "countryCode": "ES",
    "latitude": 40.471926,
    "longitude": -3.56264,
    "count": 2
  },
  "MRS": {
    "city": "Marseille",
    "state": null,
    "country": "France",
    "countryCode": "FR",
    "latitude": 43.439271922,
    "longitude": 5.22142410278,
    "count": 1
  },
  "MXP": {
    "city": "Milan",
    "state": null,
    "country": "Italy",
    "countryCode": "IT",
    "latitude": 45.6306,
    "longitude": 8.72811,
    "count": 2
  },
  "MUC": {
    "city": "Munich",
    "state": null,
    "country": "Germany",
    "countryCode": "DE",
    "latitude": 48.353802,
    "longitude": 11.7861,
    "count": 1
  },
  "ZIA": {
    "city": "Moscow",
    "state": null,
    "country": "Russian Federation",
    "countryCode": "RU",
    "latitude": 55.553299,
    "longitude": 38.150002,
    "count": 3
  },
  "CDG": {
    "city": "Paris",
    "state": null,
    "country": "France",
    "countryCode": "FR",
    "latitude": 49.012798,
    "longitude": 2.55,
    "count": 8
  },
  "PRG": {
    "city": "Prague",
    "state": null,
    "country": "Czech Republic",
    "countryCode": "CZ",
    "latitude": 50.1008,
    "longitude": 14.26,
    "count": 1
  },
  "CIA": {
    "city": "Rome",
    "state": null,
    "country": "Italy",
    "countryCode": "IT",
    "latitude": 41.7994,
    "longitude": 12.5949,
    "count": 1
  },
  "LED": {
    "city": "St. Petersburg",
    "state": null,
    "country": "Russian Federation",
    "countryCode": "RU",
    "latitude": 59.80030059814453,
    "longitude": 30.262500762939453,
    "count": 2
  },
  "SOF": {
    "city": "Sofia",
    "state": null,
    "country": "Bulgaria",
    "countryCode": "BG",
    "latitude": 42.696693420410156,
    "longitude": 23.411436080932617,
    "count": 1
  },
  "ARN": {
    "city": "Stockholm",
    "state": null,
    "country": "Sweden",
    "countryCode": "SE",
    "latitude": 59.651901245117,
    "longitude": 17.918600082397,
    "count": 3
  },
  "WMI": {
    "city": "Warsaw",
    "state": null,
    "country": "Poland",
    "countryCode": "PL",
    "latitude": 52.451099,
    "longitude": 20.6518,
    "count": 2
  },
  "ZAG": {
    "city": "Zagreb",
    "state": null,
    "country": "Croatia",
    "countryCode": "HR",
    "latitude": 45.7429008484,
    "longitude": 16.0687999725,
    "count": 1
  },
  "ZRH": {
    "city": "Zurich",
    "state": null,
    "country": "Switzerland",
    "countryCode": "CH",
    "latitude": 47.464699,
    "longitude": 8.54917,
    "count": 4
  },
  "FJR": {
    "city": "Fujairah",
    "state": null,
    "country": "United Arab Emirates",
    "countryCode": "AE",
    "latitude": 25.112222,
    "longitude": 56.324167,
    "count": 3
  },
  "MCT": {
    "city": "Muscat",
    "state": null,
    "country": "Oman",
    "countryCode": "OM",
    "latitude": 23.593299865722656,
    "longitude": 58.284400939941406,
    "count": 1
  },
  "MAA": {
    "city": "Chennai",
    "state": null,
    "country": "India",
    "countryCode": "IN",
    "latitude": 12.990005493164062,
    "longitude": 80.16929626464844,
    "count": 3
  },
  "HKG": {
    "city": "Hong Kong",
    "state": null,
    "country": "Hong Kong",
    "countryCode": "HK",
    "latitude": 22.308901,
    "longitude": 113.915001,
    "count": 3
  },
  "CGK": {
    "city": "Jakarta",
    "state": null,
    "country": "Indonesia",
    "countryCode": "ID",
    "latitude": -6.1255698204,
    "longitude": 106.65599823,
    "count": 4
  },
  "KUL": {
    "city": "Kuala Lumpur",
    "state": null,
    "country": "Malaysia",
    "countryCode": "MY",
    "latitude": 2.745579957962,
    "longitude": 101.70999908447,
    "count": 2
  },
  "DEL": {
    "city": "New Delhi",
    "state": null,
    "country": "India",
    "countryCode": "IN",
    "latitude": 28.5665,
    "longitude": 77.103104,
    "count": 3
  },
  "KIX": {
    "city": "Osaka",
    "state": null,
    "country": "Japan",
    "countryCode": "JP",
    "latitude": 34.42729949951172,
    "longitude": 135.24400329589844,
    "count": 2
  },
  "BOM": {
    "city": "Mumbai",
    "state": null,
    "country": "India",
    "countryCode": "IN",
    "latitude": 19.0886993408,
    "longitude": 72.8678970337,
    "count": 2
  },
  "ICN": {
    "city": "Seoul",
    "state": null,
    "country": "Korea, Republic of",
    "countryCode": "KR",
    "latitude": 37.46910095214844,
    "longitude": 126.45099639892578,
    "count": 4
  },
  "SIN": {
    "city": "Singapore",
    "state": null,
    "country": "Singapore",
    "countryCode": "SG",
    "latitude": 1.35019,
    "longitude": 103.994003,
    "count": 3
  },
  "TPE": {
    "city": "Taipei",
    "state": null,
    "country": "Taiwan, Province of China",
    "countryCode": "TW",
    "latitude": 25.0777,
    "longitude": 121.233002,
    "count": 4
  },
  "NRT": {
    "city": "Tokyo",
    "state": null,
    "country": "Japan",
    "countryCode": "JP",
    "latitude": 35.764702,
    "longitude": 140.386002,
    "count": 7
  },
  "SYD": {
    "city": "Sydney",
    "state": null,
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -33.94609832763672,
    "longitude": 151.177001953125,
    "count": 3
  },
  "MEL": {
    "city": "Melbourne",
    "state": null,
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -37.673302,
    "longitude": 144.843002,
    "count": 2
  },
  "JNB": {
    "city": "Johannesburg",
    "state": null,
    "country": "South Africa",
    "countryCode": "ZA",
    "latitude": -26.1392,
    "longitude": 28.246,
    "count": 1
  },
  "MBA": {
    "city": "Mombasa",
    "state": null,
    "country": "Kenya",
    "countryCode": "KE",
    "latitude": -4.034830093383789,
    "longitude": 39.594200134277344,
    "count": 1
  },
  "LOS": {
    "city": "Lagos",
    "state": null,
    "country": "Nigeria",
    "countryCode": "NG",
    "latitude": 6.5773701667785645,
    "longitude": 3.321160078048706,
    "count": 2
  }
}
```

