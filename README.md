# BluesLetter

BluesLetter is an open source platform for Bluesky users to manage their online presence, engage with their audience, and monetize their content - all built on the AT Protocol.

<div style="background-color: #ffdddd; border-left: 6px solid #f44336; padding: 10px;">
  <strong>Note:</strong> This project is a work in progress and will take time to build. Your patience and contributions are appreciated!
</div>

## Features

- 🔐 OAuth-based Bluesky authentication
- 📝 Advanced post creation and thread management
- 📊 Basic analytics and insights
- 📅 Post scheduling
- 💾 Draft saving system
- 📚 Content organization with bookmarks and tags
- 🌐 Custom domain blog integration
- 📧 Newsletter system with subscriber management
- 💰 Monetization options for creators

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- AT Protocol SDK

## Getting Started

## TODO

- [ ] Implement OAuth-based auth flow
- [ ] Add profile dashboard with basic stats
- [ ] Build post composer with rich text support
- [ ] Create scheduling system
- [ ] Add draft management
- [ ] Integrate blog functionality
- [ ] Build newsletter system
- [ ] Add monetization features
- [ ] Improve analytics
- [ ] Add team collaboration features
- [ ] Create developer API
- [ ] Add self-hosted PDS support

## Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/bluesletter.git
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   - **Create a 32-character secret for the cookie**: Add `COOKIE_SECRET=<your-32-character-secret>` to your `.env.local` file.

4. **Run the development server**

   ```bash
   npm run dev
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE.md for details

## Support

- [Documentation](https://docs.bluesletter.com)
- [Issues](https://github.com/yourusername/bluesletter/issues)
- [Discussions](https://github.com/yourusername/bluesletter/discussions)
