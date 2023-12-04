"use client";
import styles from './styles.module.scss';

const VideoPlayerX = () => {
  return (
    <>
     <div>
      <video  controls>
        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>
    </div>
    </>
  );
};

export default VideoPlayerX;
