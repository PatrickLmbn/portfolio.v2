
const Technologies = () => {
  const technologies = [
    'PHP',
    'JavaScript',
    'CodeIgniter',
    'MySql',
    'AWS',
    'Bootstrap',
    'React',
    'Node.js',
    'Express',
    'Supabase',
    'Paymongo',
    'Resend',
    'Pyhton',
    'OpenAI',
    'Vercel',
    'DuckDNS',
    'NameCheap',
    'Linux Server(Self-hosted server)',
    'Mitosis',
    'Tailwind CSS',
    'Ably',
    'HTML',
    'CSS',
    'Chrome Extension API',
  ]

  return (
    <section id="technologies" className="mt-16 w-full px-4 md:px-0">
      <div className="rounded-[28px] border border-white/30 bg-white/15 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-600/80">Technologies</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-slate-900/90 md:text-4xl">
              Technologies I&apos;ve Used
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-slate-700/80 md:text-base">
            A quick view of the tools and stacks that appear across my projects.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-md border border-slate-300/70 bg-white/70 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-slate-700 shadow-sm"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Technologies
