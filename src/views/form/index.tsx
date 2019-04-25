import { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'

import * as style from './index.module.scss'

/**
 * Form 页面
 * @Component Form
 */
@Component
export default class Form extends tsx.Component<{}> {
  /**
   * 画面上form的model
   * @data form
   */
  form = {
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
  }

  /**
   * Form submit
   * @method onSubmit
   */
  onSubmit() {
    this.$message('submit!')
  }

  /**
   * Form cancel
   * @method onCancel
   */
  onCancel() {
    this.$message({
      message: 'cancel!',
      type: 'warning'
    })
  }

  /**
   * 画面渲染
   * @lifecycle render
   */
  render(): VNode {
    return (
      <div class="app-container">
        {/* model必须这样传 */}
        <el-form ref="form" label-width="120px" {...{ props: { model: this.form } }}>
          <el-form-item label="Activity name">
            <el-input v-model={this.form.name} />
          </el-form-item>
          <el-form-item label="Activity zone">
            <el-select v-model={this.form.region} placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="Activity time">
            <el-col span={11}>
              <el-date-picker
                v-model={this.form.date1}
                type="date"
                placeholder="Pick a date"
                style="width: 100%;"
              />
            </el-col>
            <el-col span={2} class={style.line}>
              -
            </el-col>
            <el-col span={11}>
              <el-time-picker
                v-model={this.form.date2}
                type="fixed-time"
                placeholder="Pick a time"
                style="width: 100%;"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="Instant delivery">
            <el-switch v-model={this.form.delivery} />
          </el-form-item>
          <el-form-item label="Activity type">
            <el-checkbox-group v-model={this.form.type}>
              <el-checkbox label="Online activities" name="type" />
              <el-checkbox label="Promotion activities" name="type" />
              <el-checkbox label="Offline activities" name="type" />
              <el-checkbox label="Simple brand exposure" name="type" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Resources">
            <el-radio-group v-model={this.form.resource}>
              <el-radio label="Sponsor" />
              <el-radio label="Venue" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Activity form">
            <el-input v-model={this.form.desc} type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" onClick={this.onSubmit}>
              Create
            </el-button>
            <el-button onClick={this.onCancel}>Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    )
  }
}
