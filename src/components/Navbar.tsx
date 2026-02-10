import { useEffect, useState } from 'react'

const navItems = [
  { id: 'home', label: '[ Home ]' },
  { id: 'about', label: '[ About ]' },
  { id: 'projects', label: '[ Projects ]' },
  { id: 'highlights', label: '[ Highlights ]' },
  { id: 'contact', label: 'Contact Me' },
]

const Navbar = () => {
  const [activeId, setActiveId] = useState('home')
  const centerItems = navItems.filter((item) => item.id !== 'contact')
  const contactItem = navItems.find((item) => item.id === 'contact')

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0.1,
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex min-h-16 max-w-6xl items-center px-6 py-3 font-marvel">
        <a
          href="#home"
          className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-900"
        >
          Portfolio
        </a>
        <div className="flex flex-1 items-center justify-center gap-4 text-xs font-medium text-slate-500 sm:gap-6 sm:text-sm">
          {centerItems.map((item) => {
            const isActive = activeId === item.id

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'page' : undefined}
                className={`transition-colors ${
                  isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span
                  className={`border-b-2 pb-1 transition-colors ${
                    isActive ? 'border-slate-900' : 'border-transparent'
                  }`}
                >
                  {item.label}
                </span>
              </a>
            )
          })}
        </div>
        {contactItem ? (
          <div className="flex shrink-0 items-center text-xs font-medium sm:text-sm">
            <a
              href={`#${contactItem.id}`}
              aria-current={activeId === contactItem.id ? 'page' : undefined}
              className={`transition-colors ${
                activeId === contactItem.id
                  ? 'text-slate-900'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span
                className={`border-b-2 pb-1 transition-colors ${
                  activeId === contactItem.id ? 'border-slate-900' : 'border-transparent'
                }`}
              >
                {contactItem.label}
              </span>
            </a>
          </div>
        ) : null}
      </nav>
    </header>
  )
}

export default Navbar
