import { isRouteErrorResponse, Links, Meta, Scripts, ScrollRestoration } from 'react-router'

import type { Route } from './+types/root'
import App from './App'
import './app.css'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>linil-admin</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return <App />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = '发生了未知错误。'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details = error.status === 404 ? '请求的页面不存在。' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto max-w-3xl rounded-3xl border bg-card p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">{message}</h1>
        <p className="mt-3 text-muted-foreground">{details}</p>
        {stack ? <pre className="mt-6 overflow-auto rounded-2xl bg-muted p-4 text-sm">{stack}</pre> : null}
      </div>
    </main>
  )
}
