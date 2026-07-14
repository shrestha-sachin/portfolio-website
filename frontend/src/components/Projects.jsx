import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../data';

export default function Projects() {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('selectedProjectTab') || 'webapps');
  const [showAllWeb, setShowAllWeb] = useState(false);
  const [showAllGraphics, setShowAllGraphics] = useState(false);
  const [showAllArt, setShowAllArt] = useState(false);

  // Lightbox State
  const [lightbox, setLightbox] = useState({ open: false, img: '', title: '', index: 0, category: '' });
  const [zoom, setZoom] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Carousels State
  const [graphicsIndex, setGraphicsIndex] = useState(0);
  const [artIndex, setArtIndex] = useState(0);

  // AutoPlay Intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setGraphicsIndex((prev) => (prev + 1) % projects.graphics.length);
      setArtIndex((prev) => (prev + 1) % projects.art.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Save selected tab to localStorage
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('selectedProjectTab', tab);
  };

  const getCategoryList = (category) => {
    if (category === 'webapps') return projects.webapps;
    if (category === 'graphics') return projects.graphics;
    if (category === 'art') return projects.art;
    return [];
  };

  const openLightbox = (category, index) => {
    const list = getCategoryList(category);
    if (!list.length) return;
    const item = list[index];
    setLightbox({
      open: true,
      img: item.image,
      title: item.title,
      index,
      category
    });
    setZoom(1);
    setTranslate({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox({ open: false, img: '', title: '', index: 0, category: '' });
    document.body.style.overflow = '';
  };

  const handlePrevLightboxImage = (e) => {
    if (e) e.stopPropagation();
    const list = getCategoryList(lightbox.category);
    if (!list.length) return;
    const nextIndex = (lightbox.index - 1 + list.length) % list.length;
    const item = list[nextIndex];
    setLightbox((prev) => ({
      ...prev,
      img: item.image,
      title: item.title,
      index: nextIndex
    }));
    setZoom(1);
    setTranslate({ x: 0, y: 0 });
  };

  const handleNextLightboxImage = (e) => {
    if (e) e.stopPropagation();
    const list = getCategoryList(lightbox.category);
    if (!list.length) return;
    const nextIndex = (lightbox.index + 1) % list.length;
    const item = list[nextIndex];
    setLightbox((prev) => ({
      ...prev,
      img: item.image,
      title: item.title,
      index: nextIndex
    }));
    setZoom(1);
    setTranslate({ x: 0, y: 0 });
  };

  // Lightbox Keydown and Mouse Wheel Zoom Listeners
  useEffect(() => {
    if (!lightbox.open) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === '=' || e.key === '+') handleZoom(0.25);
      if (e.key === '-') handleZoom(-0.25);
      if (e.key === 'ArrowLeft') handlePrevLightboxImage();
      if (e.key === 'ArrowRight') handleNextLightboxImage();
    };

    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoom(0.25);
      } else {
        handleZoom(-0.25);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const lightboxEl = document.getElementById('lightbox-overlay');
    if (lightboxEl) {
      lightboxEl.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (lightboxEl) {
        lightboxEl.removeEventListener('wheel', handleWheel);
      }
    };
  }, [lightbox, zoom]);

  const handleZoom = (amount) => {
    setZoom((prev) => {
      const next = prev + amount;
      return Math.max(0.5, Math.min(3, next));
    });
  };

  // Image dragging handlers in Lightbox
  const handleMouseDown = (e) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragStart.current = { x: clientX - translate.x, y: clientY - translate.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    let newX = clientX - dragStart.current.x;
    let newY = clientY - dragStart.current.y;

    // Boundary limits based on zoom level
    const maxTranslate = 100 * (zoom - 1);
    newX = Math.max(-maxTranslate, Math.min(maxTranslate, newX));
    newY = Math.max(-maxTranslate, Math.min(maxTranslate, newY));

    setTranslate({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Download logic
  const downloadImage = (e, img, title) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = img;
    link.download = (title || 'download').toLowerCase().replace(/\s+/g, '-') + '.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Rendering Helpers
  const visibleWebProjects = showAllWeb ? projects.webapps : projects.webapps.slice(0, 3);
  const visibleGraphics = showAllGraphics ? projects.graphics : projects.graphics.slice(0, 3);
  const visibleArt = showAllArt ? projects.art : projects.art.slice(0, 3);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Featured <span className="gradient-text font-extrabold">Projects</span>
        </h2>

        {/* Tab Buttons - Segmented Controls */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-200/50 dark:bg-gray-700/40 p-1.5 rounded-2xl flex gap-1 shadow-inner border border-gray-300/10 max-w-2xl w-full sm:w-auto">
            <button
              onClick={() => handleTabChange('webapps')}
              className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center ${
                activeTab === 'webapps'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-white shadow-md scale-102'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              <i className="fas fa-laptop-code mr-2 text-base"></i>
              <span className="hidden sm:inline">Web Apps / Software</span>
              <span className="inline sm:hidden">Software</span>
            </button>
            <button
              onClick={() => handleTabChange('graphics')}
              className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center ${
                activeTab === 'graphics'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-white shadow-md scale-102'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              <i className="fas fa-palette mr-2 text-base"></i>
              <span className="hidden sm:inline">Graphic Design</span>
              <span className="inline sm:hidden">Graphics</span>
            </button>
            <button
              onClick={() => handleTabChange('art')}
              className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center ${
                activeTab === 'art'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-white shadow-md scale-102'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              <i className="fas fa-paint-brush mr-2 text-base"></i>
              <span className="hidden sm:inline">Sketches / Painting</span>
              <span className="inline sm:hidden">Art</span>
            </button>
          </div>
        </div>

        {/* ==============================================
            WEB APPLICATIONS / SOFTWARE TAB
            ============================================== */}
        {activeTab === 'webapps' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleWebProjects.map((p, idx) => (
                <div
                  key={idx}
                  className="project-card bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-600"
                >
                  <div className="h-48 overflow-hidden relative cursor-pointer group/img" onClick={() => openLightbox('webapps', idx)}>
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover/img:opacity-90 transition-opacity"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity z-20">
                      <span className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg border border-white/10">
                        <i className="fas fa-search-plus text-sm"></i> View Large
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 z-10">
                      <h3 className="text-xl font-bold text-white drop-shadow-md">{p.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs px-2.5 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-full border border-blue-100/50 dark:border-blue-900/20 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      {p.links.github !== '#' ? (
                        <a
                          href={p.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center text-sm"
                        >
                          <i className="fab fa-github mr-2 text-lg"></i> GitHub
                        </a>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 flex items-center text-sm cursor-not-allowed">
                          <i className="fab fa-github mr-2 text-lg"></i> Private Repo
                        </span>
                      )}
                      
                      {p.links.live !== '#' ? (
                        <a
                          href={p.links.live}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center text-sm"
                        >
                          <i className="fas fa-external-link-alt mr-2"></i> Visit Live
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllWeb(!showAllWeb)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-colors inline-flex items-center glow shadow-md"
              >
                <i className={`fas ${showAllWeb ? 'fa-chevron-up' : 'fab fa-github'} mr-2`}></i>
                {showAllWeb ? 'Show Less' : 'View All Web Projects'}
              </button>
            </div>
          </div>
        )}

        {/* ==============================================
            GRAPHIC DESIGN TAB
            ============================================== */}
        {activeTab === 'graphics' && (
          <div className="space-y-12">
            {/* Graphics Carousel */}
            <div className="max-w-4xl mx-auto">
              <div className="carousel-container">
                <div
                  className="carousel-track"
                  style={{ transform: `translateX(-${graphicsIndex * 100}%)` }}
                >
                  {projects.graphics.map((slide, idx) => (
                    <div key={idx} className="carousel-slide bg-gray-900 cursor-pointer" onClick={() => openLightbox('graphics', idx)}>
                      <img src={slide.image} alt={slide.title} />
                    </div>
                  ))}
                </div>

                <div className="carousel-info">
                  <h3 className="carousel-title">{projects.graphics[graphicsIndex].title}</h3>
                  <p className="carousel-description">{projects.graphics[graphicsIndex].subtitle}</p>
                </div>

                {/* Carousel Navigation Dots */}
                <div className="carousel-dots">
                  {projects.graphics.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGraphicsIndex(idx)}
                      className={`carousel-dot ${graphicsIndex === idx ? 'active' : ''}`}
                    />
                  ))}
                </div>

                {/* Left/Right Navigation Arrows */}
                <button
                  onClick={() =>
                    setGraphicsIndex(
                      (prev) => (prev > 0 ? prev - 1 : projects.graphics.length - 1)
                    )
                  }
                  className="carousel-arrow left"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  onClick={() =>
                    setGraphicsIndex(
                      (prev) => (prev < projects.graphics.length - 1 ? prev + 1 : 0)
                    )
                  }
                  className="carousel-arrow right"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>

            {/* Graphics Grid */}
            <div className="gallery-grid">
              {visibleGraphics.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox('graphics', idx)}
                  className="gallery-item"
                >
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="gallery-overlay">
                    <h4 className="gallery-title">{item.title}</h4>
                    <p className="gallery-subtitle">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllGraphics(!showAllGraphics)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-colors inline-flex items-center glow shadow-md"
              >
                <i className={`fas ${showAllGraphics ? 'fa-chevron-up' : 'fas fa-images'} mr-2`}></i>
                {showAllGraphics ? 'Show Less' : 'View All Graphic Designs'}
              </button>
            </div>
          </div>
        )}

        {/* ==============================================
            SKETCHES / ARTS TAB
            ============================================== */}
        {activeTab === 'art' && (
          <div className="space-y-12">
            {/* Art Carousel */}
            <div className="max-w-4xl mx-auto">
              <div className="carousel-container">
                <div
                  className="carousel-track"
                  style={{ transform: `translateX(-${artIndex * 100}%)` }}
                >
                  {projects.art.map((slide, idx) => (
                    <div key={idx} className="carousel-slide bg-gray-900 cursor-pointer" onClick={() => openLightbox('art', idx)}>
                      <img src={slide.image} alt={slide.title} />
                    </div>
                  ))}
                </div>

                <div className="carousel-info">
                  <h3 className="carousel-title">{projects.art[artIndex].title}</h3>
                  <p className="carousel-description">{projects.art[artIndex].subtitle}</p>
                </div>

                {/* Dots */}
                <div className="carousel-dots">
                  {projects.art.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setArtIndex(idx)}
                      className={`carousel-dot ${artIndex === idx ? 'active' : ''}`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <button
                  onClick={() =>
                    setArtIndex((prev) => (prev > 0 ? prev - 1 : projects.art.length - 1))
                  }
                  className="carousel-arrow left"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  onClick={() =>
                    setArtIndex((prev) => (prev < projects.art.length - 1 ? prev + 1 : 0))
                  }
                  className="carousel-arrow right"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>

            {/* Art Grid */}
            <div className="gallery-grid">
              {visibleArt.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox('art', idx)}
                  className="gallery-item"
                >
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="gallery-overlay">
                    <h4 className="gallery-title">{item.title}</h4>
                    <p className="gallery-subtitle">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllArt(!showAllArt)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-colors inline-flex items-center glow shadow-md"
              >
                <i className={`fas ${showAllArt ? 'fa-chevron-up' : 'fas fa-paint-brush'} mr-2`}></i>
                {showAllArt ? 'Show Less' : 'View All Arts'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ==============================================
          LIGHTBOX MODAL OVERLAY
          ============================================== */}
      {lightbox.open && (
        <div
          id="lightbox-overlay"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm select-none"
          onClick={closeLightbox}
        >
          {/* Top Actions Panel */}
          <div className="absolute top-4 left-0 right-0 px-6 flex items-center justify-between z-50 text-white">
            <h4 className="text-lg font-semibold tracking-wide drop-shadow-md">
              {lightbox.title}
            </h4>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold tracking-wider px-3 py-1 bg-white/10 rounded-full">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoom(0.25);
                }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center"
                title="Zoom In"
              >
                <i className="fas fa-search-plus text-lg"></i>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoom(-0.25);
                }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center"
                title="Zoom Out"
              >
                <i className="fas fa-search-minus text-lg"></i>
              </button>
              <button
                onClick={(e) => downloadImage(e, lightbox.img, lightbox.title)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center"
                title="Download Image"
              >
                <i className="fas fa-download text-lg"></i>
              </button>
              <button
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600/80 text-white transition-colors flex items-center justify-center font-bold"
                title="Close"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>
          </div>

          {/* Left Navigation Arrow */}
          <button
            onClick={handlePrevLightboxImage}
            className="absolute left-4 sm:left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all flex items-center justify-center text-lg z-50 shadow-lg border border-white/10"
            title="Previous Image (ArrowLeft)"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={handleNextLightboxImage}
            className="absolute right-4 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all flex items-center justify-center text-lg z-50 shadow-lg border border-white/10"
            title="Next Image (ArrowRight)"
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          {/* Interactive Image Frame */}
          <div
            className="w-full h-full flex items-center justify-center p-12 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.img}
              alt={lightbox.title}
              className={`max-w-full max-h-full object-contain transition-transform duration-100 ease-out select-none ${
                zoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
              }`}
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom})`
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
            />
          </div>
        </div>
      )}
    </section>
  );
}
export { Projects };
