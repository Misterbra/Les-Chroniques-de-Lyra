import { useEffect, useState } from 'react';

/// <reference types="youtube" />

const YouTubeBackground = ({ videoId }: { videoId: string }) => {
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    // Load the IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag?.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Replace the 'player' element with an <iframe> and YouTube player after the API code downloads.
    const onYouTubeIframeAPIReady = () => {
      const ytPlayer = new YT.Player('player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          showinfo: 0,
          loop: 1,
          modestbranding: 1,
          playlist: videoId,
        },
        events: {
          onReady: (event: YT.PlayerEvent) => {
            setPlayer(event.target);
            event.target.setVolume(10); // Set the volume to a low level if desired
            event.target.playVideo(); // Ensure video starts playing
          },
          onError: (event: YT.OnErrorEvent) => {
            console.error('YouTube Player error:', event.data); // Error log
          },
        },
      });
    };

    (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  }, [videoId]);

  const togglePlayPause = () => {
    if (player) {
      if (playing) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setPlaying(!playing);
    }
  };

  return (
    <div className="relative">
      <div id="player" className="hidden"></div>
      <button
        onClick={togglePlayPause}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-full"
      >
        {playing ? 'Pause 🎵' : 'Play 🎵'}
      </button>
    </div>
  );
};

export default YouTubeBackground;
