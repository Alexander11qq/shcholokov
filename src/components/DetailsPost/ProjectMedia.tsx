import { useState } from 'react';
import type { PortfolioProject } from '../../posts';
import styles from './DetailsPost.module.css';

export function ProjectMedia({ post, previewPhotos = false }: { post: PortfolioProject; previewPhotos?: boolean }) {
  const photos = post.photos?.length ? post.photos : [{ src: post.preview, alt: post.title }];
  const hasVideo = Boolean(post.linkYouTube) && !previewPhotos;
  const [mode, setMode] = useState(hasVideo ? 'video' : 'photos');
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);
  const photo = photos[active];
  const move = (step: number) => { setActive((active + step + photos.length) % photos.length); setFailed(false); };
  return <>
    <div className={styles.video}>
      {mode === 'video' && hasVideo ? <iframe src={post.linkYouTube} title={`Видеодемонстрация: ${post.title}`} allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen /> :
        <div className={styles.gallery} role="region" aria-label="Фотографии проекта" tabIndex={photos.length > 1 ? 0 : undefined} onKeyDown={event => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
        }}>
          {failed ? <p className={styles.photoError}>Не удалось загрузить фото. <a href={photo.src} target="_blank" rel="noreferrer">Открыть оригинал ↗</a></p> : <img key={photo.src} src={photo.src} alt={photo.alt} onError={() => setFailed(true)} />}
          {photos.length > 1 && <div className={styles.photoControls}><button onClick={() => move(-1)} aria-label="Предыдущее фото">←</button><span aria-live="polite">{active + 1} / {photos.length}</span><button onClick={() => move(1)} aria-label="Следующее фото">→</button></div>}
        </div>}
    </div>
    <div className={styles.mediaFooter}>
    {mode === 'photos' && photos.length > 1 && <div className={styles.thumbnails} role="group" aria-label="Выбрать фотографию">
      {photos.map((item, index) => <button key={item.src} aria-label={`Фото ${index + 1}: ${item.alt}`} aria-pressed={index === active} onClick={() => { setActive(index); setFailed(false); }}>
        <img src={item.src} alt="" loading="lazy" />
      </button>)}
    </div>}
    <div className={styles.videoCaption}>
      {hasVideo && post.photos?.length ? <div className={styles.mediaModes}><button aria-pressed={mode === 'video'} onClick={() => setMode('video')}>Видео</button><button aria-pressed={mode === 'photos'} onClick={() => setMode('photos')}>Фото · {photos.length}</button></div> : mode === 'video' ? <span>ДЕМОНСТРАЦИЯ В РАБОТЕ</span> : null}
      <a href={mode === 'video' ? post.linkYouTube : photo.src} target="_blank" rel="noreferrer">{mode === 'video' ? 'Открыть видео' : 'Открыть фото'} ↗</a>
    </div>
    </div>
  </>;
}
