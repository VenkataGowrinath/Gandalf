import type { Group } from '../types';

// Hyderabad / Madhapur area coordinates
const center = { lat: 17.4485, lng: 78.3908 };

export const mockGroups: Group[] = [
  {
    id: 'school-mates',
    name: 'School Mates',
    currentUser: {
      id: 'me-1',
      name: 'You',
      avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=me&backgroundColor=ffd5b4',
      position: { lat: center.lat - 0.002, lng: center.lng - 0.001 },
      status: { type: 'assistance_radius' },
      assistanceRadiusMeters: 800,
    },
    members: [
      {
        id: 'sm-1',
        name: 'Valli',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Valli&backgroundColor=b6e3f4',
        position: { lat: center.lat + 0.0015, lng: center.lng + 0.0005 },
        status: {
          type: 'moving',
          text: 'Took a right turn towards Madhapur',
        },
      },
      {
        id: 'sm-1b',
        name: 'Priya',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Priya&backgroundColor=d1d4f9',
        position: { lat: center.lat + 0.001, lng: center.lng - 0.0008 },
        status: { type: 'idle' },
      },
      {
        id: 'sm-2',
        name: 'Anjali',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Anjali&backgroundColor=ffd5b4',
        position: { lat: center.lat + 0.0008, lng: center.lng - 0.0012 },
        status: { type: 'idle' },
      },
      {
        id: 'sm-3',
        name: 'Rahul',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Rahul&backgroundColor=c0aede',
        position: { lat: center.lat - 0.0005, lng: center.lng + 0.0015 },
        status: { type: 'idle' },
      },
      {
        id: 'sm-4',
        name: 'Kavya',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Kavya&backgroundColor=d1d4f9',
        position: { lat: center.lat - 0.0012, lng: center.lng - 0.0008 },
        status: { type: 'idle' },
      },
      {
        id: 'sm-5',
        name: 'Vikram',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Vikram&backgroundColor=ffdfbf',
        position: { lat: center.lat + 0.001, lng: center.lng + 0.001 },
        status: { type: 'idle' },
      },
      {
        id: 'sm-6',
        name: 'Meera',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Meera&backgroundColor=e8d5b7',
        position: { lat: center.lat - 0.0002, lng: center.lng - 0.0015 },
        status: { type: 'idle' },
      },
    ],
  },
  {
    id: 'work-friends',
    name: 'Work Friends',
    currentUser: {
      id: 'me-2',
      name: 'You',
      avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=me&backgroundColor=ffd5b4',
      position: { lat: center.lat - 0.002, lng: center.lng - 0.001 },
      status: { type: 'assistance_radius' },
      assistanceRadiusMeters: 800,
    },
    members: [
      {
        id: 'wf-1',
        name: 'Sneha',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sneha&backgroundColor=b6e3f4',
        position: { lat: center.lat + 0.002, lng: center.lng },
        status: { type: 'moving', text: 'Heading towards Gachibowli' },
      },
      {
        id: 'wf-2',
        name: 'Arjun',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Arjun2&backgroundColor=c0aede',
        position: { lat: center.lat, lng: center.lng + 0.002 },
        status: { type: 'idle' },
      },
      {
        id: 'wf-3',
        name: 'Divya',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Divya&backgroundColor=ffd5b4',
        position: { lat: center.lat - 0.001, lng: center.lng - 0.002 },
        status: { type: 'idle' },
      },
    ],
  },
  {
    id: 'neighbors',
    name: 'Neighbors',
    currentUser: {
      id: 'me-3',
      name: 'You',
      avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=me&backgroundColor=ffd5b4',
      position: { lat: center.lat - 0.002, lng: center.lng - 0.001 },
      status: { type: 'assistance_radius' },
      assistanceRadiusMeters: 500,
    },
    members: [
      {
        id: 'nb-1',
        name: 'Lakshmi',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Lakshmi&backgroundColor=d1d4f9',
        position: { lat: center.lat + 0.0003, lng: center.lng - 0.0003 },
        status: { type: 'idle' },
      },
      {
        id: 'nb-2',
        name: 'Ramesh',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Ramesh&backgroundColor=ffdfbf',
        position: { lat: center.lat - 0.0005, lng: center.lng + 0.0005 },
        status: { type: 'idle' },
      },
    ],
  },
];
