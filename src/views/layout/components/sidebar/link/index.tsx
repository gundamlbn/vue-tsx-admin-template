import * as tsx from 'vue-tsx-support'
import { isExternal } from '@/utils/validate'
import { RenderContext, FunctionalComponentOptions } from 'vue'

type ScopedSlotsArgs = {
  default: {}
}

type Props = {
  to: string
}

const isExternalLink = (routePath: string) => {
  return isExternal(routePath)
}

const Link = (context: RenderContext<Props>) => {
  const {
    props: { to },
    scopedSlots
  } = context
  const _scopedSlots = scopedSlots as tsx.ScopedSlots<ScopedSlotsArgs>
  return isExternalLink(to) ? (
    <a href={to} target="_blank" rel="noopener">
      {_scopedSlots.default({})}
    </a>
  ) : (
    <router-link to={to}>{_scopedSlots.default({})}</router-link>
  )
}

export default tsx.ofType<Props, ScopedSlotsArgs>().convert(Link as FunctionalComponentOptions)
