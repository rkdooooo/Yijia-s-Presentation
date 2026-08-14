"use client";

/* eslint-disable @next/next/no-img-element */

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

type SlideDef = {
  id: string;
  label: string;
  title: string;
  notes: string[];
  content: ReactNode;
};

const projectUrl =
  "https://www.egu.eu/jobs/8245/phd-project-water-use-strategies-of-global-tree-grass-savannas-during-drying-and-rewetting-soils/";
const manipUrl = "https://www.bgc-jena.mpg.de/en/bgi/manip";
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

type GalleryImage = { src: string; alt: string };
type ZoomDetail = { items: GalleryImage[]; index: number };

function requestZoom(items: GalleryImage[], index: number) {
  window.dispatchEvent(new CustomEvent<ZoomDetail>("presentation-zoom", { detail: { items, index } }));
}

function ZoomImage({ src, alt, className, gallery, galleryIndex = 0 }: { src: string; alt: string; className?: string; gallery?: GalleryImage[]; galleryIndex?: number }) {
  return (
    <button className={`zoom-image ${className ?? ""}`} onClick={() => requestZoom(gallery ?? [{ src, alt }], gallery ? galleryIndex : 0)} aria-label={`Enlarge image: ${alt}`}>
      <img src={src} alt={alt} />
      <span>VIEW ↗</span>
    </button>
  );
}

function PhotoTile({ photo, gallery, index }: { photo: GalleryImage; gallery: GalleryImage[]; index: number }) {
  return (
    <figure className="photo-tile">
      <ZoomImage src={photo.src} alt={photo.alt} gallery={gallery} galleryIndex={index} />
    </figure>
  );
}

const fieldCoursePhotos: GalleryImage[] = [
  { src: asset("images/field-course-team.webp"), alt: "Field station training" },
  { src: asset("images/field-course-instruments.webp"), alt: "Environmental field instruments" },
  { src: asset("images/field-course-wildlife.webp"), alt: "Wildlife observation during field training" },
  { src: asset("images/field-course-landscape.webp"), alt: "Landscape field survey" },
];

const atmosphericSciencePhotos: GalleryImage[] = [
  { src: asset("images/atmos-01-controller-board.webp"), alt: "Programmable sensor controller board" },
  { src: asset("images/atmos-02-sensor-assembly.webp"), alt: "Hand-built atmospheric sensor assembly" },
  { src: asset("images/atmos-03-instrument-package.webp"), alt: "Assembled instrument package" },
  { src: asset("images/atmos-04-sensor-module.webp"), alt: "Sensor module inspection" },
  { src: asset("images/atmos-05-data-logger-test.webp"), alt: "Data logger testing and computer setup" },
  { src: asset("images/atmos-06-barometer.webp"), alt: "Fortin cistern barometer" },
  { src: asset("images/atmos-07-pressure-instrument.webp"), alt: "Atmospheric pressure instrument" },
  { src: asset("images/atmos-08-wind-tunnel.webp"), alt: "Wind-tunnel measurement facility" },
  { src: asset("images/atmos-09-balloon-payload.webp"), alt: "Preparing the weather-balloon payload" },
  { src: asset("images/atmos-10-balloon-rig.webp"), alt: "Weather-balloon rig and line preparation" },
  { src: asset("images/atmos-11-balloon-launch.webp"), alt: "Launching a weather balloon" },
  { src: asset("images/atmos-12-analysis-briefing.webp"), alt: "Measurement analysis and class briefing" },
];

function Archive({ number, section, children }: { number: number; section: string; children: ReactNode }) {
  return (
    <div className="archive-shell">
      <header className="archive-header">
        <span>Y.X. / {String(number).padStart(2, "0")} / 2026</span>
        <span>{section}</span>
      </header>
      <div className="archive-content">{children}</div>
      <footer className="archive-footer">
        <span>FIELD / FLUX / SCALE</span>
        <span>{String(number).padStart(2, "0")}</span>
      </footer>
    </div>
  );
}

