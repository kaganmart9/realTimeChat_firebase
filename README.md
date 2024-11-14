# Real-Time Chat Application

Welcome to the **Real-Time Chat Application**! This web application allows users to communicate in real-time by leveraging Firebase's backend infrastructure for authentication, real-time messaging, and data management. The application features a sleek, dark theme inspired by GitHub's dark mode, providing an elegant user experience.

## Features

- **User Authentication**: Secure user authentication with Firebase, allowing users to log in using their email and password.
- **Real-Time Messaging**: Messages are shared in real-time, ensuring instant communication between all connected users.
- **Clear Chat History**: Users have the option to clear the entire chat history for all users.
- **Responsive Design**: The application uses Bootstrap to ensure it is fully responsive and mobile-friendly.
- **GitHub-Inspired UI**: The dark mode theme brings a modern look and feel inspired by GitHub's user interface.

## Technologies Used

- **HTML/CSS/JavaScript**: For the front-end structure, style, and interactivity.
- **Firebase**: Provides the backend services for authentication, real-time database, and storage.
- **Bootstrap**: CSS framework used for responsive design and styling.

## Setup Instructions

Follow these steps to set up and run the project locally:

1. **Clone the Repository**
   ```sh
   git clone https://github.com/kaganmart9/realTimeChatApp_firebase.git
   cd real-time-chat-app
   ```

2. **Configure Firebase**
   - Go to the Firebase console and create a new project.
   - Copy the configuration details (`apiKey`, `authDomain`, `databaseURL`, etc.) and update the Firebase configuration in the `app.js` file:
     ```js
     var firebaseConfig = {
         apiKey: "YOUR_API_KEY",
         authDomain: "YOUR_AUTH_DOMAIN",
         databaseURL: "YOUR_DATABASE_URL",
         projectId: "YOUR_PROJECT_ID",
         storageBucket: "YOUR_STORAGE_BUCKET",
         messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
         appId: "YOUR_APP_ID"
     };
     firebase.initializeApp(firebaseConfig);
     ```

3. **Install Dependencies**
   - The application uses external resources like Bootstrap and Firebase, which are linked via CDN in the `index.html` file.
   - No additional installation steps are required for dependencies.

4. **Run the Application**
   - Open `index.html` in your favorite browser to launch the application.

## How It Works

- Users start by logging in using the login form.
- Once logged in, users can send and receive messages in real-time.
- The chat window displays messages with the user's name, message content, and timestamp.
- Users can clear the chat history for everyone by clicking the "Clear History" button.
- To log out, simply click the "Logout" button.

## Folder Structure

- **index.html**: Contains the main HTML structure and elements of the web application.
- **app.js**: Handles Firebase initialization, user authentication, real-time messaging, and other core functionalities.
- **styles**: All styles are embedded directly within `index.html` using a `<style>` tag for convenience.

## Customization

- **Theme**: The theme can be easily customized by modifying the CSS styles within `index.html`. Colors have been chosen to resemble GitHub's dark mode, but feel free to personalize it.
- **Authentication**: Currently, only email/password login is supported. To add other authentication methods (e.g., Google, Facebook), refer to the Firebase documentation and modify `app.js` accordingly.


## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue to suggest improvements or report bugs.

## Contact

For any questions or suggestions, please reach out to me via [GitHub](https://github.com/kaganmart9) or email me at [dev.alikaganmart@gmail.com].

