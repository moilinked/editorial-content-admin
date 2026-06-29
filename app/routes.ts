import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('settings', 'routes/settings.tsx'),
  route('anime', 'routes/anime.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig
