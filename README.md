# Stargazers Viewer

This is a mobile application to view the stargazers of a GitHub repository.

## Getting Started

The project is developed using React Native, specifically with the Expo framework. The application can be executed on both an emulator and a physical device using Expo Go.

_Note: The app has been developed with Android as the target platform. While it should work on an iOS simulator (and can be built for iOS devices with minimal configuration), it may present graphical bugs and unexpected behaviors_

## Prerequisites

- Node.js (version 18)
- Mestro (e2e tests)

## Running on Expo Go

```bash
# Clone the repository
$ git clone https://github.com/g-cappai/stargazer-app

# CD into the repository
$ cd stargazer-app

# Install dependencies
$ yarn

# Start development server
$ yarn start
```

Pressing `s` allows you to switch between the development build and Expo Go. After selecting Expo Go, press `a` to launch the application on an emulator. Additionally, by installing Expo Go on your phone and scanning the QR code, you can execute the app with ease.

## Building the application

The app is already configured to be built for Android (development build). To run the build process, you need to install EAS CLI and register with Expo.
Run `yarn build:android:dev:local` to run the build process locally using EAS.

Information about development builds, setting up the emulator, and more can be found in the [Expo official documentation](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&platform=android&device=simulated)

## e2e

[Maestro](https://maestro.mobile.dev/getting-started/installing-maestro) is used for end-to-end (e2e) testing. You need a development build installed on the emulator in order to run tests. 

With everything set up, run `yarn e2e` to launch tests.