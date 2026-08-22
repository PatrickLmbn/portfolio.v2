import { useEffect, useRef, useState } from 'react'
import { Award, BriefcaseBusiness, Download, Home, Link, Mail, MouseLeft, Send, Wrench } from 'lucide-react'
import profile from './assets/profiles/pfp.jpg'
import cv from './assets/cv/Patrick C. Lambino.pdf'
import armonyx from './assets/projects/armonyx.jpg'
import buildx from './assets/projects/buildx.jpg'
import irms from './assets/projects/irms.jpg'
import oneshot from './assets/projects/oneshot.jpg'
import prism from './assets/projects/prism.jpeg'
import cyberSafetyCertificate from './assets/certificates/Certificate for Patrick C. Lambino for _QCU CyberSafety - Seminar_.pdf'
import lambinoCertificate from './assets/certificates/Certificate of Lambino.pdf'
import cybersecurityCertificate from './assets/certificates/Introduction_to_Cybersecurity_certificate_lambino-patrick-competente-gmail-com_954e0832-8472-4e96-97be-dfc9740b2000.pdf'
import dataScienceCertificate from './assets/certificates/Introduction_to_Data_Science_certificate_lambino-patrick-competente-gmail-com_ff8be104-9385-4e19-990a-697e6676fc55.pdf'
import modernAiCertificate from './assets/certificates/Introduction_to_Modern_AI_certificate_lambino-patrick-competente-gmail-com_2e7e8539-3dc4-4524-b500-33b2f535b18b.pdf'
import networkingBasicsCertificate from './assets/certificates/Networking_Basics_certificate_lambino-patrick-competente-gmail-com_49c374ec-89e4-4e1a-8d3d-00e1bc67dae4.pdf'
import cyberSafetyImage from './assets/certificates/qcu-cybersafety.png'
import lambinoImage from './assets/certificates/lambino.png'
import cybersecurityImage from './assets/certificates/cybersecurity.png'
import dataScienceImage from './assets/certificates/data-science.png'
import modernAiImage from './assets/certificates/modern-ai.png'
import networkingBasicsImage from './assets/certificates/networking-basics.png'

const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3000' : 'https://resend.patricklmbn.online')

