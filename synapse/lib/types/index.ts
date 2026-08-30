export type Role =
  | 'student'
  | 'faculty'
  | 'non_teaching'
  | 'hod'
  | 'principal'
  | 'vice_principal'
  | 'dean'
  | 'placement_officer'
  | 'admin'
  | 'alumni'

export interface User {
  id: string
  name: string
  email: string
  employeeId?: string
  usn?: string
  role: Role
  department: string
  semester?: number
  section?: string
  year?: number
  designation?: string
  qualification?: string
  specialization?: string
  experience?: string
  subjects?: string[]
  publications?: string[]
  officeRoom?: string
  avatar: string
  bio?: string
  skills: string[]
  achievements: string[]
  certifications?: string[]
  interests?: string[]
  clubs?: string[]
  linkedIn?: string
  github?: string
  batch?: string
  isOnline?: boolean
  followersCount: number
  followingCount: number
}

export interface Comment {
  id: string
  authorId: string
  author: User
  content: string
  timestamp: string
  likes: number
}

export interface Post {
  id: string
  authorId: string
  author: User
  content: string
  imageUrl?: string
  documentUrl?: string
  type: 'achievement' | 'project' | 'announcement' | 'placement'
       | 'event' | 'research' | 'general' | 'internship'
  likes: number
  comments: Comment[]
  shares: number
  tags: string[]
  timestamp: string
  liked: boolean
  bookmarked: boolean
  department?: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  endDate?: string
  time: string
  endTime?: string
  venue: string
  organizer: string
  organizerDept?: string
  category: 'technical' | 'cultural' | 'sports' | 'placement'
           | 'seminar' | 'workshop' | 'faculty' | 'exam' | 'holiday'
  rsvpCount: number
  maxCapacity: number
  imageUrl?: string
  isRsvped: boolean
  rsvpList: string[]
  tags: string[]
  isOfficial?: boolean
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
}

export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  read: boolean
  type: 'text' | 'image' | 'document'
}

export interface Conversation {
  id: string
  type: 'direct' | 'group' | 'announcement'
  participant?: User
  groupName?: string
  groupAvatar?: string
  members?: User[]
  messages: Message[]
  lastMessage: string
  lastTimestamp: string
  unreadCount: number
}

export interface Department {
  id: string
  name: string
  shortName: string
  hod: string
  hodAvatar?: string
  facultyCount: number
  studentCount: number
  description: string
  established?: string
  vision?: string
  labs: Lab[]
  achievements: string[]
  researchAreas: string[]
}

export interface Lab {
  name: string
  capacity: number
  equipment: string[]
}

export interface Job {
  id: string
  company: string
  role: string
  package: string
  minPackage?: number
  location: string
  deadline: string
  skills: string[]
  type: 'full-time' | 'internship' | 'contract'
  logo: string
  logoColor?: string
  applied: boolean
  eligibility?: string
  description?: string
  openings?: number
  driveDate?: string
}

export interface Alumni {
  id: string
  user: User
  currentCompany: string
  currentRole: string
  batch: string
  passingYear?: string
  achievements: string[]
  mentoring: boolean
  domain?: string
  location?: string
}

export interface Room {
  id: string
  name: string
  type: 'seminar_hall' | 'lab' | 'meeting_room' | 'classroom' | 'auditorium'
  capacity: number
  floor: string
  building: string
  amenities: string[]
  available: boolean
}

export interface Booking {
  id: string
  roomId: string
  room: Room
  userId: string
  userName: string
  date: string
  startTime: string
  endTime: string
  purpose: string
  status: 'confirmed' | 'pending' | 'cancelled'
}

export interface Announcement {
  id: string
  title: string
  content: string
  authorName: string
  authorAvatar?: string
  department: string
  targetAudience?: ('all' | 'students' | 'faculty' | 'staff')[]
  priority: 'high' | 'medium' | 'low'
  timestamp: string
  attachmentUrl?: string
  expiresAt?: string
}

export interface PlacementStat {
  year: string
  placed: number
  total: number
  avgPackage: number
  highestPackage: number
  companies?: number
}

export interface Notification {
  id: string
  type: 'event' | 'message' | 'post' | 'announcement' | 'placement' | 'system'
  title: string
  body: string
  timestamp: string
  read: boolean
  link?: string
}

export interface BusRoute {
  id: string
  routeNo: string
  name: string
  departure: string
  arrival: string
  stops: string[]
  driverName: string
  vehicleNo: string
  capacity: number
  currentOccupancy: number
}
