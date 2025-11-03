export interface PrayerTimes {
  Fajr: string;
  Duhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface Location {
  lat: number;
  lon: number;
}

export interface Masjid {
  id: number;
  name: string;
  address: string;
  location: Location;
  prayerTimes: PrayerTimes;
  jumuahTimes: string[];
}