const portfolioData = {
  name: 'Patrick Lambino',
  role: 'Software developer',
  intro: 'I build useful digital products with a curious mind and a practical hand.',
  bio: 'Full-stack developer focused on thoughtful interfaces, reliable systems, and the space where design meets engineering.',
  photo: profile,
  projects: [
    { title: 'Armonyxfitness', description: 'Gym management for registrations, attendance, and subscriptions across four branches.', image: armonyx, tags: ['PHP', 'CodeIgniter', 'MySQL', 'AWS'] },
    { title: 'BuildXDesigner', description: 'A visual website builder with integrated database, emailing system, and payment systems.', image: buildx, tags: ['React', 'TypeScript', 'Node.js', 'AWS', 'Linux Server (Self-Hosted)', 'Vercel', 'Supabase', 'Paymongo', 'Resend', 'DuckDNS', 'OpenAI'] },
    { title: 'Issue Report Management System', description: 'Centralized ticketing that reduced issue resolution time by 40 percent.', image: irms, tags: ['PHP', 'JavaScript', 'Ably', 'AWS'] },
    { title: 'OneShot', description: 'A scheduling tool for photobooth businesses to manage bookings and coordination.', image: oneshot, tags: ['React', 'Express', 'Supabase', 'Paymongo'] },
    { title: 'Prism', description: 'A browser extension for clearer, more confident writing in real time.', image: prism, tags: ['JavaScript', 'OpenAI', 'Chrome API'] },
  ],
  skills: {
    'Languages': ['PHP', 'JavaScript', 'SQL', 'CSS', 'HTML'],
    'Frameworks & Libraries': ['Laravel', 'CodeIgniter', 'React', 'Node.js', 'Express', 'TailwindCSS'],
    'Databases & Backend Services': ['MySQL', 'PostgreSQL', 'Supabase', 'REST API Development'],
    'Tools & Platforms': ['Git', 'GitHub', 'Docker', 'AWS', 'Linux Server', 'Tailscale', 'Vercel', 'Cloudflare', 'Namecheap', 'DuckDNS'],
  },
  certificates: [
    { name: 'Tech-Preneurship', issuer: 'Quezon City University', date: '2024', pdf: lambinoCertificate, image: lambinoImage },
    { name: 'QCU CyberSafety Seminar', issuer: 'Quezon City University', date: '2025', pdf: cyberSafetyCertificate, image: cyberSafetyImage },
    { name: 'Networking Basics', issuer: 'Cisco Networking Academy', date: '2026', pdf: networkingBasicsCertificate, image: networkingBasicsImage },
    { name: 'Introduction to Data Science', issuer: 'Cisco Networking Academy', date: '2026', pdf: dataScienceCertificate, image: dataScienceImage },
    { name: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', date: '2026', pdf: cybersecurityCertificate, image: cybersecurityImage },
    { name: 'Introduction to Modern AI', issuer: 'Cisco Networking Academy', date: '2026', pdf: modernAiCertificate, image: modernAiImage },
  ],
  contact: { email: 'lambino.patrick.competente@gmail.com', github: 'https://github.com/PatrickLmbn', linkedin: 'https://www.linkedin.com/in/lambino-patrick-c-4213ba405/' },
}

const sections = ['Profile', ...portfolioData.projects.map((project) => project.title), 'Skills & Tools', ...portfolioData.certificates.map((certificate) => certificate.name), 'Contact']
const projectStartDepth = 1
const skillsDepth = projectStartDepth + portfolioData.projects.length
const certificateStartDepth = skillsDepth + 1
const contactDepth = certificateStartDepth + portfolioData.certificates.length
const navSections = [
  { label: 'Profile', mobileLabel: 'Profile', start: 0, end: 0, icon: Home },
  { label: 'Recent Works', mobileLabel: 'Works', start: projectStartDepth, end: skillsDepth - 1, icon: BriefcaseBusiness },
  { label: 'Skills & Tools', mobileLabel: 'Skills', start: skillsDepth, end: skillsDepth, icon: Wrench },
  { label: 'Certificates', mobileLabel: 'Certs', start: certificateStartDepth, end: contactDepth - 1, icon: Award },
  { label: 'Contact', mobileLabel: 'Contact', start: contactDepth, end: contactDepth, icon: Mail },
]

function App() {
  const [depth, setDepth] = useState(0)
  const [targetDepthValue, setTargetDepthValue] = useState(0)
  const [contactStatus, setContactStatus] = useState('')
  const [isNavSwitching, setIsNavSwitching] = useState(false)
  const targetDepth = useRef(0)
  const dragStart = useRef(null)
  const arrivalDirection = useRef(1)
  const lastFocusedDepth = useRef(0)
  const navTransitionFrame = useRef(null)

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

  const stopNavSwitching = () => {
    if (navTransitionFrame.current) {
      cancelAnimationFrame(navTransitionFrame.current)
      navTransitionFrame.current = null
    }
    setIsNavSwitching(false)
  }

  const updateTargetDepth = (value) => {
    if (value !== targetDepth.current) arrivalDirection.current = value > targetDepth.current ? 1 : -1
    targetDepth.current = value
    setTargetDepthValue(value)
  }

  const smoothJumpTo = (index) => {
    const destination = index + Math.round((targetDepth.current - index) / sections.length) * sections.length
    const start = targetDepth.current
    const distance = destination - start

    if (Math.abs(distance) < 0.001) {
      updateTargetDepth(destination)
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      updateTargetDepth(destination)
      return
    }

    stopNavSwitching()
    setIsNavSwitching(true)

    const duration = Math.min(900, 380 + Math.abs(distance) * 140)
    const startTime = performance.now()
    const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      updateTargetDepth(start + distance * easeInOutCubic(progress))

      if (progress < 1) {
        navTransitionFrame.current = requestAnimationFrame(step)
        return
      }

      updateTargetDepth(destination)
      navTransitionFrame.current = null
      setIsNavSwitching(false)
    }

    navTransitionFrame.current = requestAnimationFrame(step)
  }

  const getFocusedLayer = (event) => {
    const layer = event.target.closest('.layer')
    return layer && layer.getAttribute('aria-hidden') === 'false' ? layer : null
  }
  const canScrollLayer = (layer, delta) => {
    if (!layer || layer.scrollHeight <= layer.clientHeight) return false
    const maxScroll = layer.scrollHeight - layer.clientHeight
    return delta > 0 ? layer.scrollTop < maxScroll - 1 : layer.scrollTop > 1
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    
    await fetch(`${apiUrl}/contact/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      }),
    })
    .then((response) => {
      if (response.ok) {
        setContactStatus('Email prepared successfully! Please check your email client.')
        event.currentTarget.reset()
      } else {
        setContactStatus('Failed to prepare email. Please try again later.')
      }
    })
    .catch(() => {
      setContactStatus('An error occurred while preparing the email. Please try again later.')
    })
  }

  useEffect(() => {
    const move = (amount) => {
      stopNavSwitching()
      updateTargetDepth(targetDepth.current + amount)
    }
    const onWheel = (event) => {
      const layer = getFocusedLayer(event)
      if (window.innerWidth <= 700 && canScrollLayer(layer, event.deltaY)) return
      if (window.innerWidth <= 700 && layer) event.preventDefault()
      move(event.deltaY > 0 ? 0.18 : -0.18)
    }
    const onKeyDown = (event) => {
      if (event.key === 'ArrowUp' || event.key === 'PageUp') move(-1)
      if (event.key === 'ArrowDown' || event.key === 'PageDown') move(1)
      if (event.key === 'Home') updateTargetDepth(0)
      if (event.key === 'End') updateTargetDepth(sections.length - 1)
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    return () => { window.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onKeyDown) }
  }, [])

  useEffect(() => () => stopNavSwitching(), [])

  useEffect(() => {
    if (focusedDepth === lastFocusedDepth.current) return
    const layer = document.querySelector('.layer[aria-hidden="false"]')
    if (layer) layer.scrollTop = arrivalDirection.current > 0 ? 0 : layer.scrollHeight - layer.clientHeight
    lastFocusedDepth.current = focusedDepth
  }, [focusedDepth])

  const jumpTo = (index) => smoothJumpTo(index)
  const onPointerDown = (event) => {
    stopNavSwitching()
    const layer = event.pointerType === 'touch' ? getFocusedLayer(event) : null
    const isFormInteraction = Boolean(event.target.closest('form, input, textarea'))
    if (event.pointerType === 'touch') event.currentTarget.setPointerCapture(event.pointerId)
    dragStart.current = { id: event.pointerId, y: event.clientY, lastY: event.clientY, pointerType: event.pointerType, layer, isFormInteraction, cameraDistance: 0, startTarget: targetDepth.current }
  }
  const onPointerMove = (event) => {
    const gesture = dragStart.current
    if (!gesture || gesture.id !== event.pointerId || gesture.pointerType !== 'touch') return
    const distance = gesture.lastY - event.clientY
    gesture.lastY = event.clientY
    if (!gesture.layer) {
      gesture.cameraDistance += distance
      updateTargetDepth(gesture.startTarget + gesture.cameraDistance / 170)
      return
    }
    const maxScroll = Math.max(0, gesture.layer.scrollHeight - gesture.layer.clientHeight)
    const previousScroll = gesture.layer.scrollTop
    gesture.layer.scrollTop = Math.max(0, Math.min(maxScroll, previousScroll + distance))
    const remainingDistance = distance - (gesture.layer.scrollTop - previousScroll)
    if (remainingDistance) {
      gesture.cameraDistance += remainingDistance
      updateTargetDepth(gesture.startTarget + gesture.cameraDistance / 170)
    }
  }
  const onPointerUp = (event) => {
    if (dragStart.current === null || dragStart.current.id !== event.pointerId) return
    if (dragStart.current.pointerType === 'touch') {
      dragStart.current = null
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
      return
    }
    const distance = dragStart.current.y - event.clientY
    if (Math.abs(distance) > 12) {
      if (dragStart.current.pointerType === 'touch') {
        const direction = distance > 0 ? 1 : -1
        const sectionCount = Math.max(1, Math.round(Math.abs(distance) / 170))
        updateTargetDepth(targetDepth.current + direction * sectionCount)
      } else {
        updateTargetDepth(targetDepth.current - distance / 170)
      }
    }
    dragStart.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }
  const onPointerCancel = () => { dragStart.current = null }


  return (
    <main className={`zoom-app${isNavSwitching ? ' is-nav-switching' : ''}`} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerCancel}>
      <header className="site-header">
        <button className="wordmark" onClick={() => jumpTo(0)} aria-label="Jump to profile">PL<span>.</span></button>
        <div className="depth-readout"><span>Now viewing</span><strong>{String(focusedDepth + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')} · {sections[focusedDepth]}</strong></div>
      </header>

      <div className="progress-track" aria-hidden="true"><div style={{ height: `${(progressDepth / (sections.length - 1)) * 100}%` }} /></div>
      <nav className="section-nav" aria-label="Portfolio sections">
        {navSections.map((section, index) => {
          const Icon = section.icon
          return (
            <button key={section.label} className={focusedDepth >= section.start && focusedDepth <= section.end ? 'active' : ''} onClick={() => jumpTo(section.start)} aria-label={`Go to ${section.label}`}>
              <Icon className="nav-icon" aria-hidden="true" />
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span className="nav-label">{section.label}</span>
              <span className="mobile-nav-label">{section.mobileLabel}</span>
            </button>
          )
        })}
      </nav>

      <div className="scene" aria-live="polite">
        <section className="layer profile-layer" style={layerStyle(depth, 0)} aria-hidden={focusedDepth !== 0}>
          <div className="profile-copy"><div className="profile-identity"><p className="eyebrow">01 / Profile</p><h1>{portfolioData.name.split(' ')[0]} <em>{portfolioData.name.split(' ').slice(1).join(' ')}</em></h1><p className="role">{portfolioData.role}</p></div><p className="intro">{portfolioData.intro}</p><p className="bio">{portfolioData.bio}</p><a className="cv-download" href={cv} download="Patrick C. Lambino.pdf"><span>Download CV</span><Download aria-hidden="true" /></a><a className="profile-email" href={`mailto:${portfolioData.contact.email}`}><Mail aria-hidden="true" /><span>{portfolioData.contact.email}</span></a><div className={`interaction-hint${focusedDepth === 0 ? '' : ' is-hidden'}`}><span className="hint-mouse"><MouseLeft /></span><span>Scroll down to next section</span></div></div><img className="profile-image" src={portfolioData.photo} alt={portfolioData.name} />
        </section>

        {portfolioData.projects.map((project, index) => <section className="layer projects-layer" style={layerStyle(depth, projectStartDepth + index)} aria-hidden={focusedDepth !== projectStartDepth + index} key={project.title}>
          <div className="section-heading"><p className="eyebrow">02 / Recent works</p><h2>Projects I&apos;ve <em>worked</em> on.</h2><p>Product thinking, shipped into the real world.</p></div>
          <div className="project-card"><img src={project.image} alt="" /><div className="project-detail"><span className="project-count">{String(index + 1).padStart(2, '0')} / {String(portfolioData.projects.length).padStart(2, '0')}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></div>
        </section>)}

        <section className="layer skills-layer" style={layerStyle(depth, skillsDepth)} aria-hidden={focusedDepth !== skillsDepth}><div className="section-heading"><p className="eyebrow">03 / Skills & Tools</p><h2>Tools for <em>thoughtful</em> work.</h2></div><div className="skill-grid">{Object.entries(portfolioData.skills).map(([category, skills]) => <div className="skill-group" key={category}><span>0{Object.keys(portfolioData.skills).indexOf(category) + 1}</span><h3>{category}</h3>{skills.map((skill) => <p key={skill}>{skill}</p>)}</div>)}</div></section>

        {portfolioData.certificates.map((certificate, index) => <section className="layer certificates-layer" style={layerStyle(depth, certificateStartDepth + index)} aria-hidden={focusedDepth !== certificateStartDepth + index} key={certificate.name}>
          <div className="section-heading"><p className="eyebrow">04 / Certificates</p><h2>{certificate.name}</h2><p>{certificate.issuer} · {certificate.date}</p></div>
          <div className="certificate-card"><img className="certificate-preview" src={certificate.image} alt={certificate.name} /></div>
        </section>)}

        <section className="layer contact-layer" style={layerStyle(depth, contactDepth)} aria-hidden={focusedDepth !== contactDepth}>
          <div className="contact-content">
            <div className="contact-intro"><p className="eyebrow">05 / Contact</p><h2>Let&apos;s <em>connect</em> and make something <em>useful.</em></h2><p>Have a project, a question, or a good problem to untangle?</p><div className="social-links"><a href={portfolioData.contact.github} target="_blank" rel="noreferrer"><Link /> GitHub</a><a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer"><Link /> LinkedIn</a></div></div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="contact-field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Jane Smith" required /></div>
              <div className="contact-field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="jane@example.com" required /></div>
              <div className="contact-field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows="4" placeholder="Tell me a little about what you&apos;re working on..." required /></div>
              <button type="submit">Send email <Send aria-hidden="true" /></button>
              <p className="contact-status" role="status" aria-live="polite">{contactStatus}</p>
            </form>
          </div>
        </section>
      </div>

      <footer>© {new Date().getFullYear()} {portfolioData.name}</footer>
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
