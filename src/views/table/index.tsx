import { VNode } from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'

import { getList, TableItem, Table as TableType } from '@/api/table'

type TableColumnScopedSlots = tsx.Component<
  {},
  {},
  {
    default: {
      row: TableItem
      column: import('element-ui').TableColumn
      $index: number
    }
  }
>['$scopedSlots']

@Component
export default class Table extends tsx.Component<{}> {
  /**
   * @data list
   */
  list: TableType['items'] | null = null

  /**
   * @data listLoading
   */
  listLoading = true

  _listQuery: any = {}

  /**
   * lifecycle created
   */
  created() {
    this.fetchData()
  }

  statusFilter(status: string) {
    const statusMap: { [id: string]: string } = {
      published: 'success',
      draft: 'gray',
      deleted: 'danger'
    }
    return statusMap[status]
  }

  fetchData() {
    this.listLoading = true
    getList(this._listQuery).then(response => {
      this.list = response.data.items!
      this.listLoading = false
    })
  }

  /**
   * @lifecycle render
   */
  render() {
    return (
      <div class="app-container">
        <el-table
          v-loading={this.listLoading}
          data={this.list}
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column
            align="center"
            label="ID"
            width="95"
            scopedSlots={
              {
                default: scope => [scope.$index]
              } as TableColumnScopedSlots
            }
          />
          <el-table-column
            label="Title"
            scopedSlots={
              {
                default: scope => [scope.row.title]
              } as TableColumnScopedSlots
            }
          />
          <el-table-column
            label="Author"
            width="110"
            align="center"
            scopedSlots={
              {
                default: scope => [<span>{scope.row.author}</span>]
              } as TableColumnScopedSlots
            }
          />
          <el-table-column
            label="Pageviews"
            width="110"
            align="center"
            scopedSlots={
              {
                default: scope => [scope.row.pageviews]
              } as TableColumnScopedSlots
            }
          />
          <el-table-column
            class-name="status-col"
            label="Status"
            width="110"
            align="center"
            scopedSlots={
              {
                default: scope => [
                  <el-tag type={this.statusFilter(scope.row.status)}>{scope.row.status}</el-tag>
                ]
              } as TableColumnScopedSlots
            }
          />
          <el-table-column
            align="center"
            prop="created_at"
            label="Display_time"
            width="200"
            scopedSlots={
              {
                default: scope => [
                  <i class="el-icon-time" />,
                  <span>{scope.row.display_time}</span>
                ]
              } as TableColumnScopedSlots
            }
          />
        </el-table>
      </div>
    )
  }
}
