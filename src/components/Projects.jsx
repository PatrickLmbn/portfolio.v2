import armonyx from '/src/assets/projects/armonyx.jpg';
import buildx from '/src/assets/projects/buildx.jpg';
import irms from '/src/assets/projects/irms.jpg';
import oneshot from '/src/assets/projects/oneshot.jpg';
import prism from '/src/assets/projects/prism.jpeg';
import { motion } from "motion/react";

const projects = [
  {
    id: 1,
    title: "Armonyxfitness",
    description: "A full-stack gym management system handling registrations, attendance, and subscriptions for 500+ active members across 4 branches",
    image: armonyx,
    Technologies: ["PHP", "JavaScript", "CodeIgniter", "MySql", "AWS", "Bootstrap"],
  },
  {
    id: 2,
    title: "BuildXDesigner",
    description: "A drag-and-drop website builder with an integrated database, email, and payment systems, enabling users to create and manage websites without coding knowledge",
    image: buildx,
    Technologies: ["React", "Node.js", "Express", "Supabase", "Paymongo", "Resend", "AWS", "Pyhton", "OpenAI", "Vercel", "DuckDNS", "NameCheap", "Linux Server(Self-hosted server)", "Mitosis", "Tailwind CSS"],

  },
  {
    id: 3,
    title: "Issue Report Management System (IRMS)",
    description: "a centralized ticketing platform for cross-platform issue tracking, reducing resolution time by 40 percents",
    image: irms,
    Technologies: ["PHP", "JavaScript", "MySql", "AWS", "Bootstrap", "Ably"],
    
  },
  {
    id: 4,
    title: "OneShot",
    description: "A scheduling tool for photobooth businesses to manage bookings and coordination",
    image: oneshot,
    Technologies: ["React", "Node.js", "Express", "AWS", "Supabase", "Paymongo", "Vercel", "Tailwind CSS"],

  },
  {
    id: 5,
    title: "Prism",
    description: "A browser extension that help users correct their grammar and spelling mistakes in real-time, enhancing their writing skills and communication",
    image: prism,
    Technologies: ["Javascript", "HTML", "CSS", "Chrome Extension API", "OpenAI"],

  },  
]

const technologyBadgeClassName =
  "rounded-xl border border-slate-300/70 bg-white/80 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-slate-700 leading-none py-2 px-1 "

const Projects = () => {
  return (
    <div className="mt-30 flex flex-col items-start">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold mb-10 mt-50 flex items-center gap-3 flex-wrap">
          PROJECTS I'VE <span className="hero-outline">WORKED</span> ON
        </h1>
        {projects.map((project, index) => {
          const isImageLeft = index % 2 === 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: isImageLeft ? -40 : 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.12,
              }}
              className="my-4 w-full overflow-hidden rounded-[28px] border border-white/30 bg-white/10 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
            >
              <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
                {isImageLeft ? (
                  <>
                    <div className="overflow-hidden p-4 md:p-5">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full min-h-65 w-full rounded-[20px] object-cover shadow-[0_16px_30px_rgba(15,23,42,0.15)]"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start p-6 md:p-8">
                      <h2 className="text-3xl font-bold tracking-[-0.03em] text-slate-900/90">{project.title}</h2>
                      <p className="mt-4 text-base leading-relaxed text-slate-700/90 md:text-lg">{project.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.Technologies.map((technology) => (
                          <span
                            key={technology}
                            className={technologyBadgeClassName}
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="order-2 flex flex-col items-start justify-start p-6 md:order-1 md:p-8">
                      <h2 className="text-3xl font-bold tracking-[-0.03em] text-slate-900/90">{project.title}</h2>
                      <p className="mt-4 text-base leading-relaxed text-slate-700/90 md:text-lg">{project.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.Technologies.map((technology) => (
                          <span
                            key={technology}
                            className={technologyBadgeClassName}
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="order-1 overflow-hidden p-4 md:order-2 md:p-5">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full min-h-65 w-full rounded-[20px] object-cover shadow-[0_16px_30px_rgba(15,23,42,0.15)]"
                      />
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.section>
    </div>
  );
};

export default Projects
