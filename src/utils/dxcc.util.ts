// This utility provides a function to determine the DXCC country from a given callsign.

const DXCC_PREFIXES: Record<string, string> = {
  // Europe
  DL: 'Germany',
  F: 'France',
  G: 'England',
  I: 'Italy',
  EA: 'Spain',
  CT: 'Portugal',
  PA: 'Netherlands',
  ON: 'Belgium',
  OZ: 'Denmark',
  SM: 'Sweden',
  LA: 'Norway',
  OH: 'Finland',
  YO: 'Romania',
  HA: 'Hungary',
  SP: 'Poland',
  OK: 'Czech Republic',
  OM: 'Slovakia',
  OE: 'Austria',
  HB: 'Switzerland',
  SV: 'Greece',
  SV9: 'Crete',
  TA: 'Turkey',

  // North America
  K: 'United States',
  W: 'United States',
  N: 'United States',
  VE: 'Canada',
  VA: 'Canada',
  XE: 'Mexico',

  // South America
  PY: 'Brazil',
  LU: 'Argentina',
  CX: 'Uruguay',
  CE: 'Chile',
  YV: 'Venezuela',
  HK: 'Colombia',
  OA: 'Peru',

  // Asia
  JA: 'Japan',
  BY: 'China',
  HL: 'South Korea',
  HS: 'Thailand',
  DU: 'Philippines',
  VT: 'India',
  AP: 'Pakistan',
  EX: 'Kyrgyzstan',
  UN: 'Kazakhstan',

  // Middle East
  A6: 'United Arab Emirates',
  A7: 'Qatar',
  A9: 'Bahrain',
  HZ: 'Saudi Arabia',

  // Africa
  ZS: 'South Africa',
  V5: 'Namibia',
  SU: 'Egypt',
  CN: 'Morocco',

  // Oceania
  VK: 'Australia',
  ZL: 'New Zealand',
  KH6: 'Hawaii',
  FK: 'New Caledonia',

  // Caribbean
  KP4: 'Puerto Rico',
  HI: 'Dominican Republic',
  J6: 'Saint Lucia',
  J7: 'Dominica',
  V2: 'Antigua and Barbuda'
}


//Extracts the prefix from a callsign and returns the DXCC country.

export const getDXCCCountry = (callsign: string) => {
  if (!callsign) return null

  const upper = callsign.toUpperCase()

  // Handle portable callsigns like DL/YO8UFO
  const parts = upper.split('/')
  const baseCall = parts.length > 1 ? parts[0] : upper

  const prefix = Object.keys(DXCC_PREFIXES)
    .sort((a, b) => b.length - a.length)
    .find(p => baseCall.startsWith(p))

  if (!prefix) return null

  return DXCC_PREFIXES[prefix]
}