import { FeatureCard } from './FeatureCard.tsx'
import { SectionHeading } from './SectionHeading.tsx'

const measurements = [
  { value: '10.9', color: 'text-gold', title: 'tokens/s, one laptop', detail: 'Llama 3.2 1B split across 2 servers on a Ryzen 5 laptop with 6 GB RAM' },
  { value: '15.3', color: 'text-gold', title: 'tokens/s, two servers', detail: 'Qwen3 0.6B split 3:1 across 2 RPC servers on one Linux machine' },
  { value: '1.2', color: 'text-sunset', title: 'tokens/s over the internet', detail: 'Laptop and a far cloud server. Why the pool stays on one hotspot.' },
  { value: '4.4×', color: 'text-sage', title: 'faster reload from cache', detail: '157 s first load, 35.8 s once helpers keep their layers' }
]

export function ProofSection() {
  return (
    <section id="proof" aria-labelledby="proof-title" className="landing-band">
      <div className="landing-section">
        <SectionHeading id="proof-title" icon="chart" eyebrow="PROOF, NOT PROMISES" title="We measured it.">
          Real runs of the QVAC layer split, 25 and 26 October 2026. A split is fast on a local network and slow over the
          internet, so Harambee is built for the hotspot.
        </SectionHeading>
        <div className="grid-auto">
          {measurements.map((measurement) => (
            <FeatureCard key={measurement.title} picture={<span className={`proof-number ${measurement.color}`}>{measurement.value}</span>} title={measurement.title}>
              {measurement.detail}
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  )
}
