import type { Conversation, Message } from '@/lib/types'
import { users } from './users'

export const messages: Message[] = [
  { id: 'm1', senderId: 'u2', content: 'Hey Arjun! Saw your project on GitHub. The CRDT implementation looks solid.', timestamp: '2026-06-07T09:00:00Z', read: true, type: 'text' },
  { id: 'm2', senderId: 'u1', content: 'Thanks Priya! Took a while to get conflict resolution right. How is your paper going?', timestamp: '2026-06-07T09:05:00Z', read: true, type: 'text' },
  { id: 'm3', senderId: 'u2', content: 'Just got accepted at IEEE ICIP! 🎉 Would love to collaborate on something together.', timestamp: '2026-06-07T09:10:00Z', read: true, type: 'text' },
  { id: 'm4', senderId: 'u1', content: 'Congratulations! That is amazing. Let us discuss this week over coffee?', timestamp: '2026-06-07T09:15:00Z', read: false, type: 'text' },

  { id: 'm5', senderId: 'u3', content: 'Arjun, I reviewed your cloud computing assignment. Well done on the Lambda implementation.', timestamp: '2026-06-06T14:00:00Z', read: true, type: 'text' },
  { id: 'm6', senderId: 'u1', content: 'Thank you sir! I also added API Gateway caching. Can I show you the demo?', timestamp: '2026-06-06T14:10:00Z', read: true, type: 'text' },
  { id: 'm7', senderId: 'u3', content: 'Sure, come to my office tomorrow at 3 PM. Also bring the architecture diagram.', timestamp: '2026-06-06T14:15:00Z', read: true, type: 'text' },

  { id: 'm8', senderId: 'u8', content: 'Hi! I saw your post about the code editor. I would love to contribute to the frontend!', timestamp: '2026-06-05T11:00:00Z', read: true, type: 'text' },
  { id: 'm9', senderId: 'u1', content: 'That would be great Kavitha! The React components need some refactoring. Check the issues on GitHub.', timestamp: '2026-06-05T11:20:00Z', read: true, type: 'text' },
  { id: 'm10', senderId: 'u8', content: 'Perfect, I will pick up the editor toolbar issue. Also, are you going to TechVista?', timestamp: '2026-06-05T11:30:00Z', read: false, type: 'text' },

  { id: 'm11', senderId: 'u6', content: 'Arjun, your profile has been shortlisted for the Google STEP internship interview. Slot: June 18, 10 AM.', timestamp: '2026-06-04T16:00:00Z', read: true, type: 'text' },
  { id: 'm12', senderId: 'u1', content: 'That is wonderful news! Thank you ma\'am. I will be there. Any preparation tips?', timestamp: '2026-06-04T16:10:00Z', read: true, type: 'text' },
  { id: 'm13', senderId: 'u6', content: 'Focus on DSA and system design. I will share some resources. Also practice behavioral questions.', timestamp: '2026-06-04T16:15:00Z', read: true, type: 'text' },

  { id: 'm14', senderId: 'u7', content: 'Hey Arjun! I am Rahul from the 2020 batch. Happy to mentor you for your Google prep.', timestamp: '2026-06-03T10:00:00Z', read: true, type: 'text' },
  { id: 'm15', senderId: 'u1', content: 'Thank you so much Rahul! That means a lot. When can we schedule a call?', timestamp: '2026-06-03T10:30:00Z', read: true, type: 'text' },
  { id: 'm16', senderId: 'u7', content: 'How about Saturday 4 PM? I will share my Google Meet link. Prepare 2 system design topics.', timestamp: '2026-06-03T10:45:00Z', read: true, type: 'text' },

  { id: 'm17', senderId: 'u10', content: 'Arjun, can you help me set up Docker for my IoT project? Having some network issues.', timestamp: '2026-06-02T15:00:00Z', read: true, type: 'text' },
  { id: 'm18', senderId: 'u1', content: 'Sure Ananya! Are you using Docker Compose? The network bridge config can be tricky.', timestamp: '2026-06-02T15:15:00Z', read: true, type: 'text' },
  { id: 'm19', senderId: 'u10', content: 'Yes, the containers cannot talk to each other. Can we debug this in the lab tomorrow?', timestamp: '2026-06-02T15:25:00Z', read: false, type: 'text' },
]

export const conversations: Conversation[] = [
  {
    id: 'c1',
    type: 'direct',
    participant: users[1],
    lastMessage: 'Congratulations! That is amazing. Let us discuss this week over coffee?',
    lastTimestamp: '2026-06-07T09:15:00Z',
    unreadCount: 0,
    messages: messages.filter(m =>
      ['m1', 'm2', 'm3', 'm4'].includes(m.id)
    ),
  },
  {
    id: 'c2',
    type: 'direct',
    participant: users[2],
    lastMessage: 'Sure, come to my office tomorrow at 3 PM. Also bring the architecture diagram.',
    lastTimestamp: '2026-06-06T14:15:00Z',
    unreadCount: 0,
    messages: messages.filter(m =>
      ['m5', 'm6', 'm7'].includes(m.id)
    ),
  },
  {
    id: 'c3',
    type: 'direct',
    participant: users[7],
    lastMessage: 'Perfect, I will pick up the editor toolbar issue. Also, are you going to TechVista?',
    lastTimestamp: '2026-06-05T11:30:00Z',
    unreadCount: 1,
    messages: messages.filter(m =>
      ['m8', 'm9', 'm10'].includes(m.id)
    ),
  },
  {
    id: 'c4',
    type: 'direct',
    participant: users[5],
    lastMessage: 'Focus on DSA and system design. I will share some resources.',
    lastTimestamp: '2026-06-04T16:15:00Z',
    unreadCount: 0,
    messages: messages.filter(m =>
      ['m11', 'm12', 'm13'].includes(m.id)
    ),
  },
  {
    id: 'c5',
    type: 'direct',
    participant: users[6],
    lastMessage: 'How about Saturday 4 PM? I will share my Google Meet link.',
    lastTimestamp: '2026-06-03T10:45:00Z',
    unreadCount: 0,
    messages: messages.filter(m =>
      ['m14', 'm15', 'm16'].includes(m.id)
    ),
  },
  {
    id: 'c6',
    type: 'direct',
    participant: users[9],
    lastMessage: 'Yes, the containers cannot talk to each other. Can we debug this tomorrow?',
    lastTimestamp: '2026-06-02T15:25:00Z',
    unreadCount: 1,
    messages: messages.filter(m =>
      ['m17', 'm18', 'm19'].includes(m.id)
    ),
  },
]
