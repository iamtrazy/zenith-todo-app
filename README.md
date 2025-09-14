# 🌟 Zenith To-Do

A beautiful, modern desktop to-do application built with React, Electron, and SQLite. Features a stunning dark/light mode toggle, elegant glassmorphism UI, and smooth animations.

![Zenith To-Do](https://img.shields.io/badge/Electron-38.1.0-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.1.2-purple.svg)
![SQLite](https://img.shields.io/badge/SQLite-5.1.7-green.svg)

## ✨ Features

- 🎨 **Beautiful Modern UI** - Glassmorphism design with smooth animations
- 🌙 **Dark/Light Mode** - Seamless theme switching with persistent preferences
- 📅 **Calendar View** - Visualize tasks with due dates on an elegant calendar
- ✅ **Task Management** - Create, edit, delete, and mark tasks as complete
- 💾 **Local Storage** - SQLite database for offline-first functionality
- 🚀 **Cross-Platform** - Runs on Windows, macOS, and Linux
- 📱 **Responsive Design** - Optimized for different screen sizes
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1 with Material-UI
- **Desktop**: Electron 38.1.0
- **Build Tool**: Vite 7.1.2
- **Database**: SQLite 3
- **Styling**: Custom theme system with glassmorphism effects
- **Package Manager**: pnpm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (v8.0.0 or higher) - Install with: `npm install -g pnpm`
- **Git** - [Download here](https://git-scm.com/)

### Platform-Specific Requirements

#### Windows
- Visual Studio Build Tools or Visual Studio Community
- Python 3.x

#### macOS
- Xcode Command Line Tools: `xcode-select --install`
- macOS 10.14 or later

#### Linux
- Build essentials: `sudo apt-get install build-essential`
- Python 3.x
- libnss3-dev: `sudo apt-get install libnss3-dev`

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/zenith-todo-app.git
cd zenith-todo-app
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Development Setup

#### Start Development Server

```bash
pnpm dev
```

This command will:
- Start the Vite development server on `http://localhost:5173`
- Launch the Electron app in development mode
- Enable hot reload for both React and Electron

#### Development Commands

```bash
# Start only the Vite dev server
pnpm dev:vite

# Start only Electron (after Vite is running)
pnpm dev:electron

# Lint the codebase
pnpm lint

# Preview the built app
pnpm preview
```

### 4. Building for Production

#### Build the Web App

```bash
pnpm build
```

This creates optimized production files in the `dist/` directory.

#### Build Desktop App

The app uses Electron Builder for creating distributable packages. Build commands are configured in `package.json`.

## 📦 Building Binaries for All Platforms

### Prerequisites for Cross-Platform Building

To build for all platforms, you need to set up the following:

#### Windows (for building Windows binaries)
- Windows 10/11
- Visual Studio Build Tools
- Python 3.x

#### macOS (for building macOS binaries)
- macOS 10.14 or later
- Xcode Command Line Tools
- Apple Developer Account (for notarization)

#### Linux (for building Linux binaries)
- Ubuntu 18.04+ or similar
- Build essentials
- AppImage tools

### Build Commands

#### Build for Current Platform

```bash
# Build for your current platform
pnpm build
npx electron-builder
```

#### Build for Specific Platforms

```bash
# Build for Windows (from any platform)
npx electron-builder --win

# Build for macOS (from any platform)
npx electron-builder --mac

# Build for Linux (from any platform)
npx electron-builder --linux

# Build for all platforms
npx electron-builder --win --mac --linux
```

#### Build Specific Formats

```bash
# Windows
npx electron-builder --win --x64 --ia32
npx electron-builder --win --x64 --nsis
npx electron-builder --win --x64 --portable

# macOS
npx electron-builder --mac --x64 --arm64
npx electron-builder --mac --x64 --dmg
npx electron-builder --mac --x64 --zip

# Linux
npx electron-builder --linux --x64 --ia32
npx electron-builder --linux --x64 --appimage
npx electron-builder --linux --x64 --deb
npx electron-builder --linux --x64 --rpm
```

### Build Configuration

The build configuration is defined in `package.json`:

```json
{
  "build": {
    "appId": "com.zenith-todo.app",
    "productName": "Zenith To-Do",
    "files": [
      "dist/**/*",
      "electron/**/*"
    ],
    "directories": {
      "buildResources": "assets"
    },
    "win": {
      "target": "nsis",
      "icon": "assets/icon.ico"
    },
    "mac": {
      "target": "dmg",
      "icon": "assets/icon.icns",
      "category": "public.app-category.productivity"
    },
    "linux": {
      "target": "AppImage",
      "icon": "assets/icon.png",
      "category": "Office"
    }
  }
}
```

## 🏗️ Project Structure

```
zenith-todo-app/
├── src/
│   ├── components/          # React components
│   │   ├── ModernAppBar.jsx
│   │   ├── ModernTaskForm.jsx
│   │   ├── ModernTaskList.jsx
│   │   ├── ModernTaskItem.jsx
│   │   ├── CalendarView.jsx
│   │   ├── FloatingActionButton.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── BackgroundArt.jsx
│   │   ├── ModernCard.jsx
│   │   └── LoadingSpinner.jsx
│   ├── contexts/            # React contexts
│   │   └── ThemeContext.jsx
│   ├── App.jsx             # Main React component
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── electron/               # Electron main process
│   └── main.cjs
├── public/                 # Static assets
├── dist/                   # Built files (generated)
├── build/                  # Electron build output (generated)
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## 🎨 Customization

### Theme Customization

The app uses a custom theme system. You can modify colors and styling in `src/contexts/ThemeContext.jsx`:

```javascript
const theme = {
  colors: {
    primary: '#6366f1',      // Primary color
    secondary: '#ec4899',    // Secondary color
    background: '#0f0f23',   // Background color
    surface: '#1a1a2e',      // Surface color
    text: '#e2e8f0',         // Text color
    // ... more colors
  },
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    // ... more gradients
  }
};
```

### Adding New Features

1. **New Components**: Add to `src/components/`
2. **New Contexts**: Add to `src/contexts/`
3. **Database Changes**: Modify `electron/main.cjs`
4. **Styling**: Update theme in `ThemeContext.jsx`

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

#### 2. Electron Rebuild Issues

```bash
# Rebuild native modules
pnpm rebuild
```

#### 3. SQLite Issues

```bash
# Rebuild SQLite
npx electron-rebuild -f -w sqlite3
```

#### 4. Development Server Issues

```bash
# Clear Vite cache
rm -rf node_modules/.vite
pnpm dev
```

### Platform-Specific Issues

#### Windows
- Ensure Visual Studio Build Tools are installed
- Run as Administrator if needed
- Check Windows Defender exclusions

#### macOS
- Ensure Xcode Command Line Tools are installed
- Check Gatekeeper settings for unsigned apps
- For notarization, set up Apple Developer account

#### Linux
- Install required system dependencies
- Check file permissions
- Ensure proper display server (X11/Wayland)

## 📝 Development Guidelines

### Code Style

- Use ESLint for code linting
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

### Testing

```bash
# Run linting
pnpm lint

# Test the app manually
pnpm dev
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/zenith-todo-app/issues) page
2. Create a new issue with detailed information
3. Include your platform, Node.js version, and error messages

## 🎯 Roadmap

- [ ] Task categories and tags
- [ ] Recurring tasks
- [ ] Task priorities
- [ ] Export/Import functionality
- [ ] Cloud sync (optional)
- [ ] Desktop notifications
- [ ] Keyboard shortcuts
- [ ] Task templates

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Electron](https://electronjs.org/) - Desktop framework
- [Material-UI](https://mui.com/) - Component library
- [Vite](https://vitejs.dev/) - Build tool
- [SQLite](https://sqlite.org/) - Database

---

**Made with ❤️ using modern web technologies**