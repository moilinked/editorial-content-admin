function Settings() {
  return (
    <div className="rounded-3xl border bg-card p-8 shadow-sm">
      <p className="text-sm font-medium text-muted-foreground">Settings</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">设置页</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        当前页面由 <code className="rounded bg-muted px-1.5 py-0.5">app/routes.ts</code> 映射到
        <code className="rounded bg-muted px-1.5 py-0.5">app/routes/settings.tsx</code>。
      </p>
    </div>
  )
}

export default Settings
