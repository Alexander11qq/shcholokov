import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import posts, { compareProjects } from '../../posts';
import styles from './DetailsPost.module.css';
import { ProjectMedia } from './ProjectMedia';

const ordered = [...posts].sort(compareProjects);

export function DetailsPost() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dialog = useRef<HTMLDialogElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const descriptionRef = useRef<HTMLElement>(null);
  const index = ordered.findIndex(p => String(p.id) === id);
  const post = ordered[index];
  const previous = ordered[index-1];
  const next = ordered[index+1];

  useEffect(() => {
    const element = dialog.current;
    const focused = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    const title = document.title;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      document.title = title;
      focused?.focus({preventScroll:true});
    };
  }, []);

  useEffect(() => {
    document.title = post ? `${post.title} — Alex Schyolokov` : 'Проект не найден — Alex Schyolokov';
    scroller.current?.scrollTo({top:0});
    descriptionRef.current?.scrollTo({top:0});
    closeButton.current?.focus({preventScroll:true});
  }, [post]);

  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="project-heading" onCancel={e=>{e.preventDefault();navigate('/');}} onClick={e=>{if(e.target===e.currentTarget)navigate('/');}}>
    <div className={styles.panel}>
      <header className={styles.toolbar}><span>ALEX SCHYOLOKOV <span className={styles.separator}>/</span> MULTIMEDIA DEVELOPER</span><button ref={closeButton} onClick={()=>navigate('/')} aria-label="Закрыть проект">К каталогу <span>×</span></button></header>
      <div ref={scroller} className={styles.scroll}>
        {!post ? <div className={styles.empty}><h1 id="project-heading">Проект не найден</h1><p>В каталоге нет работы с таким адресом.</p><Link to="/">Вернуться к работам ↗</Link></div> : <>
          <div className={styles.heading}><div className={styles.eyebrow}><span>{post.id<0?'ПРОТОТИП / ИССЛЕДОВАНИЕ':'ПРОЕКТ / ИНТЕРАКТИВНЫЙ ОПЫТ'}</span><span>{String(index+1).padStart(2,'0')} / {ordered.length}</span></div><h1 id="project-heading">{post.title}</h1><p>{post.shortDescription}</p></div>
          <ProjectMedia key={`${post.id}-${searchParams.get('media')}`} post={post} previewPhotos={searchParams.get('media') === 'photos'} />
          <div className={styles.content}><section ref={descriptionRef} tabIndex={0} aria-label="Описание проекта" className={styles.description}><div className={styles.eyebrow}>01 / ИДЕЯ И РЕАЛИЗАЦИЯ</div><h2>{post.id<0?'Об эксперименте':'О проекте'}</h2><div className={styles.paragraphs}>{post.description.map(p=><p key={p.id} dangerouslySetInnerHTML={{__html:p.paragraph}} />)}</div><div className={styles.facts}><div className={styles.eyebrow}>02 / ИНСТРУМЕНТЫ</div><h2>Стек технологий</h2><ul>{post.tags.map(tag=><li key={tag}>{tag}</li>)}</ul></div></section></div>
          <nav className={styles.navigation} aria-label="Другие работы">{previous?<Link to={'/details-post/'+previous.id}><span>← ПРЕДЫДУЩАЯ РАБОТА</span><strong>{previous.title}</strong></Link>:<div/>}{next?<Link to={'/details-post/'+next.id}><span>СЛЕДУЮЩАЯ РАБОТА →</span><strong>{next.title}</strong></Link>:<Link to="/"><span>ВЫ ПОСМОТРЕЛИ ПОСЛЕДНЮЮ РАБОТУ</span><strong>Вернуться к каталогу ↗</strong></Link>}</nav>
        </>}
      </div>
    </div>
  </dialog>;
}
