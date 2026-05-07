import { atom, useAtom } from 'jotai'

import { Button } from '@/components/ui/button'

const counterAtom = atom(0)

function App() {
  const [count, setCount] = useAtom(counterAtom)
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <section className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border bg-card p-8 shadow-sm">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Linil Admin</p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Vite + React 管理后台已初始化</h1>
          <p className="max-w-2xl text-muted-foreground">
            当前项目已经接入 Tailwind CSS、shadcn/ui 和 Jotai，可直接开始搭建后台页面与状态管理。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {['Vite React', 'Tailwind CSS', 'shadcn/ui'].map((item) => (
            <div key={item} className="rounded-2xl border bg-background p-4">
              <p className="font-medium">{item}</p>
              <p className="mt-2 text-sm text-muted-foreground">已完成基础配置</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium">Jotai 状态验证</p>
            <p className="text-sm text-muted-foreground">当前计数：{count}</p>
          </div>
          <Button type="button" onClick={() => setCount((value) => value + 1)}>
            增加计数
          </Button>
        </div>
      </section>
    </main>
  )
}

export default App
