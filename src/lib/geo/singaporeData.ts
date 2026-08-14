/**
 * Official Singapore Planning Areas & Geographic Data
 * Based on URA Master Plan planning areas & OneMap Singapore geography
 */

export interface SingaporePlanningArea {
  id: string;
  name: string;
  region: 'East' | 'North-East' | 'Central' | 'West' | 'North';
  centroid: { lat: number; lng: number };
  boundaryPolygon: [number, number][]; // [lat, lng] array
  subzones: string[];
  officialCode: string;
  // Official baseline properties
  baselineCondoMedianPrice: number; // 3BR condo benchmark
  baselineHdbMedianPrice: number; // 4-room HDB benchmark
  baselineAvgPsf: number;
  baselineRental3BR: number;
  supplyPipeline: 'Low' | 'Moderate' | 'High';
  quietnessRating: number; // 1 - 5
  // Real transport infrastructure
  mrtStations: Array<{ name: string; code: string; lat: number; lng: number; lines: string[] }>;
  primarySchools: Array<{ name: string; lat: number; lng: number; popular: boolean }>;
  parks: Array<{ name: string; lat: number; lng: number; size: 'regional' | 'neighborhood' }>;
  healthcare: Array<{ name: string; type: 'hospital' | 'polyclinic'; lat: number; lng: number }>;
  amenities: Array<{ name: string; type: 'mall' | 'community' | 'sports'; lat: number; lng: number }>;
}

