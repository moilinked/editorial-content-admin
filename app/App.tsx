import { NavLink, Outlet } from 'react-router'

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row">
        <aside className="rounded-3xl border bg-card p-4 shadow-sm lg:w-64">
          <p className="px-3 text-sm font-medium text-muted-foreground">Admin</p>
          <nav className="mt-4 flex gap-2 lg:flex-col">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`
              }
              end
            >
              仪表盘
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`
              }
            >
              设置
            </NavLink>
            <NavLink
              to="/anime"
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`
              }
            >
              动画
            </NavLink>
          </nav>
        </aside>

        <section className="flex-1">
          <Outlet />
        </section>
      </div>
    </main>
  )
}

export default App
