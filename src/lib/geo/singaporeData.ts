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
  },
  {
    id: 'clementi',
    name: 'Clementi',
    region: 'West',
    centroid: { lat: 1.3162, lng: 103.7649 },
    boundaryPolygon: [
      [1.335, 103.750], [1.332, 103.780], [1.295, 103.775], [1.300, 103.748], [1.335, 103.750]
    ],
    subzones: ['Clementi Central', 'Clementi North', 'Clementi West', 'Sunset Way', 'Panda'],
    officialCode: 'CL',
    baselineCondoMedianPrice: 1750000,
    baselineHdbMedianPrice: 680000,
    baselineAvgPsf: 1680,
    baselineRental3BR: 4600,
    supplyPipeline: 'Low',
    quietnessRating: 4,
    mrtStations: [
      { name: 'Clementi', code: 'EW23 / CR17', lat: 1.3152, lng: 103.7652, lines: ['East-West', 'Cross Island'] },
      { name: 'Dover', code: 'EW22', lat: 1.3114, lng: 103.7786, lines: ['East-West'] }
    ],
    primarySchools: [
      { name: 'Nan Hua Primary School', lat: 1.3208, lng: 103.7678, popular: true },
      { name: 'Pei Tong Primary School', lat: 1.3168, lng: 103.7695, popular: false },
      { name: 'Clementi Primary School', lat: 1.3155, lng: 103.7608, popular: false },
      { name: 'Qifa Primary School', lat: 1.3132, lng: 103.7585, popular: false }
    ],
    parks: [
      { name: 'Clementi Woods Park', lat: 1.3025, lng: 103.7682, size: 'regional' },
      { name: 'West Coast Park (Nearby)', lat: 1.2965, lng: 103.7645, size: 'regional' },
      { name: 'Sunset Way Park', lat: 1.3255, lng: 103.7725, size: 'neighborhood' }
    ],
    healthcare: [
      { name: 'Clementi Polyclinic (NUP)', type: 'polyclinic', lat: 1.3148, lng: 103.7641 },
      { name: 'National University Hospital (Adjacent)', type: 'hospital', lat: 1.2935, lng: 103.7832 }
    ],
    amenities: [
      { name: 'The Clementi Mall & 321 Clementi', type: 'mall', lat: 1.3151, lng: 103.7651 },
      { name: 'Clementi Sports & Swimming Complex', type: 'sports', lat: 1.3105, lng: 103.7648 }
    ]
  },
  {
    id: 'jurong-west',
    name: 'Jurong West',
    region: 'West',
    centroid: { lat: 1.3404, lng: 103.7090 },
    boundaryPolygon: [
      [1.360, 103.685], [1.358, 103.725], [1.325, 103.720], [1.328, 103.680], [1.360, 103.685]
    ],
    subzones: ['Boon Lay', 'Pioneer', 'Taman Jurong', 'Hong Kah', 'Gek Poh'],
    officialCode: 'JW',
    baselineCondoMedianPrice: 1450000,
    baselineHdbMedianPrice: 510000,
    baselineAvgPsf: 1350,
    baselineRental3BR: 3900,
    supplyPipeline: 'High',
    quietnessRating: 4,
    mrtStations: [
      { name: 'Boon Lay', code: 'EW27 / JS8', lat: 1.3385, lng: 103.7061, lines: ['East-West', 'Jurong Region'] },
      { name: 'Pioneer', code: 'EW28', lat: 1.3376, lng: 103.6973, lines: ['East-West'] },
      { name: 'Lakeside', code: 'EW26', lat: 1.3442, lng: 103.7210, lines: ['East-West'] }
    ],
    primarySchools: [
      { name: 'Rulang Primary School', lat: 1.3468, lng: 103.7185, popular: true },
      { name: 'Jurong West Primary School', lat: 1.3412, lng: 103.7028, popular: false },
      { name: 'Frontier Primary School', lat: 1.3365, lng: 103.7042, popular: false },
      { name: 'West Grove Primary School', lat: 1.3435, lng: 103.7005, popular: false }
    ],
    parks: [
      { name: 'Jurong Lake Gardens (West Side)', lat: 1.3382, lng: 103.7255, size: 'regional' },
      { name: 'Jurong Central Park', lat: 1.3392, lng: 103.7095, size: 'regional' }
    ],
    healthcare: [
      { name: 'Pioneer Polyclinic', type: 'polyclinic', lat: 1.3388, lng: 103.6995 },
      { name: 'Jurong Polyclinic', type: 'polyclinic', lat: 1.3489, lng: 103.7395 }
    ],
    amenities: [
      { name: 'Jurong Point Mega Mall', type: 'mall', lat: 1.3402, lng: 103.7065 },
      { name: 'Gek Poh Shopping Centre & Pioneer Mall', type: 'mall', lat: 1.3492, lng: 103.6982 }
    ]
  },
  {
    id: 'bukit-batok',
    name: 'Bukit Batok',
    region: 'West',
    centroid: { lat: 1.3590, lng: 103.7518 },
    boundaryPolygon: [
      [1.375, 103.735], [1.372, 103.768], [1.340, 103.765], [1.342, 103.730], [1.375, 103.735]
    ],
    subzones: ['Bukit Batok Central', 'Bukit Batok East', 'Bukit Batok West', 'Guilin', 'Brickworks'],
    officialCode: 'BB',
    baselineCondoMedianPrice: 1520000,
    baselineHdbMedianPrice: 530000,
    baselineAvgPsf: 1420,
    baselineRental3BR: 4000,
    supplyPipeline: 'Moderate',
    quietnessRating: 4,
    mrtStations: [
      { name: 'Bukit Batok', code: 'NS2', lat: 1.3490, lng: 103.7496, lines: ['North-South'] },
      { name: 'Bukit Gombak', code: 'NS3', lat: 1.3587, lng: 103.7518, lines: ['North-South'] }
    ],
    primarySchools: [
      { name: 'Princess Elizabeth Primary School', lat: 1.3502, lng: 103.7432, popular: true },
      { name: 'Bukit View Primary School', lat: 1.3458, lng: 103.7578, popular: false },
      { name: 'Dazhong Primary School', lat: 1.3615, lng: 103.7482, popular: false },
      { name: 'Lianhua Primary School', lat: 1.3562, lng: 103.7551, popular: false }
    ],
    parks: [
      { name: 'Bukit Batok Nature Park', lat: 1.3515, lng: 103.7635, size: 'regional' },
      { name: 'Little Guilin (Bukit Batok Town Park)', lat: 1.3575, lng: 103.7552, size: 'regional' }
    ],
    healthcare: [
      { name: 'Bukit Batok Polyclinic', type: 'polyclinic', lat: 1.3508, lng: 103.7492 }
    ],
    amenities: [
      { name: 'West Mall Shopping Centre', type: 'mall', lat: 1.3501, lng: 103.7498 },
      { name: 'Le Quest Mall', type: 'mall', lat: 1.3585, lng: 103.7412 }
    ]
  },
  {
    id: 'bukit-panjang',
    name: 'Bukit Panjang',
    region: 'West',
    centroid: { lat: 1.3780, lng: 103.7695 },
    boundaryPolygon: [
      [1.395, 103.755], [1.392, 103.785], [1.360, 103.780], [1.362, 103.750], [1.395, 103.755]
    ],
    subzones: ['Bukit Panjang Ring', 'Fajar', 'Senja', 'Segar', 'Dairy Farm'],
    officialCode: 'BP',
    baselineCondoMedianPrice: 1480000,
    baselineHdbMedianPrice: 520000,
    baselineAvgPsf: 1390,
    baselineRental3BR: 3950,
    supplyPipeline: 'Moderate',
    quietnessRating: 4,
    mrtStations: [
      { name: 'Bukit Panjang', code: 'DT1 / BP6', lat: 1.3780, lng: 103.7615, lines: ['Downtown', 'Bukit Panjang LRT'] },
      { name: 'Cashew', code: 'DT2', lat: 1.3695, lng: 103.7645, lines: ['Downtown'] },
      { name: 'Hillview', code: 'DT3', lat: 1.3625, lng: 103.7675, lines: ['Downtown'] }
    ],
    primarySchools: [
      { name: 'Bukit Panjang Primary School', lat: 1.3735, lng: 103.7692, popular: true },
      { name: 'CHIS Our Lady Queen of Peace', lat: 1.3668, lng: 103.7682, popular: true },
      { name: 'Beacon Primary School', lat: 1.3835, lng: 103.7712, popular: false },
      { name: 'Zhenghua Primary School', lat: 1.3792, lng: 103.7675, popular: false }
    ],
    parks: [
      { name: 'Chestnut Nature Park', lat: 1.3745, lng: 103.7785, size: 'regional' },
      { name: 'Dairy Farm Nature Park', lat: 1.3645, lng: 103.7765, size: 'regional' },
      { name: 'Pang Sua Pond & Park', lat: 1.3812, lng: 103.7635, size: 'neighborhood' }
    ],
    healthcare: [
      { name: 'Bukit Panjang Polyclinic (Senja)', type: 'polyclinic', lat: 1.3842, lng: 103.7628 }
    ],
    amenities: [
      { name: 'Hillion Mall & Bukit Panjang Plaza', type: 'mall', lat: 1.3782, lng: 103.7625 },
      { name: 'Junction 10', type: 'mall', lat: 1.3802, lng: 103.7595 }
    ]
  },
  {
    id: 'choa-chu-kang',
    name: 'Choa Chu Kang',
    region: 'West',
    centroid: { lat: 1.3840, lng: 103.7470 },
    boundaryPolygon: [
      [1.405, 103.730], [1.400, 103.760], [1.370, 103.755], [1.372, 103.725], [1.405, 103.730]
    ],
    subzones: ['Choa Chu Kang Central', 'Yew Tee', 'Teck Whye', 'Keat Hong', 'Peng Siang'],
    officialCode: 'CK',
    baselineCondoMedianPrice: 1420000,
    baselineHdbMedianPrice: 505000,
    baselineAvgPsf: 1320,
    baselineRental3BR: 3850,
    supplyPipeline: 'Moderate',
    quietnessRating: 4,
    mrtStations: [
      { name: 'Choa Chu Kang', code: 'NS4 / JS1 / BP1', lat: 1.3853, lng: 103.7443, lines: ['North-South', 'Jurong Region', 'Bukit Panjang LRT'] },
      { name: 'Yew Tee', code: 'NS5', lat: 1.3972, lng: 103.7475, lines: ['North-South'] }
    ],
    primarySchools: [
      { name: 'South View Primary School', lat: 1.3815, lng: 103.7468, popular: true },
      { name: 'Choa Chu Kang Primary School', lat: 1.3828, lng: 103.7412, popular: false },
      { name: 'De La Salle School', lat: 1.3965, lng: 103.7492, popular: true },
      { name: 'Kranji Primary School', lat: 1.3992, lng: 103.7445, popular: false }
    ],
    parks: [
      { name: 'Choa Chu Kang Park', lat: 1.3878, lng: 103.7472, size: 'regional' },
      { name: 'Keat Hong Park', lat: 1.3782, lng: 103.7485, size: 'neighborhood' }
    ],
    healthcare: [
      { name: 'Choa Chu Kang Polyclinic (CCK Central)', type: 'polyclinic', lat: 1.3855, lng: 103.7462 }
    ],
    amenities: [
      { name: 'Lot One Shoppers Mall', type: 'mall', lat: 1.3851, lng: 103.7448 },
      { name: 'Yew Tee Point & Yew Tee Square', type: 'mall', lat: 1.3970, lng: 103.7472 }
    ]
  },
  {
    id: 'woodlands',
    name: 'Woodlands',
    region: 'North',
    centroid: { lat: 1.4382, lng: 103.7890 },
    boundaryPolygon: [
      [1.455, 103.765], [1.450, 103.810], [1.415, 103.805], [1.418, 103.760], [1.455, 103.765]
    ],
    subzones: ['Woodlands Regional Centre', 'Woodlands East', 'Woodlands South', 'Admiralty', 'Innova'],
    officialCode: 'WD',
    baselineCondoMedianPrice: 1390000,
    baselineHdbMedianPrice: 495000,
    baselineAvgPsf: 1290,
    baselineRental3BR: 3800,
    supplyPipeline: 'High',
    quietnessRating: 4,
    mrtStations: [
      { name: 'Woodlands', code: 'NS9 / TE2', lat: 1.4368, lng: 103.7865, lines: ['North-South', 'Thomson-East Coast'] },
      { name: 'Woodlands North', code: 'TE1 / RTS', lat: 1.4485, lng: 103.7852, lines: ['Thomson-East Coast'] },
      { name: 'Woodlands South', code: 'TE3', lat: 1.4275, lng: 103.7932, lines: ['Thomson-East Coast'] },
      { name: 'Admiralty', code: 'NS10', lat: 1.4405, lng: 103.8009, lines: ['North-South'] }
    ],
    primarySchools: [
      { name: 'Innova Primary School', lat: 1.4305, lng: 103.7895, popular: false },
      { name: 'Si Ling Primary School', lat: 1.4325, lng: 103.7812, popular: false },
      { name: 'Woodlands Primary School', lat: 1.4365, lng: 103.7925, popular: false },
      { name: 'Greenwood Primary School', lat: 1.4402, lng: 103.8045, popular: false }
    ],
    parks: [
      { name: 'Admiralty Park & Mangrove', lat: 1.4465, lng: 103.7825, size: 'regional' },
      { name: 'Woodlands Waterfront Park', lat: 1.4542, lng: 103.7815, size: 'regional' }
    ],
    healthcare: [
      { name: 'Woodlands Health Campus (Hospital)', type: 'hospital', lat: 1.4265, lng: 103.7945 },
      { name: 'Woodlands Polyclinic', type: 'polyclinic', lat: 1.4345, lng: 103.7885 }
    ],
    amenities: [
      { name: 'Causeway Point Regional Mall', type: 'mall', lat: 1.4358, lng: 103.7858 },
      { name: 'Woods Square Commercial Hub', type: 'mall', lat: 1.4372, lng: 103.7875 }
    ]
  },
  {
    id: 'yishun',
    name: 'Yishun',
    region: 'North',
    centroid: { lat: 1.4304, lng: 103.8354 },
    boundaryPolygon: [
      [1.448, 103.820], [1.445, 103.855], [1.410, 103.850], [1.412, 103.815], [1.448, 103.820]
    ],
    subzones: ['Yishun Central', 'Yishun East', 'Yishun South', 'Khatib', 'Lower Seletar'],
    officialCode: 'YS',
    baselineCondoMedianPrice: 1410000,
    baselineHdbMedianPrice: 485000,
    baselineAvgPsf: 1310,
    baselineRental3BR: 3800,
    supplyPipeline: 'Moderate',
    quietnessRating: 4,
    mrtStations: [
      { name: 'Yishun', code: 'NS13', lat: 1.4295, lng: 103.8352, lines: ['North-South'] },
      { name: 'Khatib', code: 'NS14', lat: 1.4172, lng: 103.8329, lines: ['North-South'] },
      { name: 'Springleaf', code: 'TE4', lat: 1.3982, lng: 103.8178, lines: ['Thomson-East Coast'] }
    ],
    primarySchools: [
      { name: 'Chongfu School', lat: 1.4385, lng: 103.8388, popular: true },
      { name: 'Northland Primary School', lat: 1.4215, lng: 103.8415, popular: true },
      { name: 'Ahmad Ibrahim Primary School', lat: 1.4335, lng: 103.8325, popular: false },
      { name: 'Jiemin Primary School', lat: 1.4312, lng: 103.8295, popular: false }
    ],
    parks: [
      { name: 'Lower Seletar Reservoir Park', lat: 1.4125, lng: 103.8355, size: 'regional' },
      { name: 'Yishun Pond Park', lat: 1.4275, lng: 103.8385, size: 'neighborhood' }
    ],
    healthcare: [
      { name: 'Khoo Teck Puat Hospital (KTPH)', type: 'hospital', lat: 1.4245, lng: 103.8382 },
      { name: 'Yishun Community Hospital', type: 'hospital', lat: 1.4238, lng: 103.8391 },
      { name: 'Yishun Polyclinic', type: 'polyclinic', lat: 1.4312, lng: 103.8378 }
    ],
    amenities: [
      { name: 'Northpoint City (Mega Mall)', type: 'mall', lat: 1.4292, lng: 103.8358 },
      { name: 'Wisteria Mall & Junction 9', type: 'mall', lat: 1.4225, lng: 103.8435 }
    ]
  },
  {
    id: 'ang-mo-kio',
    name: 'Ang Mo Kio',
    region: 'North-East',
    centroid: { lat: 1.3691, lng: 103.8454 },
    boundaryPolygon: [
      [1.385, 103.830], [1.382, 103.865], [1.355, 103.860], [1.358, 103.825], [1.385, 103.830]
    ],
    subzones: ['Ang Mo Kio Town Centre', 'Cheng San', 'Chong Boon', 'Kebun Baru', 'Yio Chu Kang'],
    officialCode: 'AM',
    baselineCondoMedianPrice: 1720000,
    baselineHdbMedianPrice: 580000,
    baselineAvgPsf: 1540,
    baselineRental3BR: 4300,
    supplyPipeline: 'Moderate',
    quietnessRating: 4,
    mrtStations: [
      { name: 'Ang Mo Kio', code: 'NS16 / CR11', lat: 1.3699, lng: 103.8496, lines: ['North-South', 'Cross Island'] },
      { name: 'Yio Chu Kang', code: 'NS15', lat: 1.3818, lng: 103.8449, lines: ['North-South'] },
      { name: 'Mayflower', code: 'TE6', lat: 1.3715, lng: 103.8365, lines: ['Thomson-East Coast'] },
      { name: 'Lentor', code: 'TE5', lat: 1.3855, lng: 103.8358, lines: ['Thomson-East Coast'] }
    ],
    primarySchools: [
      { name: 'CHIJ St. Nicholas Girls Primary', lat: 1.3742, lng: 103.8345, popular: true },
      { name: 'Ai Tong School (Nearby)', lat: 1.3605, lng: 103.8342, popular: true },
      { name: 'Mayflower Primary School', lat: 1.3672, lng: 103.8415, popular: false },
      { name: 'Jing Shan Primary School', lat: 1.3668, lng: 103.8545, popular: false }
    ],
    parks: [
      { name: 'Bishan-Ang Mo Kio Park (North Side)', lat: 1.3645, lng: 103.8455, size: 'regional' },
      { name: 'Ang Mo Kio Town Garden West', lat: 1.3725, lng: 103.8445, size: 'regional' }
    ],
    healthcare: [
      { name: 'Ang Mo Kio Polyclinic (NHGP)', type: 'polyclinic', lat: 1.3692, lng: 103.8475 }
    ],
    amenities: [
      { name: 'AMK Hub Shopping Mall', type: 'mall', lat: 1.3695, lng: 103.8488 },
      { name: 'Broadway Plaza & Jubilee Square', type: 'mall', lat: 1.3712, lng: 103.8475 }
    ]
  },
  {
    id: 'toa-payoh',
    name: 'Toa Payoh',
    region: 'Central',
    centroid: { lat: 1.3343, lng: 103.8524 },
    boundaryPolygon: [
      [1.350, 103.840], [1.348, 103.870], [1.320, 103.865], [1.322, 103.835], [1.350, 103.840]
    ],
    subzones: ['Toa Payoh Central', 'Toa Payoh East', 'Toa Payoh West', 'Potong Pasir', 'Boon Teck'],
    officialCode: 'TP',
    baselineCondoMedianPrice: 2100000,
    baselineHdbMedianPrice: 650000,
    baselineAvgPsf: 1850,
    baselineRental3BR: 4900,
    supplyPipeline: 'Low',
    quietnessRating: 4,
    mrtStations: [
      { name: 'Toa Payoh', code: 'NS19', lat: 1.3328, lng: 103.8478, lines: ['North-South'] },
      { name: 'Braddell', code: 'NS18', lat: 1.3405, lng: 103.8468, lines: ['North-South'] },
      { name: 'Caldecott', code: 'CC17 / TE9', lat: 1.3375, lng: 103.8398, lines: ['Circle', 'Thomson-East Coast'] },
      { name: 'Potong Pasir', code: 'NE10', lat: 1.3312, lng: 103.8692, lines: ['North-East'] }
    ],
    primarySchools: [
      { name: 'CHIJ Primary (Toa Payoh)', lat: 1.3325, lng: 103.8425, popular: true },
      { name: 'Pei Chun Public School', lat: 1.3375, lng: 103.8552, popular: true },
      { name: 'Kheng Cheng School', lat: 1.3365, lng: 103.8488, popular: false },
      { name: 'First Toa Payoh Primary School', lat: 1.3392, lng: 103.8595, popular: false }
    ],
    parks: [
      { name: 'Toa Payoh Town Park', lat: 1.3315, lng: 103.8465, size: 'regional' },
      { name: 'Toa Payoh Sensory Park', lat: 1.3355, lng: 103.8512, size: 'neighborhood' }
    ],
    healthcare: [
      { name: 'Toa Payoh Polyclinic (NHGP)', type: 'polyclinic', lat: 1.3345, lng: 103.8505 }
    ],
    amenities: [
      { name: 'HDB Hub & Toa Payoh Mall', type: 'mall', lat: 1.3332, lng: 103.8482 },
      { name: 'Toa Payoh Swimming Complex & Stadium', type: 'sports', lat: 1.3305, lng: 103.8522 }
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
