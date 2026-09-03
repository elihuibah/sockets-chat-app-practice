# Real-Time WebSocket Chat Application

A lightweight, real-time chat application built using Node.js and native WebSockets (`ws`), featuring an interactive client interface with message reactions and an emoji picker.

---

## Features

- **Real-Time Communication**: Full-duplex messaging using WebSockets.
- **Dynamic Connection**: Connect to any host IP and port directly from the client UI.
- **Message Reactions**: Hover or tap on any message to react with emojis (👍, ❤️, 😆, 😮, 😢, 😡), complete with dynamic counts and toggle functionality (Messenger/Instagram style).
- **Emoji Picker**: Integrated floating palette with over 70 emojis to insert directly into messages.
- **Lightweight Architecture**: No complex frontend frameworks or heavy dependencies required.

---

## Project Structure

```text
├── .gitignore         # Prevents node_modules from being tracked
├── index.html         # Client interface (HTML, CSS, JS)
├── package.json       # Project metadata and dependencies
├── package-lock.json  # Dependency tree lockfile
├── server.js          # Node.js WebSocket backend
└── README.md          # Documentation