export const SINGAPORE_PLANNING_AREAS: SingaporePlanningArea[] = [
  {
    id: 'tampines',
    name: 'Tampines',
    region: 'East',
    centroid: { lat: 1.3533, lng: 103.9452 },
    boundaryPolygon: [
      [1.372, 103.935], [1.378, 103.955], [1.365, 103.972], [1.342, 103.968],
      [1.332, 103.948], [1.338, 103.930], [1.355, 103.926], [1.372, 103.935]
    ],
    subzones: ['Tampines North', 'Tampines East', 'Tampines West', 'Tampines Changkat', 'Simei'],
    officialCode: 'TM',
    baselineCondoMedianPrice: 1630000,
    baselineHdbMedianPrice: 620000,
    baselineAvgPsf: 1380,
    baselineRental3BR: 4200,
    supplyPipeline: 'Moderate',
    quietnessRating: 4,
    mrtStations: [
      { name: 'Tampines', code: 'EW2 / DT32', lat: 1.3533, lng: 103.9452, lines: ['East-West', 'Downtown'] },
      { name: 'Tampines East', code: 'DT33', lat: 1.3562, lng: 103.9547, lines: ['Downtown'] },
      { name: 'Tampines West', code: 'DT31', lat: 1.3456, lng: 103.9385, lines: ['Downtown'] },
      { name: 'Simei', code: 'EW3', lat: 1.3431, lng: 103.9533, lines: ['East-West'] },
      { name: 'Upper Changi', code: 'DT34', lat: 1.3417, lng: 103.9614, lines: ['Downtown'] }
    ],
    primarySchools: [
      { name: "St. Hilda's Primary School", lat: 1.3495, lng: 103.9372, popular: true },
      { name: 'Poi Ching School', lat: 1.3578, lng: 103.9412, popular: true },
      { name: 'Gongshang Primary School', lat: 1.3572, lng: 103.9491, popular: true },
      { name: 'Tampines Primary School', lat: 1.3512, lng: 103.9489, popular: false },
      { name: 'Changkat Primary School', lat: 1.3402, lng: 103.9525, popular: false },
      { name: 'Chongzheng Primary School', lat: 1.3518, lng: 103.9511, popular: false },
      { name: 'Yumin Primary School', lat: 1.3515, lng: 103.9519, popular: false },
      { name: 'Junyuan Primary School', lat: 1.3475, lng: 103.9392, popular: false }
    ],
    parks: [
      { name: 'Tampines Eco Green', lat: 1.3602, lng: 103.9431, size: 'regional' },
      { name: 'Sun Plaza Park', lat: 1.3582, lng: 103.9465, size: 'neighborhood' },
      { name: 'Tampines Central Park', lat: 1.3538, lng: 103.9419, size: 'neighborhood' },
      { name: 'Tampines Boulevard Park', lat: 1.3645, lng: 103.9411, size: 'neighborhood' },
      { name: 'Tampines Quarry Park', lat: 1.3501, lng: 103.9312, size: 'regional' },
      { name: 'Festival Park Tampines', lat: 1.3521, lng: 103.9498, size: 'neighborhood' }
    ],
    healthcare: [
      { name: 'Tampines Polyclinic (SingHealth)', type: 'polyclinic', lat: 1.3562, lng: 103.9442 },
      { name: 'Changi General Hospital (Adjacent)', type: 'hospital', lat: 1.3408, lng: 103.9499 }
    ],
    amenities: [
      { name: 'Tampines Mall & Century Square', type: 'mall', lat: 1.3528, lng: 103.9445 },
      { name: 'Our Tampines Hub (OTH)', type: 'sports', lat: 1.3531, lng: 103.9398 },
      { name: 'Tampines 1', type: 'mall', lat: 1.3541, lng: 103.9452 }
    ]
  },
  {
    id: 'pasir-ris',
    name: 'Pasir Ris',
    region: 'East',
    centroid: { lat: 1.3721, lng: 103.9474 },
    boundaryPolygon: [
      [1.385, 103.935], [1.388, 103.960], [1.375, 103.970], [1.360, 103.955],
      [1.362, 103.932], [1.385, 103.935]
    ],
    subzones: ['Pasir Ris Central', 'Pasir Ris West', 'Pasir Ris East', 'Pasir Ris Drive'],
    officialCode: 'PR',
    baselineCondoMedianPrice: 1520000,
    baselineHdbMedianPrice: 590000,
    baselineAvgPsf: 1290,
    baselineRental3BR: 3900,
    supplyPipeline: 'High',
    quietnessRating: 5,
    mrtStations: [
      { name: 'Pasir Ris', code: 'EW1 / CP1', lat: 1.3721, lng: 103.9493, lines: ['East-West', 'Cross Island'] },
      { name: 'Pasir Ris East (Future CRL)', code: 'CR4', lat: 1.3688, lng: 103.9602, lines: ['Cross Island'] }
    ],
    primarySchools: [
      { name: 'Elias Park Primary School', lat: 1.3742, lng: 103.9421, popular: true },
      { name: 'Park View Primary School', lat: 1.3789, lng: 103.9378, popular: false },
      { name: 'Pasir Ris Primary School', lat: 1.3712, lng: 103.9582, popular: false },
      { name: 'Casuarina Primary School', lat: 1.3722, lng: 103.9542, popular: false },
      { name: 'White Sands Primary School', lat: 1.3652, lng: 103.9632, popular: false }
    ],
    parks: [
      { name: 'Pasir Ris Beach Park & Mangrove', lat: 1.3821, lng: 103.9482, size: 'regional' },
      { name: 'Pasir Ris Town Park & Fishing Pond', lat: 1.3715, lng: 103.9512, size: 'regional' }
    ],
    healthcare: [
      { name: 'Pasir Ris Polyclinic', type: 'polyclinic', lat: 1.3695, lng: 103.9588 }
    ],
    amenities: [
      { name: 'White Sands Shopping Mall', type: 'mall', lat: 1.3725, lng: 103.9498 },
      { name: 'Downtown East & Wild Wild Wet', type: 'community', lat: 1.3782, lng: 103.9552 }
    ]
  },
  {
    id: 'sengkang',
    name: 'Sengkang',
    region: 'North-East',
    centroid: { lat: 1.3916, lng: 103.8953 },
    boundaryPolygon: [
      [1.408, 103.882], [1.405, 103.910], [1.382, 103.912], [1.378, 103.880], [1.408, 103.882]
    ],
    subzones: ['Sengkang Town Centre', 'Compassvale', 'Rivervale', 'Anchorvale', 'Fernvale'],
    officialCode: 'SK',
    baselineCondoMedianPrice: 1580000,
    baselineHdbMedianPrice: 580000,
    baselineAvgPsf: 1410,
    baselineRental3BR: 4000,
    supplyPipeline: 'Low',
    quietnessRating: 4,
    mrtStations: [
      { name: 'Sengkang', code: 'NE16 / STC', lat: 1.3916, lng: 103.8953, lines: ['North-East', 'Sengkang LRT'] },
      { name: 'Buangkok', code: 'NE15', lat: 1.3828, lng: 103.8931, lines: ['North-East'] },
      { name: 'Thanggam (LRT)', code: 'SW4', lat: 1.3972, lng: 103.8752, lines: ['Sengkang LRT'] },
      { name: 'Fernvale (LRT)', code: 'SW5', lat: 1.3918, lng: 103.8763, lines: ['Sengkang LRT'] }
    ],
    primarySchools: [
      { name: 'Nan Chiau Primary School', lat: 1.3932, lng: 103.8905, popular: true },
      { name: 'Anchor Green Primary School', lat: 1.3905, lng: 103.8872, popular: false },
      { name: 'Compassvale Primary School', lat: 1.3948, lng: 103.9011, popular: false },
      { name: 'Rivervale Primary School', lat: 1.3931, lng: 103.9042, popular: false },
      { name: 'Springdale Primary School', lat: 1.3958, lng: 103.8892, popular: false },
      { name: 'Fern Green Primary School', lat: 1.3995, lng: 103.8778, popular: false }
    ],
    parks: [
      { name: 'Sengkang Riverside Park', lat: 1.3982, lng: 103.8845, size: 'regional' },
      { name: 'Sengkang Sculpture Park', lat: 1.3922, lng: 103.8962, size: 'neighborhood' }
    ],
    healthcare: [
      { name: 'Sengkang General Hospital & Community Hospital', type: 'hospital', lat: 1.3942, lng: 103.8935 },
      { name: 'Sengkang Polyclinic', type: 'polyclinic', lat: 1.3939, lng: 103.8941 }
    ],
    amenities: [
      { name: 'Compass One Mall', type: 'mall', lat: 1.3921, lng: 103.8955 },
      { name: 'Sengkang Grand Mall', type: 'mall', lat: 1.3829, lng: 103.8932 },
      { name: 'The Seletar Mall', type: 'mall', lat: 1.3915, lng: 103.8768 }
    ]
  },
  {
    id: 'hougang',
    name: 'Hougang',
    region: 'North-East',
    centroid: { lat: 1.3712, lng: 103.8925 },
    boundaryPolygon: [
      [1.385, 103.880], [1.380, 103.905], [1.355, 103.900], [1.358, 103.875], [1.385, 103.880]
    ],
    subzones: ['Hougang Central', 'Hougang East', 'Hougang West', 'Defu', 'Kangkar'],
    officialCode: 'HG',
    baselineCondoMedianPrice: 1650000,
    baselineHdbMedianPrice: 560000,
    baselineAvgPsf: 1450,
    baselineRental3BR: 4100,
    supplyPipeline: 'Moderate',
    quietnessRating: 4,
    mrtStations: [
      { name: 'Hougang', code: 'NE14 / CR8', lat: 1.3712, lng: 103.8925, lines: ['North-East', 'Cross Island'] },
      { name: 'Kovan', code: 'NE13', lat: 1.3601, lng: 103.8851, lines: ['North-East'] }
    ],
    primarySchools: [
      { name: 'Holy Innocents Primary School', lat: 1.3725, lng: 103.8942, popular: true },
      { name: 'Montfort Junior School', lat: 1.3705, lng: 103.8872, popular: false },
      { name: 'Hougang Primary School', lat: 1.3785, lng: 103.8812, popular: false },
      { name: 'Punggol Primary School', lat: 1.3778, lng: 103.8972, popular: false },
      { name: 'Xinmin Primary School', lat: 1.3718, lng: 103.8832, popular: true }
    ],
    parks: [
      { name: 'Punggol Park & Lake', lat: 1.3772, lng: 103.8988, size: 'regional' },
      { name: 'Hougang Neighbourhood Park', lat: 1.3732, lng: 103.8885, size: 'neighborhood' }
    ],
    healthcare: [
      { name: 'Hougang Polyclinic (NHGP)', type: 'polyclinic', lat: 1.3701, lng: 103.8895 }
    ],
    amenities: [
      { name: 'Hougang Mall', type: 'mall', lat: 1.3718, lng: 103.8931 },
      { name: 'Heartland Mall (Kovan)', type: 'mall', lat: 1.3605, lng: 103.8858 }
    ]
  },
  {
    id: 'jurong-east',
    name: 'Jurong East',
    region: 'West',
    centroid: { lat: 1.3329, lng: 103.7436 },
    boundaryPolygon: [
      [1.348, 103.730], [1.345, 103.760], [1.320, 103.755], [1.322, 103.725], [1.348, 103.730]
    ],
    subzones: ['Jurong Gateway', 'Toh Guan', 'Yuhua East', 'Yuhua West', 'Jurong Port'],
    officialCode: 'JE',
    baselineCondoMedianPrice: 1780000,
    baselineHdbMedianPrice: 595000,
    baselineAvgPsf: 1560,
    baselineRental3BR: 4500,
    supplyPipeline: 'Moderate',
    quietnessRating: 3,
    mrtStations: [
      { name: 'Jurong East', code: 'NS1 / EW24 / JRL', lat: 1.3329, lng: 103.7436, lines: ['North-South', 'East-West', 'Jurong Region'] },
      { name: 'Chinese Garden', code: 'EW25', lat: 1.3424, lng: 103.7326, lines: ['East-West'] }
    ],
    primarySchools: [
      { name: 'Rulang Primary School (Nearby)', lat: 1.3468, lng: 103.7185, popular: true },
      { name: 'Yuhua Primary School', lat: 1.3425, lng: 103.7412, popular: false },
      { name: 'Fuhua Primary School', lat: 1.3482, lng: 103.7382, popular: false }
    ],
    parks: [
      { name: 'Jurong Lake Gardens', lat: 1.3382, lng: 103.7295, size: 'regional' },
      { name: 'Chinese & Japanese Gardens', lat: 1.3395, lng: 103.7312, size: 'regional' }
    ],
    healthcare: [
      { name: 'Ng Teng Fong General Hospital', type: 'hospital', lat: 1.3338, lng: 103.7455 },
      { name: 'Jurong Community Hospital', type: 'hospital', lat: 1.3342, lng: 103.7461 },
      { name: 'Jurong Polyclinic', type: 'polyclinic', lat: 1.3489, lng: 103.7395 }
    ],
    amenities: [
      { name: 'JEM, Westgate & IMM Mega Malls', type: 'mall', lat: 1.3335, lng: 103.7431 }
    ]
  },
  {
    id: 'bedok',
    name: 'Bedok',
    region: 'East',
    centroid: { lat: 1.3236, lng: 103.9273 },
    boundaryPolygon: [
      [1.340, 103.910], [1.345, 103.945], [1.310, 103.940], [1.312, 103.905], [1.340, 103.910]
    ],
    subzones: ['Bedok Central', 'Bedok North', 'Bedok South', 'Bedok Reservoir', 'Frankel'],
    officialCode: 'BD',
    baselineCondoMedianPrice: 1720000,
    baselineHdbMedianPrice: 570000,
    baselineAvgPsf: 1490,
    baselineRental3BR: 4300,
    supplyPipeline: 'Low',
    quietnessRating: 4,
    mrtStations: [
      { name: 'Bedok', code: 'EW5', lat: 1.3236, lng: 103.9273, lines: ['East-West'] },
      { name: 'Bedok Reservoir', code: 'DT30', lat: 1.3361, lng: 103.9328, lines: ['Downtown'] },
      { name: 'Bedok North', code: 'DT29', lat: 1.3348, lng: 103.9179, lines: ['Downtown'] },
      { name: 'Tanah Merah', code: 'EW4', lat: 1.3272, lng: 103.9463, lines: ['East-West'] }
    ],
    primarySchools: [
      { name: 'Red Swastika School', lat: 1.3338, lng: 103.9352, popular: true },
      { name: 'Yu Neng Primary School', lat: 1.3342, lng: 103.9325, popular: true },
      { name: 'Bedok Green Primary School', lat: 1.3262, lng: 103.9382, popular: false },
      { name: 'Fengshan Primary School', lat: 1.3312, lng: 103.9405, popular: false }
    ],
    parks: [
      { name: 'Bedok Reservoir Park', lat: 1.3412, lng: 103.9315, size: 'regional' },
      { name: 'Bedok Town Park', lat: 1.3332, lng: 103.9212, size: 'regional' }
    ],
    healthcare: [
      { name: 'Bedok Polyclinic (Heartbeat@Bedok)', type: 'polyclinic', lat: 1.3268, lng: 103.9318 }
    ],
    amenities: [
      { name: 'Bedok Mall', type: 'mall', lat: 1.3242, lng: 103.9288 },
      { name: 'Heartbeat@Bedok (Integrated Hub)', type: 'community', lat: 1.3268, lng: 103.9318 }
    ]
  },
  {
    id: 'bishan',
    name: 'Bishan',
    region: 'Central',
    centroid: { lat: 1.3508, lng: 103.8485 },
    boundaryPolygon: [
      [1.365, 103.835], [1.362, 103.860], [1.340, 103.858], [1.342, 103.832], [1.365, 103.835]
    ],
    subzones: ['Bishan East', 'Marymount', 'Upper Thomson'],
    officialCode: 'BS',
    baselineCondoMedianPrice: 2250000,
    baselineHdbMedianPrice: 780000,
    baselineAvgPsf: 1980,
    baselineRental3BR: 5400,
    supplyPipeline: 'Low',
    quietnessRating: 4,
    mrtStations: [
      { name: 'Bishan', code: 'NS17 / CC15', lat: 1.3508, lng: 103.8485, lines: ['North-South', 'Circle'] },
      { name: 'Marymount', code: 'CC16', lat: 1.3491, lng: 103.8392, lines: ['Circle'] },
      { name: 'Upper Thomson', code: 'TE8', lat: 1.3542, lng: 103.8328, lines: ['Thomson-East Coast'] }
    ],
    primarySchools: [
      { name: 'Catholic High School (Primary)', lat: 1.3548, lng: 103.8445, popular: true },
      { name: "Ai Tong School", lat: 1.3605, lng: 103.8342, popular: true },
      { name: 'Guangyang Primary School', lat: 1.3485, lng: 103.8542, popular: false }
    ],
    parks: [
      { name: 'Bishan-Ang Mo Kio Park', lat: 1.3628, lng: 103.8452, size: 'regional' }
    ],
    healthcare: [
      { name: 'Mount Alvernia Hospital (Nearby)', type: 'hospital', lat: 1.3422, lng: 103.8385 },
      { name: 'Toa Payoh Polyclinic (Adjacent)', type: 'polyclinic', lat: 1.3345, lng: 103.8505 }
    ],
    amenities: [
      { name: 'Junction 8 Shopping Centre', type: 'mall', lat: 1.3505, lng: 103.8488 }
    ]
  },
  {
    id: 'punggol',
    name: 'Punggol',
    region: 'North-East',
    centroid: { lat: 1.4043, lng: 103.9022 },
    boundaryPolygon: [
      [1.425, 103.895], [1.420, 103.920], [1.398, 103.918], [1.395, 103.890], [1.425, 103.895]
    ],
    subzones: ['Waterway East', 'Waterway West', 'Punggol Town Centre', 'Punggol Point', 'Coney Island'],
    officialCode: 'PG',
    baselineCondoMedianPrice: 1610000,
    baselineHdbMedianPrice: 610000,
    baselineAvgPsf: 1440,
    baselineRental3BR: 4150,
    supplyPipeline: 'High',
    quietnessRating: 4,
    mrtStations: [
      { name: 'Punggol', code: 'NE17 / PTC / CP4', lat: 1.4043, lng: 103.9022, lines: ['North-East', 'Punggol LRT', 'Cross Island'] },
      { name: 'Punggol Coast (NE18)', code: 'NE18', lat: 1.4158, lng: 103.9085, lines: ['North-East'] }
    ],
    primarySchools: [
      { name: 'Mee Toh School', lat: 1.3995, lng: 103.9092, popular: true },
      { name: 'Punggol Green Primary School', lat: 1.4012, lng: 103.8998, popular: false },
      { name: 'Oasis Primary School', lat: 1.4048, lng: 103.9125, popular: false },
      { name: 'Horizon Primary School', lat: 1.3988, lng: 103.9142, popular: false }
    ],
    parks: [
      { name: 'Punggol Waterway Park', lat: 1.4095, lng: 103.9048, size: 'regional' },
      { name: 'Coney Island National Park', lat: 1.4128, lng: 103.9215, size: 'regional' }
    ],
    healthcare: [
      { name: 'Punggol Polyclinic (Oasis Terraces)', type: 'polyclinic', lat: 1.4042, lng: 103.9128 }
    ],
    amenities: [
      { name: 'Waterway Point Mall', type: 'mall', lat: 1.4065, lng: 103.9028 },
      { name: 'Oasis Terraces Integrated Hub', type: 'mall', lat: 1.4045, lng: 103.9129 }
    ]
  },
  {
    id: 'queenstown',
    name: 'Queenstown',
    region: 'Central',
    centroid: { lat: 1.2942, lng: 103.8061 },
    boundaryPolygon: [
      [1.310, 103.785], [1.312, 103.818], [1.280, 103.815], [1.282, 103.780], [1.310, 103.785]
    ],
    subzones: ['Commonwealth', 'Dawson', 'Margaret Drive', 'Kent Ridge', 'Ghim Moh'],
    officialCode: 'QT',
    baselineCondoMedianPrice: 2450000,
    baselineHdbMedianPrice: 850000,
    baselineAvgPsf: 2150,
    baselineRental3BR: 5800,
    supplyPipeline: 'Moderate',
    quietnessRating: 4,
    mrtStations: [
      { name: 'Queenstown', code: 'EW19', lat: 1.2942, lng: 103.8061, lines: ['East-West'] },
      { name: 'Commonwealth', code: 'EW20', lat: 1.3025, lng: 103.7983, lines: ['East-West'] },
      { name: 'one-north', code: 'CC23', lat: 1.2995, lng: 103.7872, lines: ['Circle'] },
      { name: 'Buona Vista', code: 'EW21 / CC22', lat: 1.3072, lng: 103.7901, lines: ['East-West', 'Circle'] }
    ],
    primarySchools: [
      { name: 'Queenstown Primary School', lat: 1.2975, lng: 103.8082, popular: false },
      { name: 'New Town Primary School', lat: 1.3022, lng: 103.8028, popular: false },
      { name: 'Fairfield Methodist School (Primary)', lat: 1.3005, lng: 103.7845, popular: true }
    ],
    parks: [
      { name: 'Rail Corridor (Central Section)', lat: 1.3015, lng: 103.7965, size: 'regional' },
      { name: 'Alexandra Canal Linear Park', lat: 1.2932, lng: 103.8125, size: 'neighborhood' }
    ],
    healthcare: [
      { name: 'National University Hospital (NUH)', type: 'hospital', lat: 1.2935, lng: 103.7832 },
      { name: 'Queenstown Polyclinic', type: 'polyclinic', lat: 1.2978, lng: 103.8045 }
    ],
    amenities: [
      { name: 'The Star Vista', type: 'mall', lat: 1.3068, lng: 103.7885 },
      { name: 'Anchorpoint & IKEA Alexandra', type: 'mall', lat: 1.2885, lng: 103.8048 }
    ]
  },
  {
    id: 'bukit-timah',
    name: 'Bukit Timah',
    region: 'Central',
    centroid: { lat: 1.3294, lng: 103.7982 },
    boundaryPolygon: [
      [1.350, 103.780], [1.352, 103.815], [1.315, 103.812], [1.312, 103.775], [1.350, 103.780]
    ],
    subzones: ['Coronation', 'Farrer Court', 'Sixth Avenue', 'Watten Estate', 'Hillcrest'],
    officialCode: 'BT',
    baselineCondoMedianPrice: 2850000,
    baselineHdbMedianPrice: 890000,
    baselineAvgPsf: 2450,
    baselineRental3BR: 6500,
    supplyPipeline: 'Low',
    quietnessRating: 5,
    mrtStations: [
      { name: 'Sixth Avenue', code: 'DT7', lat: 1.3308, lng: 103.7972, lines: ['Downtown'] },
      { name: 'King Albert Park', code: 'DT6 / CR15', lat: 1.3356, lng: 103.7834, lines: ['Downtown', 'Cross Island'] },
      { name: 'Tan Kah Kee', code: 'DT8', lat: 1.3259, lng: 103.8078, lines: ['Downtown'] }
    ],
    primarySchools: [
      { name: 'Nanyang Primary School', lat: 1.3208, lng: 103.8075, popular: true },
      { name: 'Raffles Girls Primary School', lat: 1.3292, lng: 103.8062, popular: true },
      { name: 'Methodist Girls School (Primary)', lat: 1.3342, lng: 103.7828, popular: true },
      { name: 'Pei Hwa Presbyterian Primary School', lat: 1.3385, lng: 103.7762, popular: true }
    ],
    parks: [
      { name: 'Bukit Timah Nature Reserve', lat: 1.3545, lng: 103.7765, size: 'regional' },
      { name: 'Singapore Botanic Gardens (UNESCO)', lat: 1.3138, lng: 103.8158, size: 'regional' }
    ],
    healthcare: [
      { name: 'Gleneagles Hospital (Nearby)', type: 'hospital', lat: 1.3068, lng: 103.8185 },
      { name: 'Bukit Timah Polyclinic (Approved)', type: 'polyclinic', lat: 1.3412, lng: 103.7745 }
    ],
    amenities: [
      { name: 'Bukit Timah Plaza & Beauty World', type: 'mall', lat: 1.3392, lng: 103.7768 }
    ]
  }
];

