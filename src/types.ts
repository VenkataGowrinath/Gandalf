export type LatLng = { lat: number; lng: number };

export type MemberStatus =
  | { type: 'idle'; text?: string }
  | { type: 'moving'; text: string }
  | { type: 'assistance_radius'; text?: string };

export interface CommunityMember {
  id: string;
  name: string;
  avatar: string; // URL or emoji/initials for demo
  position: LatLng;
  status: MemberStatus;
  assistanceRadiusMeters?: number; // radius within which they can provide quick assistance
}

export interface Group {
  id: string;
  name: string;
  members: CommunityMember[];
  currentUser: CommunityMember; // logged-in user (avatar in header)
}

export type IntentOption =
  | 'Safety Status'
  | 'Route Deviation'
  | 'Timing Anomaly'
  | 'Assistance Feasibility';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface IncomingNotification {
  id: string;
  fromMember: CommunityMember;
  message: string;
  timestamp: Date;
  intent?: IntentOption;
}
