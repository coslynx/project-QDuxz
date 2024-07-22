import 'dotenv/config';

export const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string;
export const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET as string;
export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string;
export const DATABASE_URL = process.env.DATABASE_URL as string; // Optional, if using a database