export const WORKPLACE_RESOLVER_DICTIONARY: Record<string, { name: string; lat: number; lng: number; planningArea: string }> = {
  'mbfc': { name: 'Marina Bay Financial Centre (MBFC)', lat: 1.2798, lng: 103.8542, planningArea: 'Downtown Core' },
  'marina bay': { name: 'Marina Bay Financial Centre', lat: 1.2825, lng: 103.8552, planningArea: 'Downtown Core' },
  'changi': { name: 'Changi Business Park / Airport', lat: 1.3348, lng: 103.9635, planningArea: 'Changi' },
  'changi business park': { name: 'Changi Business Park', lat: 1.3348, lng: 103.9635, planningArea: 'Changi' },
  'cbp': { name: 'Changi Business Park', lat: 1.3348, lng: 103.9635, planningArea: 'Changi' },
  'raffles place': { name: 'Raffles Place (CBD)', lat: 1.2839, lng: 103.8515, planningArea: 'Downtown Core' },
  'cbd': { name: 'Raffles Place / Marina Bay CBD', lat: 1.2839, lng: 103.8515, planningArea: 'Downtown Core' },
  'tanjong pagar': { name: 'Tanjong Pagar Business District', lat: 1.2764, lng: 103.8458, planningArea: 'Downtown Core' },
  'one-north': { name: 'one-north (Biopolis / Fusionopolis)', lat: 1.2995, lng: 103.7872, planningArea: 'Queenstown' },
  'mapletree business city': { name: 'Mapletree Business City (Pasir Panjang)', lat: 1.2762, lng: 103.7995, planningArea: 'Bukit Merah' },
  'mbc': { name: 'Mapletree Business City', lat: 1.2762, lng: 103.7995, planningArea: 'Bukit Merah' },
  'jurong innovation district': { name: 'Jurong Innovation District / Cleantech', lat: 1.3485, lng: 103.6895, planningArea: 'Jurong West' },
  'orchard': { name: 'Orchard Road Shopping & Commercial Belt', lat: 1.3048, lng: 103.8318, planningArea: 'Orchard' },
  'woodlands': { name: 'Woodlands Regional Centre', lat: 1.4368, lng: 103.7865, planningArea: 'Woodlands' },
  'tuas': { name: 'Tuas Industrial Hub', lat: 1.3215, lng: 103.6415, planningArea: 'Tuas' }
};
