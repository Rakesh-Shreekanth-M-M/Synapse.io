import type { PlacementStat } from '@/lib/types'

export const placementStats: PlacementStat[] = [
  {
    year: `2021-22`,
    placed: 312,
    total: 480,
    avgPackage: 5.2,
    highestPackage: 42,
  },
  {
    year: `2022-23`,
    placed: 345,
    total: 490,
    avgPackage: 5.8,
    highestPackage: 44,
  },
  {
    year: `2023-24`,
    placed: 378,
    total: 510,
    avgPackage: 6.4,
    highestPackage: 48,
  },
  {
    year: `2024-25`,
    placed: 402,
    total: 520,
    avgPackage: 7.1,
    highestPackage: 54,
  },
  {
    year: `2025-26`,
    placed: 428,
    total: 535,
    avgPackage: 7.8,
    highestPackage: 62,
  },
]

export const monthlyUserGrowth = [
  { month: `Jul`, students: 1200, faculty: 120, alumni: 80 },
  { month: `Aug`, students: 1450, faculty: 125, alumni: 95 },
  { month: `Sep`, students: 1620, faculty: 128, alumni: 110 },
  { month: `Oct`, students: 1780, faculty: 130, alumni: 125 },
  { month: `Nov`, students: 1850, faculty: 132, alumni: 140 },
  { month: `Dec`, students: 1900, faculty: 135, alumni: 155 },
  { month: `Jan`, students: 1950, faculty: 138, alumni: 168 },
  { month: `Feb`, students: 2050, faculty: 140, alumni: 180 },
  { month: `Mar`, students: 2180, faculty: 142, alumni: 195 },
  { month: `Apr`, students: 2300, faculty: 145, alumni: 210 },
  { month: `May`, students: 2420, faculty: 148, alumni: 228 },
  { month: `Jun`, students: 2520, faculty: 150, alumni: 245 },
]

export const departmentActivity = [
  { department: `CSE`, posts: 156, events: 24, bookings: 89 },
  { department: `ECE`, posts: 98, events: 18, bookings: 45 },
  { department: `ME`, posts: 67, events: 12, bookings: 34 },
  { department: `CV`, posts: 45, events: 8, bookings: 22 },
  { department: `EEE`, posts: 72, events: 14, bookings: 38 },
  { department: `ISE`, posts: 134, events: 22, bookings: 78 },
  { department: `AI&ML`, posts: 145, events: 20, bookings: 65 },
  { department: `MBA`, posts: 56, events: 10, bookings: 28 },
]

export const eventCategoryDistribution = [
  { category: `Technical`, count: 45, fill: `hsl(217, 91%, 60%)` },
  { category: `Cultural`, count: 18, fill: `hsl(265, 70%, 60%)` },
  { category: `Sports`, count: 22, fill: `hsl(142, 71%, 45%)` },
  { category: `Placement`, count: 15, fill: `hsl(38, 92%, 50%)` },
  { category: `Seminar`, count: 28, fill: `hsl(0, 84%, 60%)` },
]