const slides: SlideDef[] = [
  {
    id: "introduction",
    label: "Introduction",
    title: "Yijia (Ricardo) Xie",
    notes: [
      "Good morning, and thank you for the opportunity to introduce myself.",
      "I am Yijia Xie. The thread connecting my experience is learning how field observations, ecosystem-atmosphere exchange, and spatial or Earth-system modelling can answer environmental questions across scales.",
      "I will focus on the parts of my background most relevant to the savanna water-use project.",
    ],
    content: (
      <div className="cover">
        <div className="cover__copy">
          <p className="eyebrow">PRE-INTERVIEW / 2026</p>
          <h1>Yijia <i>(Ricardo)</i> Xie</h1>
          <p className="cover__thesis">Field observations, ecosystem fluxes, and environmental modelling across scales</p>
          <div className="blue-rule" />
          <p className="cover__meta">M.Sc. Applied GIS · National University of Singapore<br />B.Sc. Geographical Sciences · University of British Columbia</p>
          <p className="cover__foot">PhD project · Water-use strategies of tree-grass savannas</p>
        </div>
        <figure className="cover__visual">
          <ZoomImage src={asset("images/zine-cover.png")} alt="A zine-style savanna tree, flux tower and soil profile" />
          <figcaption>field / flux / scale</figcaption>
        </figure>
      </div>
    ),
  },
  {
    id: "identity",
    label: "Research identity",
    title: "Field observation + spatial and process-based analysis",
    notes: [
      "My formal training is in geography and GIScience, but my research identity is broader than GIS alone.",
      "I have learned to observe processes in the field, analyse spatial patterns, and use models to test mechanisms at larger scales.",
      "That combination is why this project feels like a natural next step.",
    ],
    content: (
      <Archive number={2} section="research identity">
        <div className="identity-grid">
          <figure className="portrait-paper"><ZoomImage src={asset("images/portrait.jpeg")} alt="Portrait of Yijia Xie" /></figure>
          <div className="identity-copy">
            <p className="eyebrow">ONE RESEARCH IDENTITY</p>
            <h2>I connect field observation with spatial and process-based analysis</h2>
            <div className="four-ideas">
              <article><b>OBSERVE</b><p>Ecosystem–atmosphere measurements and environmental field methods</p></article>
              <article><b>ANALYSE</b><p>GIScience, remote sensing, and spatial statistics</p></article>
              <article><b>MODEL</b><p>Urban microclimate and Earth-system simulations</p></article>
              <article><b>INTEGRATE</b><p>Carbon, water, climate, and environmental data</p></article>
            </div>
            <p className="takeaway">Goal: explain environmental processes without losing their spatial context.</p>
          </div>
        </div>
      </Archive>
    ),
  },
  {
    id: "route",
    label: "Research route",
    title: "A research route across scales",
    notes: [
      "This timeline focuses on research experience rather than institutions or degrees.",
      "I began with ecosystem-atmosphere observations, then added urban environmental GIS, spatial epidemiology, real-time geospatial integration, Earth-system modelling, and my current thesis.",
      "The topics vary, but each project strengthened how I connect an environmental question to observations, spatial context, and an appropriate analytical scale.",
    ],
    content: (
      <Archive number={3} section="research route">
        <h2>My research path expanded from field observations to spatial and Earth-system analysis</h2>
        <div className="timeline-stage">
          <div className="timeline">
            {[
              ["2023–25", "UBC Micrometeorology Lab", "Chamber and eddy-covariance fluxes"],
              ["2024–25", "GIS & Urban Meteorology", "Global white-roof suitability"],
              ["2025–26", "Spatial Epidemiology", "Liver-fluke risk in Northeast Thailand"],
              ["2025–26", "Global FPV · CESM2 Simulations", "A*STAR Earth-system modelling"],
              ["2026", "ASEAN Geospatial Challenge", "Transit Comfort Dashboard"],
              ["2026", "Master’s Research Thesis", "Urban geometry and shade modelling"],
            ].map((item) => (
              <article key={item[1]} className="timeline__item">
                <span className="timeline__year">{item[0]}</span><i />
                <h3>{item[1]}</h3><p>{item.slice(2).map((line) => <span key={line}>{line}</span>)}</p>
              </article>
            ))}
          </div>
          <div className="timeline-groups" aria-label="Academic stage of research projects">
            <span><b>UNDERGRADUATE · UBC</b>Research foundation</span>
            <span><b>POSTGRADUATE · NUS / SINGAPORE</b>Spatial analysis and modelling</span>
          </div>
        </div>
      </Archive>
    ),
  },
  {
    id: "field-course",
    label: "Field course",
    title: "What a dataset means on the ground",
    notes: [
      "This was an undergraduate geographical sciences field course.",
      "This undergraduate course trained me systematically in field observation, sampling design, landscape interpretation, and team-based data collection.",
      "The slide is intentionally visual. I will use the photos to explain the sites, sampling decisions, and methods orally.",
    ],
    content: (
      <Archive number={4} section="undergraduate field course">
        <div className="visual-slide-heading"><div><p className="eyebrow">GEOGRAPHICAL SCIENCES FIELD COURSE</p><h2>Background in Environmental Field Methods</h2></div><p>OBSERVE · SAMPLE · INTERPRET · COLLABORATE</p></div>
        <div className="course-gallery course-gallery--field">
          {fieldCoursePhotos.map((photo, index) => <PhotoTile key={photo.src} photo={photo} gallery={fieldCoursePhotos} index={index} />)}
        </div>
      </Archive>
    ),
  },
  {
    id: "atmospheric-science",
    label: "Atmospheric science",
    title: "Hands-on atmospheric measurements",
    notes: [
      "This undergraduate atmospheric science training was very hands-on.",
      "I launched a weather balloon, collected basic fixed-site meteorological data, assembled and soldered data loggers and sensors, made simple temperature probes using metal wire, and carried out air-pollutant measurements.",
      "The slide is intentionally visual. I will use these images to describe the instruments, setup, and data-quality lessons orally.",
    ],
    content: (
      <Archive number={5} section="atmospheric science training">
        <div className="visual-slide-heading visual-slide-heading--atmos"><div><p className="eyebrow">UNDERGRADUATE COURSE TRAINING</p><h2>Methods in Atmospheric Science</h2></div><p>FROM HARDWARE TO DATA</p></div>
        <div className="atmos-process" aria-label="Build, test and calibrate, deploy, measure and analyse">
          <span><b>01</b> BUILD</span><span><b>02</b> TEST + CALIBRATE</span><span><b>03</b> DEPLOY</span><span><b>04</b> MEASURE + ANALYSE</span>
        </div>
        <div className="atmos-gallery">
          {atmosphericSciencePhotos.map((photo, index) => <PhotoTile key={photo.src} photo={photo} gallery={atmosphericSciencePhotos} index={index} />)}
        </div>
      </Archive>
    ),
  },
  {
    id: "micrometeorology",
    label: "Micrometeorology",
    title: "Carbon and water exchange",
    notes: [
      "My first research experience was in the UBC Micrometeorology Lab.",
      "At Burns Bog, I gained plot-scale experience with portable chamber measurements of carbon dioxide and methane fluxes. At the CA-DSM and CA-RBM AmeriFlux wetlands, I helped with eddy-covariance system maintenance and calibration and became familiar with flux-data quality control.",
      "This experience made ecosystem-atmosphere exchange the environmental process I most want to understand.",
    ],
    content: (
      <Archive number={6} section="ecosystem–atmosphere measurements">
        <h2>Micrometeorology linked field measurements to carbon and water exchange</h2>
        <div className="flux-gallery">
          <figure className="flux-gallery__main"><ZoomImage src={asset("images/burns-bog.jpeg")} alt="Portable chamber field setup at Burns Bog" /></figure>
          <figure className="flux-gallery__detail"><ZoomImage src={asset("images/chamber.jpeg")} alt="Portable chamber measurement" /><figcaption><b>PLOT SCALE</b>Portable chamber<br />CO₂ and CH₄ fluxes</figcaption></figure>
          <figure><ZoomImage src={asset("images/tower-dsm.jpeg")} alt="Maintenance work at the CA-DSM AmeriFlux site" /></figure>
          <figure><ZoomImage src={asset("images/tower-rbm.jpeg")} alt="CA-RBM AmeriFlux wetland site" /></figure>
        </div>
        <div className="flux-caption"><p>Hands-on exposure to flux measurements, instrument maintenance, calibration, and quality control.</p><p><b>ECOSYSTEM SCALE</b>Eddy-covariance systems · CA-DSM and CA-RBM</p></div>
      </Archive>
    ),
  },
  {
    id: "cesm2",
    label: "Earth-system modelling",
    title: "Environmental change at Earth-system scale",
    notes: [
      "At A*STAR, I worked on the eco-climatic impacts of large-scale floating photovoltaics using CESM2.",
      "My work involved coupled atmosphere-ocean simulations, HPC workflows, sensitivity experiments, and interpretation of changes in surface energy balance and biological productivity.",
      "The topic differs from savanna ecohydrology, but the transferable skill is process-based thinking: connecting a perturbation to coupled physical and biogeochemical responses.",
    ],
    content: (
      <Archive number={7} section="earth-system modelling">
        <h2>CESM2 taught me to test environmental change at Earth-system scale</h2>
        <div className="cesm-layout">
          <div className="cesm-copy"><p className="eyebrow">A*STAR · FLOATING PHOTOVOLTAICS</p><h3>Community Earth System Model version 2 (CESM2)</h3><p>Coupled atmosphere–ocean simulations<br />HPC workflows and sensitivity experiments<br />Physical and biogeochemical responses</p><blockquote>I learned to move from a physical intervention to model configuration, diagnostics, and mechanism-based interpretation.</blockquote></div>
          <figure className="cesm-map"><ZoomImage src={asset("images/cesm-map.jpeg")} alt="Global maps used in floating photovoltaic simulations" /></figure>
          <figure className="cesm-response"><ZoomImage src={asset("images/cesm-response.png")} alt="Sensitivity of net primary production to floating photovoltaic coverage" /></figure>
          <figure className="cesm-nfix"><ZoomImage src={asset("images/cesm-nfix.jpeg")} alt="CESM2 output map of diazotroph carbon fixation" /></figure>
        </div>
      </Archive>
    ),
  },
  {
    id: "giscience",
    label: "GIScience",
    title: "Spatial environmental integration",
    notes: [
      "My GIScience work has covered urban heat, environmental suitability, and real-time spatial data integration.",
      "My master’s thesis models urban shading in Singapore, while the Transit Comfort Dashboard integrates environmental and activity data and received the ASEAN Geospatial Challenge 2026 Excellence Award.",
      "For this PhD, the transferable value is the ability to integrate site-level observations with landscape and hydroclimatic context rather than treating every site as isolated.",
    ],
    content: (
      <Archive number={8} section="spatial environmental analysis">
        <h2>GIScience lets me integrate environmental processes across heterogeneous landscapes</h2>
        <div className="spatial-images"><figure><ZoomImage src={asset("images/white-roof.png")} alt="White-roof suitability GIS story map" /></figure><figure><ZoomImage src={asset("images/transit-dashboard.png")} alt="Transit Comfort Dashboard" /></figure></div>
        <div className="project-links" aria-label="Project links">
          <a href="https://storymaps.arcgis.com/stories/ad00ba5e725049c5bf6ddae11451650d" target="_blank" rel="noreferrer"><span>WHITE-ROOF SUITABILITY</span><b>ArcGIS StoryMap</b><i>↗</i></a>
          <a href="https://sites.google.com/view/ge5219-transitcomfort" target="_blank" rel="noreferrer"><span>TRANSIT COMFORT</span><b>Project website</b><i>↗</i></a>
          <a href="https://nusgis.org/2026/05/14/congratulations-to-team-urbanflow-from-nus-for-winning-the-excellence-award-at-asean-geospatial-challenge-2026/" target="_blank" rel="noreferrer"><span>ASEAN GEOSPATIAL CHALLENGE</span><b>NUS GIS news</b><i>↗</i></a>
        </div>
      </Archive>
    ),
  },
  {
    id: "motivation",
    label: "Motivation",
    title: "Why observation remains the foundation",
    notes: [
      "I began as a field person. At UBC, environmental questions became real to me through sites, instruments, repeated measurements, and the practical limits of collecting reliable observations.",
      "At NUS, I moved much further into GIScience, GeoAI, spatial analysis, and modelling. That did not make fieldwork less relevant. It made me more aware that every model and every dataset ultimately depends on how the underlying system was observed and represented.",
      "The MANIP statement resonated with me because I encountered a related issue in my modelling work: a sophisticated model can still be constrained by how well its inputs and structure represent the environmental system. I see this PhD as a chance to combine my original strength as a field person with the spatial and modelling skills I have developed since.",
    ],
    content: (
      <Archive number={9} section="motivation">
        <div className="motivation-layout">
          <div className="motivation-story">
            <p className="eyebrow">WHY THIS DIRECTION</p>
            <h2>I moved deeper into models — and saw more clearly why observation matters</h2>
            <div className="motivation-path">
              <article><b>01</b><h3>Field<br />observation</h3></article>
              <article><b>02</b><h3>GIS +<br />GeoAI</h3></article>
              <article><b>03</b><h3>Model–data<br />fit</h3></article>
            </div>
            <p className="motivation-bridge"><b>MY FIT</b> Field judgement <i>+</i> spatial integration</p>
          </div>
          <figure className="motivation-photo"><ZoomImage src={asset("images/field-forest.png")} alt="Yijia observing a forest environment" /></figure>
          <blockquote className="motivation-quote">
            <span>FROM THE MANIP PROJECT CONTEXT</span>
            <p>“Earth observation systems, and associated land-surface modeling development have been so far poorly adapted to the key structural and functional characteristics of tree-grass ecosystems.”</p>
            <a href={manipUrl} target="_blank" rel="noreferrer">Read source ↗</a>
          </blockquote>
        </div>
      </Archive>
    ),
  },
  {
    id: "project-fit",
    label: "Project fit",
    title: "Why this project",
    notes: [
      "My understanding is that the project asks how tree-grass savanna water-use strategies vary across years, what drives those dynamics, how extremes alter them, and how these responses can be modelled under increasing ecological and hydroclimatic demand.",
      "I already bring field flux experience, GIScience, Python, data integration, and modelling workflows.",
      "The PhD would let me deepen the parts I most want to learn: ecohydrology, water-carbon dynamics, global flux-network synthesis, and process-based or physics-guided modelling.",
    ],
    content: (
      <Archive number={10} section="project fit">
        <h2>The project sits exactly at the intersection I want to develop</h2>
        <div className="fit-columns">
          {[["01", "Observe", "Long-term sites", "Eddy-covariance fluxes", "Drying–rewetting events"], ["02", "Integrate", "Global flux network", "Ecological context", "Hydroclimatic extremes"], ["03", "Model", "Water-use strategies", "Mechanistic drivers", "Future sensitivity"]].map((item) => <article key={item[0]}><b>{item[0]}</b><h3>{item[1]}</h3><p>{item.slice(2).map((line) => <span key={line}>{line}</span>)}</p></article>)}
        </div>
        <div className="fit-bridge"><article><b>I BRING</b><p>Field measurement experience · GIScience · Python and modelling workflows</p></article><article><b>I WANT TO DEEPEN</b><p>Ecohydrology · water–carbon dynamics · process-based and physics-guided modelling</p></article></div>
        <a className="project-link" href={projectUrl} target="_blank" rel="noreferrer">View project brief ↗</a>
      </Archive>
    ),
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [overview, setOverview] = useState(false);
  const [notes, setNotes] = useState(false);
  const [help, setHelp] = useState(false);
  const [zoom, setZoom] = useState<ZoomDetail | null>(null);
  const wheelLocked = useRef(false);
  const touchStart = useRef<number | null>(null);
  const lightboxTouchStart = useRef<number | null>(null);

  const moveZoom = useCallback((direction: number) => {
    setZoom((current) => current ? { ...current, index: (current.index + direction + current.items.length) % current.items.length } : null);
  }, []);

  const go = useCallback((target: number) => {
    const next = Math.max(0, Math.min(slides.length - 1, target));
    setIndex(next);
    setOverview(false);
    window.history.replaceState(null, "", `#${slides[next].id}`);
  }, []);

  const previous = useCallback(() => setIndex((value) => {
    const next = Math.max(0, value - 1);
    window.history.replaceState(null, "", `#${slides[next].id}`);
    return next;
  }), []);
  const next = useCallback(() => setIndex((value) => {
    const upcoming = Math.min(slides.length - 1, value + 1);
    window.history.replaceState(null, "", `#${slides[upcoming].id}`);
    return upcoming;
  }), []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const initial = slides.findIndex((slide) => slide.id === hash);
    if (initial >= 0) window.setTimeout(() => setIndex(initial), 0);
    else window.history.replaceState(null, "", `#${slides[0].id}`);
  }, []);

  useEffect(() => {
    function onZoom(event: Event) {
      setZoom((event as CustomEvent<ZoomDetail>).detail);
    }
    window.addEventListener("presentation-zoom", onZoom);
    return () => window.removeEventListener("presentation-zoom", onZoom);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.target as HTMLElement)?.tagName === "INPUT") return;
      if (zoom) {
        if (event.key === "Escape") setZoom(null);
        if (event.key === "ArrowRight") { event.preventDefault(); moveZoom(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); moveZoom(-1); }
        return;
      }
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) { event.preventDefault(); next(); }
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) { event.preventDefault(); previous(); }
      if (event.key === "Home") go(0);
      if (event.key === "End") go(slides.length - 1);
      if (event.key.toLowerCase() === "o") setOverview((value) => !value);
      if (event.key.toLowerCase() === "n") setNotes((value) => !value);
      if (event.key.toLowerCase() === "h" || event.key === "?") setHelp((value) => !value);
      if (event.key.toLowerCase() === "f") toggleFullscreen();
      if (event.key === "Escape") { setOverview(false); setNotes(false); setHelp(false); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, moveZoom, next, previous, zoom]);

  function onWheel(event: React.WheelEvent) {
    if (Math.abs(event.deltaY) < 28 || wheelLocked.current || overview || notes) return;
    wheelLocked.current = true;
    if (event.deltaY > 0) next(); else previous();
    window.setTimeout(() => { wheelLocked.current = false; }, 700);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  return (
    <main className="deck" onWheel={onWheel} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = touchStart.current - event.changedTouches[0].clientX; if (Math.abs(delta) > 48) { if (delta > 0) next(); else previous(); } touchStart.current = null; }}>
      <a className="skip-link" href="#slide-content">Skip controls</a>
      <div id="slide-content" className="stage" aria-live="polite">
        {slides.map((slide, slideIndex) => (
          <section key={slide.id} className={`slide ${slideIndex === index ? "slide--active" : slideIndex < index ? "slide--past" : "slide--future"}`} aria-hidden={slideIndex !== index}>
            {slide.content}
          </section>
        ))}
      </div>

      <nav className="controls" aria-label="Presentation controls">
        <button onClick={previous} disabled={index === 0} aria-label="Previous slide">←</button>
        <button className="controls__count" onClick={() => setOverview(true)} aria-label="Open slide overview"><b>{String(index + 1).padStart(2, "0")}</b><span>/ {String(slides.length).padStart(2, "0")}</span></button>
        <button onClick={next} disabled={index === slides.length - 1} aria-label="Next slide">→</button>
      </nav>

      <div className="utility-controls">
        <button onClick={() => setOverview(true)} title="Overview (O)">Overview</button>
        <button onClick={() => setNotes((value) => !value)} title="Speaker notes (N)">Notes</button>
        <button onClick={toggleFullscreen} title="Fullscreen (F)">Full screen</button>
        <button onClick={() => setHelp(true)} title="Keyboard help (H)" aria-label="Keyboard help">?</button>
      </div>

      <div className="progress" aria-hidden="true"><i style={{ width: `${((index + 1) / slides.length) * 100}%` }} /></div>

      {overview ? (
        <div className="overlay overview" role="dialog" aria-modal="true" aria-label="Slide overview">
          <header><div><p className="eyebrow">OVERVIEW / {slides.length} SLIDES</p><h2>Field / Flux / Scale</h2></div><button onClick={() => setOverview(false)} aria-label="Close overview">×</button></header>
          <div className="overview-grid">
            {slides.map((slide, slideIndex) => <button key={slide.id} className={slideIndex === index ? "overview-card overview-card--active" : "overview-card"} onClick={() => go(slideIndex)}><span>{String(slideIndex + 1).padStart(2, "0")}</span><b>{slide.label}</b><small>{slide.title}</small></button>)}
          </div>
        </div>
      ) : null}

      {notes ? (
        <aside className="notes-panel" aria-label="Speaker notes"><header><div><span>NOTES / {String(index + 1).padStart(2, "0")}</span><b>{slides[index].label}</b></div><button onClick={() => setNotes(false)} aria-label="Close speaker notes">×</button></header>{slides[index].notes.map((note) => <p key={note}>{note}</p>)}</aside>
      ) : null}

      {help ? (
        <div className="overlay help" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts"><div className="help-card"><button onClick={() => setHelp(false)} aria-label="Close keyboard help">×</button><p className="eyebrow">PRESENTATION KEYS</p><h2>Navigate without leaving the story</h2><dl><div><dt>← →</dt><dd>Previous / next slide</dd></div><div><dt>O</dt><dd>Slide overview</dd></div><div><dt>N</dt><dd>Speaker notes</dd></div><div><dt>F</dt><dd>Full screen</dd></div><div><dt>Home / End</dt><dd>First / last slide</dd></div></dl></div></div>
      ) : null}

      {zoom ? (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={zoom.items[zoom.index].alt} onClick={() => setZoom(null)} onTouchStart={(event) => { event.stopPropagation(); lightboxTouchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { event.stopPropagation(); if (lightboxTouchStart.current === null) return; const delta = lightboxTouchStart.current - event.changedTouches[0].clientX; if (Math.abs(delta) > 48 && zoom.items.length > 1) moveZoom(delta > 0 ? 1 : -1); lightboxTouchStart.current = null; }}>
          <button className="image-lightbox__close" onClick={() => setZoom(null)} aria-label="Close enlarged image">×</button>
          {zoom.items.length > 1 ? <button className="image-lightbox__previous" onClick={(event) => { event.stopPropagation(); moveZoom(-1); }} aria-label="Previous image">←</button> : null}
          <img src={zoom.items[zoom.index].src} alt={zoom.items[zoom.index].alt} onClick={(event) => event.stopPropagation()} />
          {zoom.items.length > 1 ? <button className="image-lightbox__next" onClick={(event) => { event.stopPropagation(); moveZoom(1); }} aria-label="Next image">→</button> : null}
          {zoom.items.length > 1 ? <p>{String(zoom.index + 1).padStart(2, "0")} / {String(zoom.items.length).padStart(2, "0")}</p> : null}
        </div>
      ) : null}
    </main>
  );
}
