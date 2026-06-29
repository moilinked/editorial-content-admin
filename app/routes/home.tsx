import { atom, useAtom } from 'jotai'

import { Button } from '~/components/ui/button'

const counterAtom = atom(0)

function Home() {
  const [count, setCount] = useAtom(counterAtom)

  return (
    <div className="flex flex-col gap-8 rounded-3xl border bg-card p-8 shadow-sm">
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Dashboard</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">React Router 官方框架结构</h1>
        <p className="max-w-2xl text-muted-foreground">
          当前项目已按官方 template 重构为 <code className="rounded bg-muted px-1.5 py-0.5">app</code> 目录和
          <code className="rounded bg-muted px-1.5 py-0.5">app/routes.ts</code> 路由配置。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {['React Router', 'Tailwind CSS', 'Jotai'].map((item) => (
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
    </div>
  )
}

export default Home
