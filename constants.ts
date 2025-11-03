import type { Masjid } from './types';

export const MASJIDS: Masjid[] = [
  {
    id: 1,
    name: 'ISGH Main Center',
    address: '3110 Eastside St, Houston, TX 77098',
    location: { lat: 29.7345, lon: -95.3843 },
    prayerTimes: { Fajr: '5:45 AM', Duhr: '1:30 PM', Asr: '5:15 PM', Maghrib: '7:50 PM', Isha: '9:15 PM' },
    jumuahTimes: ['12:30 PM', '1:45 PM'],
  },
  {
    id: 2,
    name: 'Masjid Al-Salam (Champions)',
    address: '16700 Old Louetta Rd, Spring, TX 77379',
    location: { lat: 29.9881, lon: -95.5348 },
    prayerTimes: { Fajr: '5:45 AM', Duhr: '1:30 PM', Asr: '5:15 PM', Maghrib: '7:52 PM', Isha: '9:20 PM' },
    jumuahTimes: ['1:30 PM', '2:30 PM'],
  },
  {
    id: 3,
    name: 'Clear Lake Islamic Center',
    address: '17511 El Camino Real, Houston, TX 77058',
    location: { lat: 29.5828, lon: -95.1207 },
    prayerTimes: { Fajr: '5:40 AM', Duhr: '1:30 PM', Asr: '5:10 PM', Maghrib: '7:48 PM', Isha: '9:10 PM' },
    jumuahTimes: ['1:30 PM'],
  },
  {
    id: 4,
    name: 'Masjid At-Taqwa',
    address: '10415 Synott Rd, Sugar Land, TX 77498',
    location: { lat: 29.6891, lon: -95.2109 },
    prayerTimes: { Fajr: '5:42 AM', Duhr: '1:30 PM', Asr: '5:12 PM', Maghrib: '7:49 PM', Isha: '9:12 PM' },
    jumuahTimes: ['1:20 PM', '2:20 PM', '3:20 PM'],
  },
  {
    id: 5,
    name: 'Pearland Islamic Center',
    address: '4620 Old Chocolate Bayou Rd, Pearland, TX 77584',
    location: { lat: 29.5629, lon: -95.2894 },
    prayerTimes: { Fajr: '5:43 AM', Duhr: '1:30 PM', Asr: '5:15 PM', Maghrib: '7:50 PM', Isha: '9:15 PM' },
    jumuahTimes: ['1:30 PM', '2:45 PM'],
  },
  {
    id: 6,
    name: 'Masjid Hamza',
    address: '6233 Tres Lagunas Dr, Houston, TX 77083',
    location: { lat: 29.8037, lon: -95.6421 },
    prayerTimes: { Fajr: '5:50 AM', Duhr: '1:35 PM', Asr: '5:20 PM', Maghrib: '7:55 PM', Isha: '9:25 PM' },
    jumuahTimes: ['1:35 PM', '2:35 PM'],
  },
  {
    id: 7,
    name: 'Masjid Abu Bakr',
    address: '8830 Old Galveston Rd, Houston, TX 77034',
    location: { lat: 29.7027, lon: -95.5132 },
    prayerTimes: { Fajr: '5:45 AM', Duhr: '1:30 PM', Asr: '5:15 PM', Maghrib: '7:51 PM', Isha: '9:18 PM' },
    jumuahTimes: ['1:30 PM', '2:30 PM'],
  },
  {
    id: 8,
    name: 'Masjid Al-Mustafa',
    address: '17250 Coventry Park Dr, Houston, TX 77084',
    location: { lat: 29.6648, lon: -95.6190 },
    prayerTimes: { Fajr: '5:48 AM', Duhr: '1:30 PM', Asr: '5:18 PM', Maghrib: '7:53 PM', Isha: '9:22 PM' },
    jumuahTimes: ['1:30 PM'],
  },
  {
    id: 9,
    name: 'Katy Islamic Association',
    address: '24880 Kingsland Blvd, Katy, TX 77494',
    location: { lat: 29.7785, lon: -95.7770 },
    prayerTimes: { Fajr: '5:52 AM', Duhr: '1:35 PM', Asr: '5:25 PM', Maghrib: '7:58 PM', Isha: '9:30 PM' },
    jumuahTimes: ['1:30 PM', '2:40 PM'],
  },
  {
    id: 10,
    name: 'Masjid El-Farouq',
    address: '1207 Conrad Sauer Dr, Houston, TX 77043',
    location: { lat: 29.8000, lon: -95.3400 },
    prayerTimes: { Fajr: '5:44 AM', Duhr: '1:30 PM', Asr: '5:14 PM', Maghrib: '7:50 PM', Isha: '9:16 PM' },
    jumuahTimes: ['1:30 PM'],
  },
];

// Bounding box for the greater Houston area to normalize coordinates for the map view.
export const HOUSTON_BOUNDS = {
  maxLat: 30.1,
  minLat: 29.5,
  maxLon: -95.0,
  minLon: -95.9,
};