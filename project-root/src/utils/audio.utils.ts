import { Ffmpeg } from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';

export class AudioUtils {
  private ffmpeg: Ffmpeg;

  constructor() {
    this.ffmpeg = new Ffmpeg();
  }

  /**
   * Converts an audio file to a desired format.
   * @param inputPath The path to the input audio file.
   * @param outputPath The path to the output audio file.
   * @param format The desired output audio format (e.g., 'flac', 'mp3').
   * @returns A promise that resolves when the conversion is complete.
   */
  async convertAudio(inputPath: string, outputPath: string, format: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ffmpeg
        .input(inputPath)
        .audioCodec(format)
        .save(outputPath)
        .on('end', () => resolve())
        .on('error', (err) => reject(err));
    });
  }

  /**
   * Gets the duration of an audio file in seconds.
   * @param filePath The path to the audio file.
   * @returns The duration of the audio file in seconds.
   */
  async getAudioDuration(filePath: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.ffmpeg
        .ffprobe(filePath)
        .on('end', (data) => {
          const duration = parseFloat(data.format.duration);
          resolve(duration);
        })
        .on('error', (err) => reject(err));
    });
  }

  /**
   * Resizes an audio file to a specific duration.
   * @param inputPath The path to the input audio file.
   * @param outputPath The path to the output audio file.
   * @param duration The desired duration in seconds.
   * @returns A promise that resolves when the resizing is complete.
   */
  async resizeAudio(inputPath: string, outputPath: string, duration: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ffmpeg
        .input(inputPath)
        .duration(duration)
        .save(outputPath)
        .on('end', () => resolve())
        .on('error', (err) => reject(err));
    });
  }

  /**
   * Downloads an audio file from a URL.
   * @param url The URL of the audio file.
   * @param outputPath The path to the downloaded audio file.
   * @returns A promise that resolves when the download is complete.
   */
  async downloadAudio(url: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ffmpeg
        .input(url)
        .save(outputPath)
        .on('end', () => resolve())
        .on('error', (err) => reject(err));
    });
  }

  /**
   * Gets the audio format of a file.
   * @param filePath The path to the audio file.
   * @returns The audio format of the file (e.g., 'flac', 'mp3').
   */
  async getAudioFormat(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.ffmpeg
        .ffprobe(filePath)
        .on('end', (data) => {
          resolve(data.format.format_name);
        })
        .on('error', (err) => reject(err));
    });
  }

  /**
   * Checks if a file exists at a given path.
   * @param filePath The path to the file.
   * @returns True if the file exists, false otherwise.
   */
  fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  /**
   * Removes a file from the file system.
   * @param filePath The path to the file to remove.
   */
  removeFile(filePath: string): void {
    if (this.fileExists(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}