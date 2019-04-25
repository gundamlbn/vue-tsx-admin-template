import Vue, { VNode } from 'vue'

declare module 'vue/types/options' {
  interface FunctionalComponentOptions<Props = DefaultProps, PropDefs = PropsDefinition<Props>> {
    new(): Vue
    (context?: RenderContext<Props>): VNode | VNode[]
  }

}
