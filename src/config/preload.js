/**
 * MP3 and OGG-Vorbis are the most heavily supported
 * audio formats for modern browsers
 *
 * OGG-Vorbis is optionally set as the fallback audio
 */
export class AudioFile {
  constructor(key, mp3, ogg) {
    this.key = key;
    this.mp3 = mp3;
    this.ogg = ogg;
  }
}

const assetDir = './assets';

export const config = {
  // spritesheets
  ssPath: `${assetDir}/spritesheets/`,
  sheets: [
    'misimi',
  ],

  // audio
  audioPath: `${assetDir}/audio/`,
  audioFiles: [
    new AudioFile('sfx', '131660__bertrof__game-sound-correct.wav'),
    new AudioFile('gameOver', '406113__daleonfire__dead.wav'),
  ],
};
