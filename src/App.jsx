import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Link, Mail, MouseLeft } from 'lucide-react'
import profile from './assets/profiles/pfp.jpg'
import armonyx from './assets/projects/armonyx.jpg'
import buildx from './assets/projects/buildx.jpg'
import irms from './assets/projects/irms.jpg'
import oneshot from './assets/projects/oneshot.jpg'
import prism from './assets/projects/prism.jpeg'

const portfolioData = {
  name: 'Patrick Lambino',
  role: 'Software developer',
  intro: 'I build useful digital products with a curious mind and a practical hand.',
  bio: 'Full-stack developer focused on thoughtful interfaces, reliable systems, and the space where design meets engineering.',
  photo: profile,
  projects: [
    { title: 'Armonyxfitness', description: 'Gym management for registrations, attendance, and subscriptions across four branches.', image: armonyx, tags: ['PHP', 'CodeIgniter', 'MySQL', 'AWS'] },
    { title: 'BuildXDesigner', description: 'A visual website builder with integrated data, email, and payment systems.', image: buildx, tags: ['React', 'Node.js', 'Supabase', 'OpenAI'] },
    { title: 'Issue Report Management System', description: 'Centralized ticketing that reduced issue resolution time by 40 percent.', image: irms, tags: ['PHP', 'JavaScript', 'Ably', 'AWS'] },
    { title: 'OneShot', description: 'A scheduling tool for photobooth businesses to manage bookings and coordination.', image: oneshot, tags: ['React', 'Express', 'Supabase', 'Paymongo'] },
    { title: 'Prism', description: 'A browser extension for clearer, more confident writing in real time.', image: prism, tags: ['JavaScript', 'OpenAI', 'Chrome API'] },
  ],
  skills: {
    'Build': ['React', 'JavaScript', 'PHP', 'Node.js', 'CodeIgniter'],
    'Connect': ['REST APIs', 'Supabase', 'MySQL', 'Ably', 'AWS'],
    'Shape': ['Tailwind CSS', 'Bootstrap', 'Responsive UI', 'Figma'],
  },
  certificates: [
    { name: 'Introduction to Modern AI', issuer: 'Cisco Networking Academy', date: '2024' },
    { name: 'Introduction to Data Science', issuer: 'Cisco Networking Academy', date: '2024' },
    { name: 'Networking Basics', issuer: 'Cisco Networking Academy', date: '2024' },
  ],
  contact: { email: 'lambino.patrick.competente@gmail.com', github: 'https://github.com/PatrickLmbn', linkedin: 'https://www.linkedin.com/in/lambino-patrick-c-4213ba405/' },
}

const sections = ['Profile', ...portfolioData.projects.map((project) => project.title), 'Skills', 'Certificates', 'Contact']
const projectStartDepth = 1
const skillsDepth = projectStartDepth + portfolioData.projects.length
const certificatesDepth = skillsDepth + 1
const contactDepth = certificatesDepth + 1

