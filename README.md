# Discord Music Bot

This project is a bot designed for use on Discord servers. The bot plays music when a user provides a URL.

## Requirements

To use this Discord bot, you will need the following programs:

1. [**Node.js 16+**](https://nodejs.org) - Node.js is a JavaScript runtime.

2. [**FFmpeg**](https://ffmpeg.org/download.html) - FFmpeg is a multimedia framework for handling audio and video files.

3. [**yt-dlp**](https://github.com/yt-dlp/yt-dlp?tab=readme-ov-file#installation) - yt-dlp is a YouTube video downloader.

## Installation

### 1. Install Node.js

Download and install Node.js 16 or higher.

```bash
# Check Node.js version
node -v
```

### 2. Install FFmpeg

Download and install FFmpeg for your operating system.

After installation, add FFmpeg to your system's PATH environment variable.

```bash
# Check FFmpeg version
ffmpeg -version
```

### 3. Install yt-dlp

Download and install yt-dlp for your operating system.

After installation, add yt-dlp to your system's PATH environment variable.

**Important**: What you need is yt-dlp *binary*, **NOT** the Python package of the same name

```bash
# Check yt-dlp version
yt-dlp --version
```

### 4. Clone the Discord Bot Repository and Install Dependencies

Clone the project from GitHub and install the required Node.js packages.

```bash
# Clone the project
git clone https://github.com/abulleDev/discord-music-bot.git
cd discord-music-bot

# Install packages
npm install
```

## Usage

### 1. Set Up Environment Variables

Create a `.env` file and set your Discord bot token and client id.

You can create your bot and get the token and client ID from the [Discord Developer Portal](https://discord.com/developers/applications).

```properties
TOKEN = "YOUR_TOKEN"
CLIENT_ID = "YOUR_CLIENT_ID"
```

### 2. Register slash commands

Use the following command to register slash commands.

```bash
npm run register
```

### 3. Run the Bot

Use the following command to run the Discord bot.

```bash
npm run build
npm run start
```

To run in development mode, use:

```bash
npm run dev
```

## Contributing

To contribute to this project, fork the repository, create a new branch with your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
