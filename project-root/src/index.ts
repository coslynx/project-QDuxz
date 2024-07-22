import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { SpotifyService } from './services/spotify.service';
import { TelegramService } from './services/telegram.service';
import { Logger } from './utils/logger.utils';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN as string);
const spotifyService = new SpotifyService();
const telegramService = new TelegramService(bot);

// Handle song requests
bot.command('song', async (ctx) => {
  try {
    const songQuery = ctx.message.text.split(' ')[1];
    if (!songQuery) {
      return ctx.reply('Please provide a song title or artist name.');
    }

    const track = await spotifyService.search(songQuery);
    if (!track) {
      return ctx.reply('Sorry, no song found matching your request.');
    }

    const audioUrl = await spotifyService.getAudio(track.id);
    if (!audioUrl) {
      return ctx.reply('Sorry, this song is not available in FLAC format.');
    }

    await telegramService.sendAudio(ctx.chat.id, audioUrl);
    ctx.reply('Here is your requested song!');
  } catch (error) {
    Logger.error('Error handling song request:', error);
    ctx.reply('An error occurred while processing your request.');
  }
});

// Handle playlist requests
bot.command('playlist', async (ctx) => {
  try {
    const playlistId = ctx.message.text.split(' ')[1];
    if (!playlistId) {
      return ctx.reply('Please provide a playlist ID.');
    }

    const playlistTracks = await spotifyService.getPlaylist(playlistId);
    if (!playlistTracks) {
      return ctx.reply('Sorry, playlist not found.');
    }

    for (const track of playlistTracks) {
      const audioUrl = await spotifyService.getAudio(track.id);
      if (audioUrl) {
        await telegramService.sendAudio(ctx.chat.id, audioUrl);
        ctx.reply('Playing next track from the playlist...');
      } else {
        ctx.reply(`Skipping track ${track.name} as it's not available in FLAC format.`);
      }
    }

    ctx.reply('Playlist finished!');
  } catch (error) {
    Logger.error('Error handling playlist request:', error);
    ctx.reply('An error occurred while processing your request.');
  }
});

// Start the bot
bot.launch().then(() => {
  Logger.info('Bot started successfully!');
});

// Enable graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT')).once('SIGTERM', () => bot.stop('SIGTERM'));