# Gym App

A full-stack application for gym management and fitness tracking.

## Project Structure

This project consists of two main components:

- **Frontend**: A Flutter application located in the `frontend/` directory
- **Backend**: A NestJS API server located in the `backend/` directory

## Getting Started

### Prerequisites

- [Flutter](https://flutter.dev/docs/get-started/install) (version 3.0.0 or higher)
- [Node.js](https://nodejs.org/) (version 14.0.0 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Running the Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run start:dev
   ```

The backend server will be available at http://localhost:3000.

### Running the Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   flutter pub get
   ```

3. Run the application:
   ```
   flutter run -d chrome
   ```
   
   Or for other platforms:
   ```
   flutter run -d android  # For Android
   flutter run -d ios      # For iOS (macOS only)
   flutter run -d windows  # For Windows (requires Visual Studio)
   ```

## Development

- The backend is built with NestJS, TypeORM, and MySQL
- The frontend is built with Flutter and follows a provider-based architecture

## License

This project is licensed under the MIT License - see the LICENSE file for details.
