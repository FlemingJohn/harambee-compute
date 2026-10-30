import type { RouteName } from '../types/RouteName.ts'
import { AppScreen } from './AppScreen.tsx'
import { Icon } from './Icon.tsx'

export function NotConnectedScreen({ route }: { route: RouteName }) {
  return (
    <AppScreen route={route}>
      <section aria-labelledby="not-connected-title" className="card stack">
        <h1 id="not-connected-title" className="card-heading">
          <Icon name="laptop" size={28} className="text-sunset" />
          Waiting for the coordinator
        </h1>
        <p className="muted">These screens show the live pool, so they run on the coordinator laptop.</p>
        <span className="label">On the coordinator laptop</span>
        <code className="command">npm run coordinator -- --host &lt;this laptop's hotspot IP&gt; --gpu</code>
        <p className="small muted">Then open <span className="mono">http://127.0.0.1:8080</span> on that laptop. This page connects by itself as soon as the coordinator is running.</p>
      </section>
    </AppScreen>
  )
}
