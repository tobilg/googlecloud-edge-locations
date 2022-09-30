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
const locationCount = el.getLocationCount(); // returns 61

// Get all edge locations
const locations = el.getLocations();

// Get PoP count
const popCount = el.getPoPCount() // returns 61
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
IAD,Ashburn,Virginia,United States,US,38.94449997,-77.45580292,1
ATL,Atlanta,Georgia,United States,US,33.6367,-84.428101,1
AUZ,Aurora,Illinois,United States,US,41.771944,-88.475556,1
AUS,Austin,Texas,United States,US,30.194499969482422,-97.6698989868164,1
BOS,Boston,Massachusetts,United States,US,42.36429977,-71.00520325,1
YYC,Calgary,,Canada,CA,51.113899231,-114.019996643,1
MDW,Chicago,Illinois,United States,US,41.785999,-87.752403,1
CMH,Columbus,Ohio,United States,US,39.998001,-82.891899,1
CBF,Council Bluffs,Iowa,United States,US,41.26,-95.758611,1
DEN,Denver,Colorado,United States,US,39.861698150635,-104.672996521,1
DAL,Dallas,Texas,United States,US,32.847099,-96.851799,1
HOU,Houston,Texas,United States,US,29.64539909,-95.27890015,1
MCI,Kansas City,Missouri,United States,US,39.2976,-94.713898,1
LAS,Las Vegas,Nevada,United States,US,36.08010101,-115.1520004,1
LAX,Los Angeles,California,United States,US,33.942501,-118.407997,1
MIA,Miami,Florida,United States,US,25.79319953918457,-80.29060363769531,1
MSP,Minneapolis,Minnesota,United States,US,44.882,-93.221802,1
YUL,Montreal,,Canada,CA,45.470556,-73.740833,1
JFK,New York,New York,United States,US,40.639801,-73.7789,1
PAO,Palo Alto,California,United States,US,37.461111,-122.115,1
PHL,Philadelphia,Pennsylvania,United States,US,39.87189865112305,-75.24109649658203,1
PHX,Phoenix,Arizona,United States,US,33.43429946899414,-112.01200103759766,1
PDX,Portland,Oregon,United States,US,45.58869934,-122.5979996,1
SLC,Salt Lake City,Utah,United States,US,40.78839874267578,-111.97799682617188,1
SAT,San Antonio,Texas,United States,US,29.533701,-98.469803,1
SJC,San Jose,California,United States,US,37.362598,-121.929001,1
SJC,Santa Clara,California,United States,US,37.3627777778,-121.9291666667,1
BFI,Seattle,Washington,United States,US,47.529998779296875,-122.302001953125,1
QRO,Querétaro,,Mexico,MX,20.6173,-100.185997,1
YYZ,Toronto,,Canada,CA,43.6772003174,-79.63059997559999,1
YVR,Vancouver,,Canada,CA,49.193901062,-123.183998108,1
BOG,Bogota,,Colombia,CO,4.70159,-74.1469,1
EZE,Buenos Aires,,Argentina,AR,-34.8222,-58.5358,1
GIG,Rio de Janeiro,,Brazil,BR,-22.8099994659,-43.2505569458,1
SCL,Santiago,,Chile,CL,-33.393001556396484,-70.78579711914062,1
GRU,São Paulo,,Brazil,BR,-23.435556411743164,-46.47305679321289,1
AMS,Amsterdam,,Netherlands,NL,52.308601,4.76389,1
BCN,Barcelona,,Spain,ES,41.2971,2.07846,1
SXF,Berlin,,Germany,DE,52.380001,13.5225,1
BUD,Budapest,,Hungary,HU,47.42976,19.261093,1
OTP,Bucharest,,Romania,RO,44.5711111,26.085,1
CPH,Copenhagen,,Denmark,DK,55.617900848389,12.656000137329,1
DUB,Dublin,,Ireland,IE,53.421299,-6.27007,1
DUS,Düsseldorf,,Germany,DE,51.289501,6.76678,1
FRA,Frankfurt am Main,,Germany,DE,50.033333,8.570556,1
GVA,Geneva,,Switzerland,CH,46.23809814453125,6.108950138092041,1
HAM,Hamburg,,Germany,DE,53.630401611328,9.9882297515869,1
HEL,Helsinki,,Finland,FI,60.317199707031,24.963300704956,1
KBP,Kiev,,Ukraine,UA,50.345001220703125,30.894699096679688,1
LIS,Lisbon,,Portugal,PT,38.7813,-9.13592,1
LTN,London,,United Kingdom,GB,51.874698638916016,-0.36833301186561584,1
MAD,Madrid,,Spain,ES,40.471926,-3.56264,1
MAN,Manchester,,United Kingdom,GB,53.35369873046875,-2.2749500274658203,1
MRS,Marseille,,France,FR,43.439271922,5.22142410278,1
MXP,Milan,,Italy,IT,45.6306,8.72811,1
MUC,Munich,,Germany,DE,48.353802,11.7861,1
ZIA,Moscow,,Russian Federation,RU,55.553299,38.150002,1
CDG,Paris,,France,FR,49.012798,2.55,1
PRG,Prague,,Czech Republic,CZ,50.1008,14.26,1
CIA,Rome,,Italy,IT,41.7994,12.5949,1
LED,St. Petersburg,,Russian Federation,RU,59.80030059814453,30.262500762939453,1
SOF,Sofia,,Bulgaria,BG,42.696693420410156,23.411436080932617,1
ARN,Stockholm,,Sweden,SE,59.651901245117,17.918600082397,1
VIE,Vienna,,Austria,AT,48.110298156738,16.569700241089,1
WMI,Warsaw,,Poland,PL,52.451099,20.6518,1
ZAG,Zagreb,,Croatia,HR,45.7429008484,16.0687999725,1
ZRH,Zurich,,Switzerland,CH,47.464699,8.54917,1
DXB,Dubai,,United Arab Emirates,AE,25.2527999878,55.3643989563,1
FJR,Fujairah,,United Arab Emirates,AE,25.112222,56.324167,1
MCT,Muscat,,Oman,OM,23.593299865722656,58.284400939941406,1
TLV,Tel Aviv,,Israel,IL,32.01139831542969,34.88669967651367,1
PUS,Busan,,Korea, Republic of,KR,35.1795005798,128.93800354,1
MAA,Chennai,,India,IN,12.990005493164062,80.16929626464844,1
DEL,New Delhi,,India,IN,28.5665,77.103104,1
HKG,Hong Kong,,Hong Kong,HK,22.308901,113.915001,1
null,Hsinchu,,Taiwan, Province of China,TW,24.816245,120.96203,1
HYD,Hyderabad,,India,IN,17.231318,78.429855,1
CGK,Jakarta,,Indonesia,ID,-6.1255698204,106.65599823,1
CCU,Kolkata,,India,IN,22.654699325561523,88.44670104980469,1
KUL,Kuala Lumpur,,Malaysia,MY,2.745579957962,101.70999908447,1
BOM,Mumbai,,India,IN,19.0886993408,72.8678970337,1
KIX,Osaka,,Japan,JP,34.42729949951172,135.24400329589844,1
ICN,Seoul,,Korea, Republic of,KR,37.46910095214844,126.45099639892578,1
SIN,Singapore,,Singapore,SG,1.35019,103.994003,1
TPE,Taipei,,Taiwan, Province of China,TW,25.0777,121.233002,1
NRT,Tokyo,,Japan,JP,35.764702,140.386002,1
AKL,Auckland,,New Zealand,NZ,-37.008098602299995,174.792007446,1
BNE,Brisbane,,Australia,AU,-27.384199142456055,153.11700439453125,1
CBR,Canberra,,Australia,AU,-35.30690002441406,149.19500732421875,1
MEL,Melbourne,,Australia,AU,-37.673302,144.843002,1
PER,Perth,,Australia,AU,-31.94029998779297,115.96700286865234,1
SYD,Sydney,,Australia,AU,-33.94609832763672,151.177001953125,1
JNB,Johannesburg,,South Africa,ZA,-26.1392,28.246,1
LOS,Lagos,,Nigeria,NG,6.5773701667785645,3.321160078048706,1
MBA,Mombasa,,Kenya,KE,-4.034830093383789,39.594200134277344,1
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
    "count": 1
  },
  "ATL": {
    "city": "Atlanta",
    "state": "Georgia",
    "country": "United States",
    "countryCode": "US",
    "latitude": 33.6367,
    "longitude": -84.428101,
    "count": 1
  },
  "AUZ": {
    "city": "Aurora",
    "state": "Illinois",
    "country": "United States",
    "countryCode": "US",
    "latitude": 41.771944,
    "longitude": -88.475556,
    "count": 1
  },
  "AUS": {
    "city": "Austin",
    "state": "Texas",
    "country": "United States",
    "countryCode": "US",
    "latitude": 30.194499969482422,
    "longitude": -97.6698989868164,
    "count": 1
  },
  "BOS": {
    "city": "Boston",
    "state": "Massachusetts",
    "country": "United States",
    "countryCode": "US",
    "latitude": 42.36429977,
    "longitude": -71.00520325,
    "count": 1
  },
  "YYC": {
    "city": "Calgary",
    "state": null,
    "country": "Canada",
    "countryCode": "CA",
    "latitude": 51.113899231,
    "longitude": -114.019996643,
    "count": 1
  },
  "MDW": {
    "city": "Chicago",
    "state": "Illinois",
    "country": "United States",
    "countryCode": "US",
    "latitude": 41.785999,
    "longitude": -87.752403,
    "count": 1
  },
  "CMH": {
    "city": "Columbus",
    "state": "Ohio",
    "country": "United States",
    "countryCode": "US",
    "latitude": 39.998001,
    "longitude": -82.891899,
    "count": 1
  },
  "CBF": {
    "city": "Council Bluffs",
    "state": "Iowa",
    "country": "United States",
    "countryCode": "US",
    "latitude": 41.26,
    "longitude": -95.758611,
    "count": 1
  },
  "DEN": {
    "city": "Denver",
    "state": "Colorado",
    "country": "United States",
    "countryCode": "US",
    "latitude": 39.861698150635,
    "longitude": -104.672996521,
    "count": 1
  },
  "DAL": {
    "city": "Dallas",
    "state": "Texas",
    "country": "United States",
    "countryCode": "US",
    "latitude": 32.847099,
    "longitude": -96.851799,
    "count": 1
  },
  "HOU": {
    "city": "Houston",
    "state": "Texas",
    "country": "United States",
    "countryCode": "US",
    "latitude": 29.64539909,
    "longitude": -95.27890015,
    "count": 1
  },
  "MCI": {
    "city": "Kansas City",
    "state": "Missouri",
    "country": "United States",
    "countryCode": "US",
    "latitude": 39.2976,
    "longitude": -94.713898,
    "count": 1
  },
  "LAS": {
    "city": "Las Vegas",
    "state": "Nevada",
    "country": "United States",
    "countryCode": "US",
    "latitude": 36.08010101,
    "longitude": -115.1520004,
    "count": 1
  },
  "LAX": {
    "city": "Los Angeles",
    "state": "California",
    "country": "United States",
    "countryCode": "US",
    "latitude": 33.942501,
    "longitude": -118.407997,
    "count": 1
  },
  "MIA": {
    "city": "Miami",
    "state": "Florida",
    "country": "United States",
    "countryCode": "US",
    "latitude": 25.79319953918457,
    "longitude": -80.29060363769531,
    "count": 1
  },
  "MSP": {
    "city": "Minneapolis",
    "state": "Minnesota",
    "country": "United States",
    "countryCode": "US",
    "latitude": 44.882,
    "longitude": -93.221802,
    "count": 1
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
    "count": 1
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
  "PHL": {
    "city": "Philadelphia",
    "state": "Pennsylvania",
    "country": "United States",
    "countryCode": "US",
    "latitude": 39.87189865112305,
    "longitude": -75.24109649658203,
    "count": 1
  },
  "PHX": {
    "city": "Phoenix",
    "state": "Arizona",
    "country": "United States",
    "countryCode": "US",
    "latitude": 33.43429946899414,
    "longitude": -112.01200103759766,
    "count": 1
  },
  "PDX": {
    "city": "Portland",
    "state": "Oregon",
    "country": "United States",
    "countryCode": "US",
    "latitude": 45.58869934,
    "longitude": -122.5979996,
    "count": 1
  },
  "SLC": {
    "city": "Salt Lake City",
    "state": "Utah",
    "country": "United States",
    "countryCode": "US",
    "latitude": 40.78839874267578,
    "longitude": -111.97799682617188,
    "count": 1
  },
  "SAT": {
    "city": "San Antonio",
    "state": "Texas",
    "country": "United States",
    "countryCode": "US",
    "latitude": 29.533701,
    "longitude": -98.469803,
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
    "count": 1
  },
  "QRO": {
    "city": "Querétaro",
    "state": null,
    "country": "Mexico",
    "countryCode": "MX",
    "latitude": 20.6173,
    "longitude": -100.185997,
    "count": 1
  },
  "YYZ": {
    "city": "Toronto",
    "state": null,
    "country": "Canada",
    "countryCode": "CA",
    "latitude": 43.6772003174,
    "longitude": -79.63059997559999,
    "count": 1
  },
  "YVR": {
    "city": "Vancouver",
    "state": null,
    "country": "Canada",
    "countryCode": "CA",
    "latitude": 49.193901062,
    "longitude": -123.183998108,
    "count": 1
  },
  "BOG": {
    "city": "Bogota",
    "state": null,
    "country": "Colombia",
    "countryCode": "CO",
    "latitude": 4.70159,
    "longitude": -74.1469,
    "count": 1
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
    "city": "São Paulo",
    "state": null,
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -23.435556411743164,
    "longitude": -46.47305679321289,
    "count": 1
  },
  "AMS": {
    "city": "Amsterdam",
    "state": null,
    "country": "Netherlands",
    "countryCode": "NL",
    "latitude": 52.308601,
    "longitude": 4.76389,
    "count": 1
  },
  "BCN": {
    "city": "Barcelona",
    "state": null,
    "country": "Spain",
    "countryCode": "ES",
    "latitude": 41.2971,
    "longitude": 2.07846,
    "count": 1
  },
  "SXF": {
    "city": "Berlin",
    "state": null,
    "country": "Germany",
    "countryCode": "DE",
    "latitude": 52.380001,
    "longitude": 13.5225,
    "count": 1
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
  "CPH": {
    "city": "Copenhagen",
    "state": null,
    "country": "Denmark",
    "countryCode": "DK",
    "latitude": 55.617900848389,
    "longitude": 12.656000137329,
    "count": 1
  },
  "DUB": {
    "city": "Dublin",
    "state": null,
    "country": "Ireland",
    "countryCode": "IE",
    "latitude": 53.421299,
    "longitude": -6.27007,
    "count": 1
  },
  "DUS": {
    "city": "Düsseldorf",
    "state": null,
    "country": "Germany",
    "countryCode": "DE",
    "latitude": 51.289501,
    "longitude": 6.76678,
    "count": 1
  },
  "FRA": {
    "city": "Frankfurt am Main",
    "state": null,
    "country": "Germany",
    "countryCode": "DE",
    "latitude": 50.033333,
    "longitude": 8.570556,
    "count": 1
  },
  "GVA": {
    "city": "Geneva",
    "state": null,
    "country": "Switzerland",
    "countryCode": "CH",
    "latitude": 46.23809814453125,
    "longitude": 6.108950138092041,
    "count": 1
  },
  "HAM": {
    "city": "Hamburg",
    "state": null,
    "country": "Germany",
    "countryCode": "DE",
    "latitude": 53.630401611328,
    "longitude": 9.9882297515869,
    "count": 1
  },
  "HEL": {
    "city": "Helsinki",
    "state": null,
    "country": "Finland",
    "countryCode": "FI",
    "latitude": 60.317199707031,
    "longitude": 24.963300704956,
    "count": 1
  },
  "KBP": {
    "city": "Kiev",
    "state": null,
    "country": "Ukraine",
    "countryCode": "UA",
    "latitude": 50.345001220703125,
    "longitude": 30.894699096679688,
    "count": 1
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
    "count": 1
  },
  "MAD": {
    "city": "Madrid",
    "state": null,
    "country": "Spain",
    "countryCode": "ES",
    "latitude": 40.471926,
    "longitude": -3.56264,
    "count": 1
  },
  "MAN": {
    "city": "Manchester",
    "state": null,
    "country": "United Kingdom",
    "countryCode": "GB",
    "latitude": 53.35369873046875,
    "longitude": -2.2749500274658203,
    "count": 1
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
    "count": 1
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
    "count": 1
  },
  "CDG": {
    "city": "Paris",
    "state": null,
    "country": "France",
    "countryCode": "FR",
    "latitude": 49.012798,
    "longitude": 2.55,
    "count": 1
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
    "count": 1
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
    "count": 1
  },
  "VIE": {
    "city": "Vienna",
    "state": null,
    "country": "Austria",
    "countryCode": "AT",
    "latitude": 48.110298156738,
    "longitude": 16.569700241089,
    "count": 1
  },
  "WMI": {
    "city": "Warsaw",
    "state": null,
    "country": "Poland",
    "countryCode": "PL",
    "latitude": 52.451099,
    "longitude": 20.6518,
    "count": 1
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
    "count": 1
  },
  "DXB": {
    "city": "Dubai",
    "state": null,
    "country": "United Arab Emirates",
    "countryCode": "AE",
    "latitude": 25.2527999878,
    "longitude": 55.3643989563,
    "count": 1
  },
  "FJR": {
    "city": "Fujairah",
    "state": null,
    "country": "United Arab Emirates",
    "countryCode": "AE",
    "latitude": 25.112222,
    "longitude": 56.324167,
    "count": 1
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
  "TLV": {
    "city": "Tel Aviv",
    "state": null,
    "country": "Israel",
    "countryCode": "IL",
    "latitude": 32.01139831542969,
    "longitude": 34.88669967651367,
    "count": 1
  },
  "PUS": {
    "city": "Busan",
    "state": null,
    "country": "Korea, Republic of",
    "countryCode": "KR",
    "latitude": 35.1795005798,
    "longitude": 128.93800354,
    "count": 1
  },
  "MAA": {
    "city": "Chennai",
    "state": null,
    "country": "India",
    "countryCode": "IN",
    "latitude": 12.990005493164062,
    "longitude": 80.16929626464844,
    "count": 1
  },
  "DEL": {
    "city": "New Delhi",
    "state": null,
    "country": "India",
    "countryCode": "IN",
    "latitude": 28.5665,
    "longitude": 77.103104,
    "count": 1
  },
  "HKG": {
    "city": "Hong Kong",
    "state": null,
    "country": "Hong Kong",
    "countryCode": "HK",
    "latitude": 22.308901,
    "longitude": 113.915001,
    "count": 1
  },
  "null": {
    "city": "Hsinchu",
    "state": null,
    "country": "Taiwan, Province of China",
    "countryCode": "TW",
    "latitude": 24.816245,
    "longitude": 120.96203,
    "count": 1
  },
  "HYD": {
    "city": "Hyderabad",
    "state": null,
    "country": "India",
    "countryCode": "IN",
    "latitude": 17.231318,
    "longitude": 78.429855,
    "count": 1
  },
  "CGK": {
    "city": "Jakarta",
    "state": null,
    "country": "Indonesia",
    "countryCode": "ID",
    "latitude": -6.1255698204,
    "longitude": 106.65599823,
    "count": 1
  },
  "CCU": {
    "city": "Kolkata",
    "state": null,
    "country": "India",
    "countryCode": "IN",
    "latitude": 22.654699325561523,
    "longitude": 88.44670104980469,
    "count": 1
  },
  "KUL": {
    "city": "Kuala Lumpur",
    "state": null,
    "country": "Malaysia",
    "countryCode": "MY",
    "latitude": 2.745579957962,
    "longitude": 101.70999908447,
    "count": 1
  },
  "BOM": {
    "city": "Mumbai",
    "state": null,
    "country": "India",
    "countryCode": "IN",
    "latitude": 19.0886993408,
    "longitude": 72.8678970337,
    "count": 1
  },
  "KIX": {
    "city": "Osaka",
    "state": null,
    "country": "Japan",
    "countryCode": "JP",
    "latitude": 34.42729949951172,
    "longitude": 135.24400329589844,
    "count": 1
  },
  "ICN": {
    "city": "Seoul",
    "state": null,
    "country": "Korea, Republic of",
    "countryCode": "KR",
    "latitude": 37.46910095214844,
    "longitude": 126.45099639892578,
    "count": 1
  },
  "SIN": {
    "city": "Singapore",
    "state": null,
    "country": "Singapore",
    "countryCode": "SG",
    "latitude": 1.35019,
    "longitude": 103.994003,
    "count": 1
  },
  "TPE": {
    "city": "Taipei",
    "state": null,
    "country": "Taiwan, Province of China",
    "countryCode": "TW",
    "latitude": 25.0777,
    "longitude": 121.233002,
    "count": 1
  },
  "NRT": {
    "city": "Tokyo",
    "state": null,
    "country": "Japan",
    "countryCode": "JP",
    "latitude": 35.764702,
    "longitude": 140.386002,
    "count": 1
  },
  "AKL": {
    "city": "Auckland",
    "state": null,
    "country": "New Zealand",
    "countryCode": "NZ",
    "latitude": -37.008098602299995,
    "longitude": 174.792007446,
    "count": 1
  },
  "BNE": {
    "city": "Brisbane",
    "state": null,
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -27.384199142456055,
    "longitude": 153.11700439453125,
    "count": 1
  },
  "CBR": {
    "city": "Canberra",
    "state": null,
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -35.30690002441406,
    "longitude": 149.19500732421875,
    "count": 1
  },
  "MEL": {
    "city": "Melbourne",
    "state": null,
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -37.673302,
    "longitude": 144.843002,
    "count": 1
  },
  "PER": {
    "city": "Perth",
    "state": null,
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -31.94029998779297,
    "longitude": 115.96700286865234,
    "count": 1
  },
  "SYD": {
    "city": "Sydney",
    "state": null,
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -33.94609832763672,
    "longitude": 151.177001953125,
    "count": 1
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
  "LOS": {
    "city": "Lagos",
    "state": null,
    "country": "Nigeria",
    "countryCode": "NG",
    "latitude": 6.5773701667785645,
    "longitude": 3.321160078048706,
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
  }
}
```

