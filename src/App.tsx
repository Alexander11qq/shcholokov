import { useState } from 'react';
import { Link } from 'react-router-dom';
import posts, { compareProjects } from './posts';
import './styles/studio.css';
import './styles/catalog.css';
import './styles/laboratory.css';
import './styles/intro.css';

const categories = ['Все работы', 'Инсталляции', 'Прототипы'];
function category(p: typeof posts[number]) { return p.id < 0 ? 'Прототипы' : 'Инсталляции'; }
function App() {
  const [filter,setFilter]=useState('');
  const [technology,setTechnology]=useState('');
  const resetFilters=()=>{setFilter('');setTechnology('');};
  const [layout,setLayout]=useState('wall');
  const list=[...posts].sort(compareProjects);
  const visible=list.filter(p=>(!technology||p.tags.includes(technology))&&(!filter||category(p)===filter));
  return <div className="studio">
    <header className="studio-header"><a className="wordmark" href="#">AS<span>Alex Schyolokov<br/>Multimedia Developer</span></a><nav aria-label="Навигация"><a href="#work">Все работы <sup>{posts.length}</sup></a><a href="https://t.me/scholok" target="_blank" rel="noreferrer">Telegram ↗</a></nav></header>
    <main>
      <section className="studio-hero"><h1 className="hero-identity"><span className="sr-only">Alex Schyolokov</span><img src={`${import.meta.env.BASE_URL}artwork/alex-schyolokov-particles.svg`} alt="" aria-hidden="true" width="1080" height="780" loading="eager" /></h1><div className="hero-lower"><div className="hero-welcome"><h2>Приветствую!</h2><p>Меня зовут Александр Щёлоков (Multimedia Developer). Однажды я начал изучать интерактивные технологии и уже не смог остановиться. Любопытство постепенно превратилось в практику: разработку приложений, игр и мультимедийных инсталляций.</p><p>Мне интересно, как цифровой мир откликается на человека: движение меняет изображение, голос запускает действие, а прикосновение оживляет пространство. Так зритель становится участником - в музейной экспозиции, игре или небольшом эксперименте.</p><p>Каждый проект - это возможность попробовать новую механику и найти для технологии выразительное применение. Ниже собраны и реализованные работы и прототипы.</p></div><a className="text-link" href="#work">Войти в мастерскую <span>↓</span></a></div><div className="hero-foot"><span>ПРОЕКТЫ И ПРОТОТИПЫ ↓</span></div></section>
      <section id="work" className={'work-section layout-'+layout}><div className="section-heading"><span className="eyebrow">01 / ПОЛНЫЙ КАТАЛОГ</span><h2>Проекты <em>& прототипы</em></h2></div>
      <div className="work-tools"><div className="filters" role="group" aria-label="Категория работ">{categories.map(c=><button key={c} aria-pressed={c==='Все работы'?!filter:filter===c} onClick={()=>setFilter(c==='Все работы'?'':c)}>{c}{(c==='Все работы'?!filter:filter===c)?' ↗':''}</button>)}</div><div className="catalog-controls"><div className="view-switch" role="group" aria-label="Представление каталога"><button aria-pressed={layout==='wall'} onClick={()=>setLayout('wall')}>Сетка</button><button aria-pressed={layout==='index'} onClick={()=>setLayout('index')}>Индекс</button></div></div></div>
      {(technology||filter)&&<div className="catalog-status">{technology&&<button className="active-technology" onClick={()=>setTechnology('')}>{technology} ×</button>}{(technology||filter)&&<button className="reset-filters" onClick={resetFilters}>Сбросить фильтры ↺</button>}</div>}
      <div className="project-grid">{visible.map((p,i)=><article className={'project '+(p.id<0?'is-prototype':'is-project')} key={p.id}><Link className="project-image" aria-label={'Открыть проект: '+p.title} to={'/details-post/'+p.id}><img src={p.preview} alt={p.title} loading="lazy" onError={e=>{e.currentTarget.style.opacity='0';}}/><span className="image-fallback" aria-hidden="true">{p.id<0?'EXPERIMENT':'PROJECT'}<br/>{String(i+1).padStart(2,'0')}</span><span className="project-play">Открыть ↗</span><span className="project-index">{String(i+1).padStart(2,'0')} / {p.id<0?'ПРОТОТИП':'ПРОЕКТ'}</span></Link><div className="project-meta"><span>{category(p)}</span><span>{p.id<0?'Прототип':'Проект'}</span></div><h3><Link to={'/details-post/'+p.id}>{p.title}<span>↗</span></Link></h3><p>{p.shortDescription}</p><div className="project-stack"><span className="stack-label">Стек</span><ul aria-label="Технологии проекта">{p.tags.map(tag=><li key={tag}><button aria-pressed={technology===tag} aria-label={'Показать работы с '+tag} onClick={()=>{setTechnology(technology===tag?'':tag);document.getElementById('work')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}}>{tag}</button></li>)}</ul></div></article>)}</div>{!visible.length&&<p className="empty">Нет работ с таким сочетанием фильтров. Попробуйте сбросить фильтры.</p>}
      <div className="catalog-end"><span>КОНЕЦ КАТАЛОГА / НАЧАЛО СЛЕДУЮЩЕЙ ИДЕИ</span><a href="#work">К началу ↑</a></div></section>
      
      <footer className="studio-footer"><div className="eyebrow">02 / КОНТАКТ</div><a href="https://t.me/scholok" target="_blank" rel="noreferrer" className="contact-title">Есть идея?<br/><em>Давайте попробуем.</em><span>↗</span></a><div className="footer-line"><span>ALEX SCHYOLOKOV / MULTIMEDIA DEVELOPER</span><a href="https://t.me/scholok" target="_blank" rel="noreferrer">@SCHOLOK ↗</a><a href="#">НАВЕРХ ↑</a></div></footer>
    </main></div>;
}
export default App;
