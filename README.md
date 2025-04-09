
# Apex Movement: Move Like You Own the World

![Apex Movement Logo](public/lovable-uploads/b2ce79c8-d067-4d35-9976-b38a22d22191.png)

## Overview

Apex Movement is a movement tracking application designed for hybrid athletes who train across multiple movement disciplines — martial arts, dance, yoga, sprinting, calisthenics, gymnastics, and more. The app provides a simple yet powerful way to track daily movement patterns, visualize training consistency, and map skill development over time.

## Features

### Daily Movement Tracking
- Log your daily training with customizable "Training Stones" representing different movement categories
- Add notes to capture insights and reflections about your training sessions
- Visual progress indicators to see daily completion status

### Movement Calendar
- Calendar view to track training consistency over time
- Easily navigate between months to see historical training patterns
- Detailed view of each day's completed stones and training notes

### Skill Mapping
- Visual representation of your movement skills and focuses
- Track progress across different movement disciplines
- Identify strengths and areas for development

### Quest System
- Set specific movement goals as "quests"
- Track progress on active quests
- Archive completed movement achievements

### User Profile
- Personalized movement profile showing training statistics
- Track consistency and training streaks
- View most frequently trained movement categories

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: React Context API, React Query
- **Routing**: React Router
- **Animations**: Framer Motion
- **Data Visualization**: Recharts
- **UI Components**: Shadcn/UI

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/apex-movement.git
cd apex-movement
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser to `http://localhost:5173` to see the application

## Project Structure

```
apex-movement/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── data/           # Mock data and constants
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Application pages
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## Design Philosophy

Apex Movement follows a minimalist and bold design philosophy inspired by warrior motion, movement flow, and the nervous system. The visual identity fuses neuroscience and martial mastery, creating a digital dojo experience for movement practitioners.

## Customization

The application is designed to be customizable to fit different movement practices:

- Add/modify Training Stones in the data models
- Customize focus categories to match your training interests
- Adjust the quest system to track your specific movement goals

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by hybrid athletes and movement practitioners worldwide
- Designed for those who move across multiple disciplines and refuse to be confined to a single movement system
