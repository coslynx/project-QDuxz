# Telegram Music Bot: FLAC Audio Sharing

This project implements a Telegram bot that utilizes the Spotify Web API to fetch songs in FLAC format and send them to a designated Telegram channel. This bot provides a convenient and efficient way for Telegram group members to access high-quality music within their group.

## Features

* **Song Requests:** Users can request songs by typing the song title or artist name in the Telegram group. The bot will search Spotify for the requested song and send the audio in FLAC format (if available) to the Telegram channel.
* **FLAC Format Retrieval:** The bot prioritizes FLAC format for audio quality. If FLAC is not available, it will fall back to the highest quality available.
* **Channel Broadcasting:** The bot broadcasts the retrieved song to the designated Telegram channel, making the song accessible to all group members.
* **User-Friendly Interface:** The bot provides clear instructions and responses to user requests. It handles errors gracefully, informing users if a song is not found or unavailable in FLAC format.
* **Authentication and Authorization:** The bot uses OAuth 2.0 for secure authentication and authorization with the Spotify API, ensuring secure access to Spotify's music catalog.
* **Error Handling:** Robust error handling mechanisms are in place to address issues such as invalid requests, API errors, and connectivity problems.

## Getting Started

### 1. Prerequisites

* Node.js:  https://nodejs.org/
* A Telegram bot token: https://core.telegram.org/bots#botfather
* A Spotify Developer account: https://developer.spotify.com/dashboard/
* A database (optional, recommended for larger deployments): MongoDB or PostgreSQL

### 2. Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/telegram-music-bot.git
```

2. Navigate to the project directory:

```bash
cd telegram-music-bot
```

3. Install dependencies:

```bash
npm install
```

### 3. Configuration

1. Create a `.env` file in the project root directory and add the following environment variables:

```
SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
DATABASE_URL=YOUR_DATABASE_URL (optional)
```

2. Replace the placeholders with your actual values:
    * `SPOTIFY_CLIENT_ID`: Obtain this from your Spotify Developer account.
    * `SPOTIFY_CLIENT_SECRET`: Obtain this from your Spotify Developer account.
    * `TELEGRAM_BOT_TOKEN`:  Get this from the BotFather on Telegram.
    * `DATABASE_URL`:  If using a database, configure the connection string here.

### 4. Running the Bot

1. Start the bot:

```bash
npm start
```

2. The bot will now be active.  You can send commands to the bot in a Telegram group or private chat.

### 5. Deployment

1.  Choose a deployment platform (e.g., Heroku, AWS).
2.  Follow the platform's instructions for deploying Node.js applications.
3.  Ensure that the environment variables are correctly set in the deployed environment. 

## Usage

* To request a song, type `/song [song title or artist name]` in the Telegram group.
* To request a playlist, type `/playlist [playlist ID]` in the Telegram group. 

## Development

* Use `npm run dev` to run the bot in development mode.
* This will enable logging and hot reloading for faster development.

## Contributing

Contributions to the project are welcome! 

1. Fork the repository.
2. Create a branch for your feature or bug fix.
3. Commit your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.