# WeLearn Frontend

A beautiful, minimal frontend for the WeLearn AI summarization service built with React, TypeScript, and Tailwind CSS.

## Features

- **Dashboard**: Welcome section and activity history
- **Summarization**: Three input methods (URL, Document Upload, Text Input)
- **Responsive Design**: Works seamlessly on all screen sizes
- **Vibrant UI**: Beautiful gradients and smooth animations
- **Real-time Results**: Inline summary display with statistics

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Responsive design patterns
- Modern React hooks for state management

## Setup Instructions

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Backend Integration

Make sure your WeLearn backend is running on `http://localhost:5000` with the following endpoints:

- `GET /api/activities` - Fetch user activity history
- `POST /api/summarize/url` - Summarize from URL
- `POST /api/summarize/document` - Summarize uploaded document
- `POST /api/summarize/text` - Summarize text input

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx      # Navigation component
│   ├── Dashboard.tsx   # Dashboard with activity history
│   └── Summarize.tsx   # Summarization interface
├── App.tsx             # Main app component
├── App.css             # Custom styles
└── index.tsx           # Entry point
```

## Features Overview

### Dashboard

- Vibrant welcome section with gradient background
- Activity history cards showing past summaries
- Different icons and colors for each summary type
- Loading states and empty states

### Summarize Page

- Three input method selection (URL, Document, Text)
- Beautiful form inputs with proper validation
- Inline results display with summary statistics
- Error handling with user-friendly messages
- Loading states with animated spinners

### Responsive Design

- Mobile-first approach
- Adaptive layouts for tablet and desktop
- Touch-friendly buttons and inputs
- Optimized typography scaling

## Customization

The color scheme uses vibrant gradients:

- Purple to Blue for primary elements
- Green for document-related features
- Cyan for URL-related features
- Pink for text-related features

You can customize colors in `tailwind.config.js` and component files.

## Performance

- Optimized bundle size with tree shaking
- Lazy loading for better performance
- Efficient re-renders with proper React patterns
- CSS-in-JS with Tailwind for minimal runtime overhead
