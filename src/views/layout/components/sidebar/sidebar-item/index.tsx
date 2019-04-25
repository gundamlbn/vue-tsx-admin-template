import { RouteConfig } from 'vue-router'
import * as tsx from 'vue-tsx-support'
import { RenderContext, FunctionalComponentOptions } from 'vue'

import './index.scss'

import classNames from 'classnames'
import { Omit } from 'lodash'
import path from 'path'

import { isExternal } from '@/utils/validate'

import AppLink from '../link'
import style from './index.module.scss'

/**
 * 路由的Meta对象
 */
type RouteMeta = {
  hidden?: boolean
  title?: string
  icon?: string
  noShowingChildren?: boolean
}

/**
 * 路由对象，Meta强类型
 */
type Route = Omit<RouteConfig, 'meta'> & {
  /**
   * 路由的Meta对象
   */
  meta?: RouteMeta
}

/**
 * 组件Props
 */
type Props = {
  /**
   * 当前路由
   */
  item: RouteConfig
  /**
   * 是否为嵌套路由
   */
  isNest?: boolean
  /**
   * 是否展开
   */
  collapse?: boolean
  /**
   * 父节点路径
   */
  basePath?: string
}

/**
 * 计算组件的节点数量
 * @param children
 * @param parent
 */
function checkOneShowingChild(
  children: Route[] | undefined,
  parent: Route
): {
  hasOneShowingChild: boolean
  onlyOneChild: Route | null
} {
  let hasOneShowingChild = false
  let onlyOneChild = null
  let showingChildren: Route[] = []

  if (children) {
    showingChildren = children.filter((item: Route) => {
      if (item.meta && item.meta!.hidden) {
        return false
      } else {
        onlyOneChild = item
        return true
      }
    })
  }

  if (showingChildren.length === 1) {
    hasOneShowingChild = true
    return {
      hasOneShowingChild,
      onlyOneChild
    }
  } else if (showingChildren.length === 0) {
    onlyOneChild = { ...parent, path: '', meta: { noShowingChildren: true } }
    hasOneShowingChild = true
    return {
      onlyOneChild,
      hasOneShowingChild
    }
  }

  return {
    hasOneShowingChild,
    onlyOneChild
  }
}

/**
 * 获得路由URI
 * @param routePath
 * @param basePath
 */
function resolvePath(routePath: string, basePath: string) {
  if (isExternal(routePath)) {
    return routePath
  }
  return path.resolve(basePath, routePath)
}

/**
 * 函数式组件 侧边栏的Item对象
 * @Functional SidebarItem
 */
const SidebarItemFC = (context: RenderContext<Props>) => {
  const {
    props: { item, isNest = false, collapse = false, basePath = '' }
  } = context
  const { hasOneShowingChild, onlyOneChild } = checkOneShowingChild(item.children, item)
  return !item.meta || !item.meta.hidden ? (
    <div
      class={classNames('menu-wrapper', collapse ? 'simple-mode' : 'full-mode', {
        'first-level': !isNest
      })}
    >
      {hasOneShowingChild && (!onlyOneChild!.children || onlyOneChild!.meta!.noShowingChildren) ? (
        <AppLink to={resolvePath(onlyOneChild!.path, basePath!)}>
          <el-menu-item
            index={resolvePath(onlyOneChild!.path, basePath!)}
            class={classNames({ 'submenu-title-noDropdown': !isNest })}
          >
            {onlyOneChild!.meta && onlyOneChild!.meta.icon ? (
              <svg-icon name={onlyOneChild!.meta!.icon} class={style.svgIcon} />
            ) : (
              item.meta &&
              item.meta.icon && <svg-icon name={item.meta.icon} class={style.svgIcon} />
            )}
            {onlyOneChild!.meta && onlyOneChild!.meta.title ? (
              <span>{onlyOneChild!.meta!.title}</span>
            ) : (
              item.meta && item.meta.title && <span>{item.meta.title}</span>
            )}
          </el-menu-item>
        </AppLink>
      ) : (
        <el-submenu index={resolvePath(item.path, basePath!)} popper-append-to-body>
          <template slot="title">
            {item.meta && item.meta.icon && (
              <svg-icon name={item.meta.icon} class={style.svgIcon} />
            )}
          </template>
          <template slot="title">
            {item.meta && item.meta.title && <span>{item.meta.title}</span>}
          </template>
          {item!.children!.map(child => (
            <SidebarItem
              key={child.path}
              isNest={true}
              item={child}
              basePath={resolvePath(child.path, basePath!)}
              collapse={collapse}
              class="nest-menu"
            />
          ))}
        </el-submenu>
      )}
    </div>
  ) : (
    []
  )
}

const SidebarItem = tsx.ofType<Props>().convert(SidebarItemFC as FunctionalComponentOptions)

export default SidebarItem
