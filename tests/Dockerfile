FROM node:13

# Check available versions here: https://www.ubuntuupdates.org/package/google_chrome/stable/main/base/google-chrome-stable
ENV CHROME_VERSION=88.0.4324.182-1
RUN apt update && \
    apt install -y xvfb && \
    wget --no-verbose -O /tmp/chrome.deb \
    https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb && \
    apt install -y /tmp/chrome.deb && \
    rm /tmp/chrome.deb && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm i
COPY . /app

