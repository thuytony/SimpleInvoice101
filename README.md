# SimpleInvoice - React Native Mobile Application

# Introduction

Hello, I am Nguyen Van Thuy, applying for the position of Senior React Native Developer.
This repository contains the complete source code that I have developed based on your requirements, along with a demo video and necessary documentation for another React Native developer to read and understand my ideas.
I hope to have the opportunity to talk with you if my test meets the required standards.

Thank you!

## Table of Contents
1. [Video demo](#1-video-demo)
2. [Project Structure](#2-project-structure)
3. [Technology Stack](#3-technology-stack)
4. [Key Features](#4-key-features)
5. [Development Guidelines](#5-development-guidelines)
6. [Security Implementations](#6-security-implementations)
7. [Testing](#7-testing)
8. [Future Improvements](#8-future-improvements)
9. [How to run source code?](#9-how-to-run-source-code)

## 1. Video demo
1. [App demo video](https://drive.google.com/file/d/1kO4bSShNziXFZke9JPpwM8nTRiCGVv5i/view?usp=sharing)
2. [E2E test demo video with Detox](https://drive.google.com/file/d/15AJCzzGu6mJSfPolsw_SQOYiXVxJfNCL/view?usp=sharing)

## 2. Project Structure
![Project Structure](https://i.ibb.co/xKH9dq7V/Simple-Invoice-project-structure.png)


## 3. Technology Stack
- **Framework**: React Native
- **Language**: TypeScript
- **State Management**: 
  - Redux Toolkit (global state)
  - React Query (server state)
- **UI Components**: React Native Paper
- **Form Handling**: React Hook Form + Yup
- **HTTP Client**: Axios
- **Storage**: React Native Encrypted Storage
- **Testing**: Jest, Detox




## 4. Key Features:
### Authentication
- Secure token storage using React Native Encrypted Storage
- API request interceptors for token management
```typescript
// Example of secure token storage
await EncryptedStorage.setItem('access_token', token);
await EncryptedStorage.setItem('refresh_token', refreshToken);
```

### API Layer
- Centralized API configuration
- Request/Response interceptors
- Error handling
- Rate limiting implementation
```typescript
// Example of API instance configuration
const mainAxios = axios.create({
  baseURL: Config.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### Form Validation: React Form + Yup
- Centralized validation schemas
- Type-safe form handling
- Real-time validation
```typescript
// Example of validation schema
export const invoiceSchema = yup.object({
  customer: yup.object({
    firstName: yup.string().required(),
    email: yup.string().email().required()
  }),
  amount: yup.number().positive().required()
 });
```


## 5. Development Guidelines

### Code Style
- Follow TypeScript
- Use functional components with hooks
- Use eslint + prettier to standardize code style

### State Management
- Use Redux for global application state
- Use React Query for server state management
- Implement proper caching strategies with React Query

## 6. Security Implementations

### Current Security Features
- Encrypted token storage
- API request authentication
- Input validation

### Planned Security Improvements
1. Rate limiting
2. SSL Certificate Pinning

```typescript
// Example SSL Pinning configuration
const certificatePinning = {
  'domain.com': {
    'pin-sha256': ['sha256/XXXX', 'sha256/YYYY']
  }
};
```


3. Code Obfuscation
- Implement ProGuard for Android
- Implement DexGuard for additional security

## 7. Testing
### E2E Testing
```bash
Build for E2E testing
 yarn build:e2e
Run E2E tests
 yarn test:e2e
```

## 8. Future Improvements

### Short Term
1. Implement refresh token mechanism
2. Move sensitive data to environment variables: using react-native-config
3. Add SSL pinning
4. Show popup, general loading using Modal + Redux
5. Use CICD to automatically check coding style, build and release new packages.

### Long Term
1. Add biometric authentication
2. Improve app performance
3. Add analytics and crash reporting


---

## 9. How to run source code?

### Prerequisites
- Node.js >= 16
- Yarn
- React Native CLI
- XCode (for iOS)
- Android Studio (for Android)

### Installation

```bash
Clone the repository
 git clone [repository-url]
Install dependencies
 yarn install
IOS specific
 npx pod-install
```


### Running the App
```bash
Start Metro bundler
yarn start
Run on iOS
yarn ios
Run on Android
yarn android
```