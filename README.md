# Author

<div align="center">
  <img src="https://i.imgur.com/2Co5ddF.jpeg" alt="Profile Image" width="120" height="120" style="border-radius: 50%;">
</div>
<div align="center">
  <p><strong>Joshua Apostol</strong></p>
</div>

<div align="center">
  <h2><strong>NASH BOT</strong></h2>
</div>

<div align="center">
  <p>Welcome to NASH BOT - your ultimate companion for managing Facebook group chats with ease!</p>
</div>

## HOW TO MAKE COMMAND?
```javascript
module.exports = {
  name: "greet",
  description: "Greets the user's but this an example cmd",
  nashPrefix: true, // Requires NashBot prefix to work
  role: "admin", //it depends on you what you put admin or user 
  execute: (api, event, args, prefix) => {
    // Sends a greeting message
    api.sendMessage(`Hello there Thanks for using NashBot`, event.threadID);
  },
};
```


## Features

- **Command Handling**: 
  - Supports dynamic command registration.
  - Allows commands to be prefixed for easier access.
  - Role-based command execution to restrict access to admin users.

- **Automatic Login**: 
  - Automatically logs in using saved app state credentials.
  - Maintains user sessions and handles reconnections gracefully.

- **Event Handling**: 
  - Listens for events and executes corresponding handlers.
  - Detects typing status and responds accordingly.

- **Custom Configuration**: 
  - Configurable through a `config.json` file.
  - Allows setting command prefixes and admin user IDs.

## Troubleshooting
- **Issue:** Bot fails to log in.
  - **Solution:** Check your credentials in `config.json` and ensure your app state is valid.
  
- **Issue:** Commands not responding.
  - **Solution:** Ensure the command prefix is set correctly in `config.json`.

# Facebook AppState C3C Tutorial 

## Overview
This project allows you to utilize the Facebook app state for your bot. Follow the instructions below to download the C3C extension and obtain your app state.

## Requirements
- **Kiwi Browser** (available on the Google Play Store)
- **C3C Extension** (available on GitHub)

## Step 1: Download the C3C Extension
1. **Download the C3C ZIP File**:
   - Go to the [C3C GitHub Releases page](https://github.com/c3cbot/c3c-ufc-utility/releases/tag/2.0.1)
   - Download the ZIP file of the latest release.

2. **Extract the ZIP File**:
   - Locate the downloaded ZIP file in your device’s file manager and extract its contents.

## Step 2: Install the C3C Extension in Kiwi Browser
1. **Open Kiwi Browser**:
   - Launch the Kiwi Browser on your device.

2. **Access Extensions**:
   - Tap on the three-dot menu in the upper-right corner.
   - Select **Extensions** from the dropdown.

3. **Enable Developer Mode**:
   - Toggle the **Developer mode** option at the top right corner.

4. **Install the Extension**:
   - Tap on **Load unpacked** and select the extracted folder from the ZIP file.

## Step 3: Obtain Your Facebook AppState
1. **Log into Facebook**:
   - With the C3C extension installed, navigate to the Facebook website and log in to your account.

2. **Access AppState**:
   - Click on the C3C extension icon in the Kiwi Browser.
   - Use the extension to generate your app state.

3. **Copy the AppState**:
   - Once generated, copy the app state JSON data.

## Step 4: Use AppState in Your Project
1. **Replace AppState in Your Code**:
   - In your project, locate the section where you need to input your app state.
   - Paste the copied app state JSON data into the appropriate field.

2. **Run Your Project**:
   - Start the project to see the bot in action using the app state.

## Note
Make sure to keep your app state secure and do not share it publicly. If you encounter any issues or need further assistance, please refer to the documentation or community forums.

## Version
This project is currently at version 2.4.0. If you modify the version number in the code, it will throw an error indicating that the version is outdated.
