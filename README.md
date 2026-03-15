# RepClock

**Strength Every Minute**

RepClock is a modern, mobile-first web app designed to help users build strength through a simple time-based training protocol: performing a small number of exercise reps every minute for 60 minutes.

## Features

- **Workout Timer**: Beautiful circular clock showing 60-minute segments with real-time progress
- **Multiple Protocols**:
  - Pushups: Progressive difficulty (Week 1: 2 reps, Week 2-3: 3 reps for first 10-20 mins)
  - Pullups: 1 rep every minute
- **Visual Progress**: Segments turn green for completed minutes, red for skipped
- **Stats Tracking**: Track your streak, lifetime totals, and session history
- **Vibration Feedback**: Haptic feedback when starting new minutes
- **Smooth Animations**: Framer Motion powered transitions

## Tech Stack

- **Next.js 13** (App Router)
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **LocalStorage** for data persistence
- **Lucide React** for icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Usage

1. **Start a Session**: Choose Pushups or Pullups from the home screen
2. **Complete Reps**: Do the prescribed reps each minute
3. **Track Progress**: Press DONE when finished, or SKIP if needed
4. **Build Streaks**: Complete at least one session per day to maintain your streak
5. **View Stats**: Check your progress, totals, and history

## Project Structure

```
├── app/
│   ├── page.tsx           # Home page
│   ├── workout/page.tsx   # Workout session
│   ├── complete/page.tsx  # Session complete
│   └── stats/page.tsx     # Statistics
├── components/
│   ├── ProgressClock.tsx  # Circular 60-segment timer
│   └── Timer.tsx          # Countdown timer
├── lib/
│   ├── types.ts           # TypeScript interfaces
│   ├── workout-protocols.ts # Exercise protocols
│   └── storage.ts         # LocalStorage utilities
```

## Design Principles

- **Mobile-First**: Optimized for smartphone screens
- **Dark Mode**: Easy on the eyes during workouts
- **Large Touch Targets**: Big buttons for easy interaction
- **Clear Feedback**: Visual and haptic feedback for all actions
- **Minimal Interface**: Focus on the workout, nothing more

## Workout Protocol

### Pushups
- **Week 1** (Sessions 1-7): 2 pushups every minute
- **Week 2** (Sessions 8-14): 3 pushups for first 10 minutes, then 2
- **Week 3+** (Sessions 15+): 3 pushups for first 20 minutes, then 2

### Pullups
- All weeks: 1 pullup every minute for 60 minutes

## License

MIT
