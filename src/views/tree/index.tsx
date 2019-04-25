import Vue, { VNode } from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'

import { Tree as ElTree } from 'element-ui'
import { TreeData } from 'element-ui/types/tree'
import { identity } from 'lodash'

type RefKeys = 'tree2'

type Refs = Record<RefKeys, Vue['$refs']['']>

/**
 * 树形控件页面
 * @Component Tree
 */
@Component
export default class Tree extends tsx.Component<{}> {
  /**
   * @data filterText
   */
  filterText = ''

  /**
   * @data data2
   */
  data2 = [
    {
      id: 1,
      label: 'Level one 1',
      children: [
        {
          id: 4,
          label: 'Level two 1-1',
          children: [
            {
              id: 9,
              label: 'Level three 1-1-1'
            },
            {
              id: 10,
              label: 'Level three 1-1-2'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      label: 'Level one 2',
      children: [
        {
          id: 5,
          label: 'Level two 2-1'
        },
        {
          id: 6,
          label: 'Level two 2-2'
        }
      ]
    },
    {
      id: 3,
      label: 'Level one 3',
      children: [
        {
          id: 7,
          label: 'Level two 3-1'
        },
        {
          id: 8,
          label: 'Level two 3-2'
        }
      ]
    }
  ]

  /**
   * @data defaultProps
   */
  defaultProps = {
    children: 'children',
    label: 'label'
  }

  /**
   * 观察 过滤用字段的变更
   * @watch filterText
   * @param val
   */
  @Watch(identity<keyof Tree >('filterText'))
  onFilterTextChange(val: string) {
    ((this.$refs as Refs)['tree2'] as ElTree).filter(val)
  }

  /**
   * 过滤树状节点
   * @method filterNode
   * @param value
   * @param data
   */
  filterNode(value: string, data: TreeData) {
    if (!value) { return true }
    return data.label && data.label.indexOf(value) !== -1
  }

  /**
   * 渲染方法
   * @lifecycle render
   */
  render():VNode {
    return <div class="app-container">
      <el-input
        v-model={this.filterText}
        placeholder="Filter keyword"
        style="margin-bottom:30px;"
      />
      <el-tree
        ref={identity<RefKeys>('tree2')}
        data={this.data2}
        props={this.defaultProps}
        filter-node-method={this.filterNode}
        class="filter-tree"
        default-expand-all
      />
    </div>
  }
}
