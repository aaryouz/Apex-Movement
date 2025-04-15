# Apex Movement: Cross-Domain Movement Tracking

A minimalist movement tracking application designed for athletes who transcend traditional training boundaries. Built with modern web technologies to help athletes monitor and visualize their progress across diverse movement domains.

![Prototype Screenshot](public/screenshots/prototype.png)

## Philosophy & Purpose

As athletes evolve beyond single-domain specialization, the need for a unified tracking system becomes crucial. Apex Movement was born from the philosophy that modern athletes train across multiple domains - from gymnastics to martial arts, from dance to strength training. This application serves as a minimalist tool to:

- Track daily engagement across different movement domains
- Visualize training consistency over time
- Maintain awareness of movement variety and balance

The focus is on simplicity and functionality, removing unnecessary features to keep athletes focused on what matters: their training and progress.

## Technical Implementation

### Core Technologies
```typescript
{
  "frontend": {
    "framework": "React 18",
    "language": "TypeScript",
    "styling": "Tailwind CSS",
    "state": ["React Context", "React Query"],
    "routing": "React Router v6",
    "animations": "Framer Motion",
    "ui": "Shadcn/UI"
  }
}
```

### Key Technical Features

#### 1. Movement Domain Tracking
- Modular movement "stones" system using TypeScript interfaces
- Real-time state updates with React Context
- Persistent storage with browser localStorage

```typescript
interface Stone {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: Category;
}
```

#### 2. Calendar Visualization
- Custom calendar implementation with date-fns
- Efficient date manipulation and formatting
- Responsive grid layout with CSS Grid

#### 3. State Management
- Centralized movement context for global state
- Optimistic updates for immediate user feedback
- Type-safe state management with TypeScript

## Getting Started

1. Clone and install dependencies:
```bash
git clone https://github.com/yourusername/apex-movement.git
cd apex-movement
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open browser to displayed localhost port

## Project Architecture

```
src/
├── components/          # Reusable UI components
│   ├── TrainingStone   # Movement tracking stones
│   └── Calendar        # Training calendar
├── context/
│   └── MovementContext # Global state management
├── data/
│   └── mockData.ts     # Movement definitions
├── pages/
│   ├── Today          # Daily movement tracking
│   └── Calendar       # Progress visualization
└── types/
    └── movement.d.ts  # TypeScript definitions
```

## Development Roadmap

### Current Semester Prototype
- [x] Basic movement tracking
- [x] Calendar visualization
- [x] Minimalist UI/UX
- [x] Cross-domain movement support

### Future Enhancements
- [ ] Data export capabilities
- [ ] Movement pattern analysis
- [ ] Progressive web app support
- [ ] Offline functionality

## Contributing

This project is part of an ongoing development to better serve athletes who train across multiple domains. Contributions that align with the core philosophy of simplicity and functionality are welcome.

## License

MIT License - Feel free to use and modify for your own training needs.

---

*Built by athletes, for athletes who refuse to be confined to a single training domain.*
