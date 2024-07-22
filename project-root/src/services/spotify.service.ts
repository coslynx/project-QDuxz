import SpotifyWebApi from 'node-spotify-api';
import axios from 'axios';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../config/env';

export class SpotifyService {
  private spotifyApi: SpotifyWebApi;

  constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
    });
  }

  async search(query: string): Promise<SpotifyApi.TrackObjectFull | null> {
    try {
      const searchResults = await this.spotifyApi.search({ type: 'track', query });
      if (searchResults.tracks.items.length > 0) {
        return searchResults.tracks.items[0];
      }
      return null;
    } catch (error) {
      console.error('Error searching Spotify:', error);
      return null;
    }
  }

  async getTrack(trackId: string): Promise<SpotifyApi.TrackObjectFull | null> {
    try {
      const track = await this.spotifyApi.getTrack(trackId);
      return track;
    } catch (error) {
      console.error('Error getting track details:', error);
      return null;
    }
  }

  async getAudio(trackId: string): Promise<string | null> {
    try {
      const track = await this.getTrack(trackId);
      if (track) {
        // Prioritize FLAC format
        const audioUrl = track.external_urls.spotify;
        if (audioUrl) {
          return audioUrl;
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting audio URL:', error);
      return null;
    }
  }

  async getPlaylist(playlistId: string): Promise<SpotifyApi.TrackObjectFull[] | null> {
    try {
      const playlist = await this.spotifyApi.getPlaylist(playlistId);
      return playlist.tracks.items.map((item) => item.track);
    } catch (error) {
      console.error('Error getting playlist:', error);
      return null;
    }
  }
}