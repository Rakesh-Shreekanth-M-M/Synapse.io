'use client'

import {
  DoorOpen,
  Users,
  MapPin,
  Building2,
  Wifi,
  Monitor,
  Wind,
  CheckCircle2,
  XCircle,
  Calendar,
} from 'lucide-react'
import { rooms } from '@/lib/data'
import { cn } from '@/lib/utils'

const amenityIcons: Record<string, React.ReactNode> = {
  'High-Speed WiFi': <Wifi className="h-3 w-3" />,
  'WiFi': <Wifi className="h-3 w-3" />,
  'Projector': <Monitor className="h-3 w-3" />,
  'AC': <Wind className="h-3 w-3" />,
  'Video Conferencing': <Monitor className="h-3 w-3" />,
}

export default function RoomsPage() {
  return (
    <div className="gradient-mesh min-h-full">
      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-display)] gradient-text">Room Booking</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Book seminar halls, labs, and meeting rooms
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Calendar className="h-4 w-4" />
            New Booking
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="synapse-card p-4 text-center">
            <DoorOpen className="h-5 w-5 mx-auto mb-2 text-blue-400" />
            <p className="text-xl font-bold">{rooms.length}</p>
            <p className="text-xs text-muted-foreground">Total Rooms</p>
          </div>
          <div className="synapse-card p-4 text-center">
            <CheckCircle2 className="h-5 w-5 mx-auto mb-2 text-green-400" />
            <p className="text-xl font-bold">{rooms.filter((r) => r.available).length}</p>
            <p className="text-xs text-muted-foreground">Available</p>
          </div>
          <div className="synapse-card p-4 text-center">
            <XCircle className="h-5 w-5 mx-auto mb-2 text-red-400" />
            <p className="text-xl font-bold">{rooms.filter((r) => !r.available).length}</p>
            <p className="text-xs text-muted-foreground">Occupied</p>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={cn(
                'synapse-card group overflow-hidden hover:border-primary/30 transition-all duration-300',
                !room.available && 'opacity-70'
              )}
            >
              {/* Status Bar */}
              <div className={cn('h-1.5', room.available ? 'bg-green-500' : 'bg-red-500')} />

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-semibold font-[var(--font-display)] group-hover:text-primary transition-colors">
                    {room.name}
                  </h3>
                  <span
                    className={cn(
                      'shrink-0 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium',
                      room.available
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-red-500/10 text-red-400'
                    )}
                  >
                    {room.available ? (
                      <><CheckCircle2 className="h-3 w-3" /> Available</>
                    ) : (
                      <><XCircle className="h-3 w-3" /> Occupied</>
                    )}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    Capacity: {room.capacity} people
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {room.floor}
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-primary" />
                    {room.building}
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {room.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                    >
                      {amenityIcons[amenity] || <DoorOpen className="h-3 w-3" />}
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Book Button */}
                <button
                  disabled={!room.available}
                  className={cn(
                    'w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-medium transition-all',
                    room.available
                      ? 'bg-primary/10 text-primary hover:bg-primary/20'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  )}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  {room.available ? 'Book Now' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
