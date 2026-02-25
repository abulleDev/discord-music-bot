FROM node:22

# Install curl & ffmpeg
RUN apt-get update && apt-get install -y \
  curl \
  ffmpeg \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Install yt-dlp
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
  chmod +x /usr/local/bin/yt-dlp

# Copy source
COPY ./src /app/src
COPY [ "./.env", "./package.json", "./package-lock.json", "tsconfig.json", "/app/" ]

# Initial setting
WORKDIR /app
RUN npm install && npm run build && npm run register

# Start application
CMD [ "npm", "run", "start" ]