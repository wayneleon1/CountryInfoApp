# Country Explorer App

A React Native mobile application that allows users to explore countries and their details, with support for both light and dark themes.

## Features

- View a list of all countries
- Search countries by name
- View detailed information about each country
- Toggle between light and dark themes
- Responsive design for various screen sizes

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac users) or Android Studio (for Android development)

## Installation

1. Clone the repository:
```bash
git clone <https://github.com/wayneleon1/CountryInfoApp.git>
cd COUNTRYINFOAPP
```

2. Install dependencies:
```bash
npm install
```

3. Install required packages:
```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install nativewind
npm install --dev tailwindcss@3.3.2
npm install react-native-heroicons
npm install react-native-safe-area-context
npm install react-native-screens
```
## Running the App

1. Start the development server:
```bash
npx expo start
```

2. Use the Expo Go app on your device or run on a simulator:
- Press `i` for iOS simulator
- Press `a` for Android simulator
- Scan QR code with Expo Go app on your device

## Dependencies

- React Native
- Expo
- React Navigation
- NativeWind (TailwindCSS for React Native)
- React Native Heroicons
- React Native Safe Area Context

## API

The app uses the REST Countries API (https://restcountries.com/v3.1/all) to fetch country data.
