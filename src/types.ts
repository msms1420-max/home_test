export type ZoneId = 'start' | 'journey' | 'memory';

export interface ZoneInfo {
  id: ZoneId;
  name: string;
  subName: string;
  title: string;
  desc: string;
  mapDesc: string;
  mapCoordinates: { x: number; y: number }; // Percentage positions for decorative star map
  themeColor: string;
  tag: string;
}

export interface StayItem {
  id: string;
  zoneId: ZoneId;
  name: string;
  desc: string;
  location: string;
  image: string;
  capacity: string;
  features: string[];
  price: number;
}

export interface ProgramItem {
  id: string;
  zoneId: ZoneId;
  host: string;
  name: string;
  desc: string;
  time: string;
}

export interface Reservation {
  id: string;
  zoneId: ZoneId;
  stayId: string;
  guestName: string;
  phone: string;
  checkInDate: string;
  guestsCount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}
