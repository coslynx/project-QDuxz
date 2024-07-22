import { Context, Telegraf } from 'telegraf';

export class TelegramService {
  private bot: Telegraf;

  constructor(bot: Telegraf) {
    this.bot = bot;
  }

  sendMessage(chatId: number, message: string): Promise<void> {
    return this.bot.telegram.sendMessage(chatId, message);
  }

  sendAudio(chatId: number, audioUrl: string): Promise<void> {
    return this.bot.telegram.sendAudio(chatId, audioUrl);
  }

  registerCommand(command: string, handler: (ctx: Context) => Promise<void>): void {
    this.bot.command(command, handler);
  }
}