function App() {
  const [depth, setDepth] = useState(0)
  const [targetDepthValue, setTargetDepthValue] = useState(0)
  const targetDepth = useRef(0)
  const dragStart = useRef(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame
    const animate = () => {
      setDepth((currentDepth) => {
        const nextDepth = reducedMotion ? targetDepth.current : currentDepth + (targetDepth.current - currentDepth) * 0.085
        return Math.abs(nextDepth - targetDepth.current) < 0.001 ? targetDepth.current : nextDepth
      })
      animationFrame = requestAnimationFrame(animate)
    }
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  const focusedDepth = ((Math.round(depth) % sections.length) + sections.length) % sections.length
  const progressDepth = Math.min(((targetDepthValue % sections.length) + sections.length) % sections.length, sections.length - 1)

  const updateTargetDepth = (value) => {
    targetDepth.current = value
    setTargetDepthValue(value)
  }

  useEffect(() => {
    const move = (amount) => {
      updateTargetDepth(targetDepth.current + amount)
    }
    const onWheel = (event) => { move(event.deltaY < 0 ? 0.18 : -0.18) }
    const onKeyDown = (event) => {
      if (event.key === 'ArrowUp' || event.key === 'PageUp') move(1)
      if (event.key === 'ArrowDown' || event.key === 'PageDown') move(-1)
      if (event.key === 'Home') updateTargetDepth(0)
      if (event.key === 'End') updateTargetDepth(sections.length - 1)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    return () => { window.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onKeyDown) }
  }, [])

  const jumpTo = (index) => updateTargetDepth(index + Math.round((targetDepth.current - index) / sections.length) * sections.length)
  const onPointerDown = (event) => { dragStart.current = event.clientY }
  const onPointerUp = (event) => {
    if (dragStart.current === null) return
    const distance = dragStart.current - event.clientY
    if (Math.abs(distance) > 12) updateTargetDepth(targetDepth.current + distance / 170)
    dragStart.current = null
  }

  return (
    <main className="zoom-app" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
      <header className="site-header">
        <button className="wordmark" onClick={() => jumpTo(0)} aria-label="Jump to profile">PL<span>.</span></button>
        <div className="depth-readout"><span>Now viewing</span><strong>{String(focusedDepth + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')} · {sections[focusedDepth]}</strong></div>
      </header>

      <div className="progress-track" aria-hidden="true"><div style={{ height: `${(progressDepth / (sections.length - 1)) * 100}%` }} /></div>
      <nav className="section-nav" aria-label="Portfolio sections">
        {sections.map((section, index) => <button key={section} className={focusedDepth === index ? 'active' : ''} onClick={() => jumpTo(index)} aria-label={`Go to ${section}`}><span>{String(index + 1).padStart(2, '0')}</span>{section}</button>)}
      </nav>

      <div className="scene" aria-live="polite">
        <section className="layer profile-layer" style={layerStyle(depth, 0)} aria-hidden={focusedDepth !== 0}>
          <div className="profile-copy"><div className="profile-identity"><p className="eyebrow">01 / Profile</p><h1>{portfolioData.name.split(' ')[0]} <em>{portfolioData.name.split(' ').slice(1).join(' ')}</em></h1><p className="role">{portfolioData.role}</p></div><p className="intro">{portfolioData.intro}</p><p className="bio">{portfolioData.bio}</p><div className={`interaction-hint${focusedDepth === 0 ? '' : ' is-hidden'}`}><span className="hint-mouse"><MouseLeft /></span><span>Scroll up to zoom in</span></div></div><img className="profile-image" src={portfolioData.photo} alt={portfolioData.name} />
        </section>

        {portfolioData.projects.map((project, index) => <section className="layer projects-layer" style={layerStyle(depth, projectStartDepth + index)} aria-hidden={focusedDepth !== projectStartDepth + index} key={project.title}>
          <div className="section-heading"><p className="eyebrow">02 / Selected work</p><h2>Things I&apos;ve <em>made.</em></h2><p>Product thinking, shipped into the real world.</p></div>
          <div className="project-card"><img src={project.image} alt="" /><div className="project-detail"><span className="project-count">{String(index + 1).padStart(2, '0')} / {String(portfolioData.projects.length).padStart(2, '0')}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></div>
        </section>)}

        <section className="layer skills-layer" style={layerStyle(depth, skillsDepth)} aria-hidden={focusedDepth !== skillsDepth}><div className="section-heading"><p className="eyebrow">03 / Capabilities</p><h2>Tools for <em>thoughtful</em> work.</h2></div><div className="skill-grid">{Object.entries(portfolioData.skills).map(([category, skills]) => <div className="skill-group" key={category}><span>0{Object.keys(portfolioData.skills).indexOf(category) + 1}</span><h3>{category}</h3>{skills.map((skill) => <p key={skill}>{skill}</p>)}</div>)}</div></section>

        <section className="layer certificates-layer" style={layerStyle(depth, certificatesDepth)} aria-hidden={focusedDepth !== certificatesDepth}><div className="section-heading"><p className="eyebrow">04 / Learning log</p><h2>Always in <em>progress.</em></h2></div><div className="certificate-list">{portfolioData.certificates.map((certificate, index) => <div className="certificate" key={certificate.name}><span>0{index + 1}</span><div><h3>{certificate.name}</h3><p>{certificate.issuer}</p></div><time>{certificate.date}</time><ExternalLink /></div>)}</div></section>

        <section className="layer contact-layer" style={layerStyle(depth, contactDepth)} aria-hidden={focusedDepth !== contactDepth}><div className="contact-content"><p className="eyebrow">05 / Contact</p><h2>Let&apos;s make something <em>useful.</em></h2><p>Have a project, a question, or a good problem to untangle?</p><a className="email-link" href={`mailto:${portfolioData.contact.email}`}>{portfolioData.contact.email}<Mail /></a><div className="social-links"><a href={portfolioData.contact.github} target="_blank" rel="noreferrer"><Link /> GitHub</a><a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer"><Link /> LinkedIn</a></div></div></section>
      </div>

      <footer>© {new Date().getFullYear()} {portfolioData.name} <span>Built with curiosity</span></footer>
    </main>
  )
}

const layerStyle = (currentDepth, layerDepth) => {
  const repeatedLayerDepth = layerDepth + Math.round((currentDepth - layerDepth) / sections.length) * sections.length
  const distance = currentDepth - repeatedLayerDepth
  const scale = distance > 0 ? 1 + distance * 0.5 : 0.32 + Math.max(0, 1 + distance) * 0.68
  const opacity = Math.pow(Math.max(0, 1 - Math.abs(distance)), 2.5)
  return { opacity, transform: `translate(-50%, -50%) scale(${scale})`, zIndex: 10 - Math.round(Math.abs(distance) * 2), pointerEvents: Math.abs(distance) < 0.28 ? 'auto' : 'none' }
}

export default App
