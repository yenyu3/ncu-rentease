import { useState, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';

const MusicPlayer = ({ songs, isVisible, onClose }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  if (!isVisible || !songs || songs.length === 0) return null;

  const currentSong = songs[currentSongIndex];
  const duration = currentSong.lengthMinutes * 60; // 轉換為秒

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // 這裡會連接到實際的音樂 API
    console.log(`${isPlaying ? 'Pausing' : 'Playing'}: ${currentSong.title}`);
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => 
      prev === songs.length - 1 ? 0 : prev + 1
    );
    setCurrentTime(0);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => 
      prev === 0 ? songs.length - 1 : prev - 1
    );
    setCurrentTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 模擬播放進度（實際應用中會從音樂 API 獲取）
  const progress = (currentTime / duration) * 100;

  return (
    <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="p-4">
        {/* 播放器標題 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Music size={16} className="text-primary mr-2" />
            <span className="text-sm font-medium text-accent">步行歌單</span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-sm"
          >
            收起
          </button>
        </div>

        {/* 當前歌曲資訊 */}
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mr-3">
            <Music size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-accent text-sm">{currentSong.title}</h4>
            <p className="text-xs text-gray-600">{currentSong.artist}</p>
          </div>
          <div className="text-xs text-gray-500">
            {currentSongIndex + 1} / {songs.length}
          </div>
        </div>

        {/* 進度條 */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 控制按鈕 */}
        <div className="flex items-center justify-center space-x-6">
          <button 
            onClick={prevSong}
            className="text-gray-600 hover:text-primary"
          >
            <SkipBack size={20} />
          </button>
          
          <button 
            onClick={togglePlay}
            className="bg-primary text-white p-3 rounded-full hover:bg-primary/80 transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <button 
            onClick={nextSong}
            className="text-gray-600 hover:text-primary"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Spotify 連接提示 */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500 mb-2">
            🎵 想要實際播放音樂嗎？
          </p>
          <button className="bg-green-500 text-white px-4 py-2 rounded-full text-xs hover:bg-green-600 transition-colors">
            連接 Spotify
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;