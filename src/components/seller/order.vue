<template>
  <div>
    <el-card>
      <h2>我的订单</h2>

      <!-- 订单列表数据 -->
      <el-table :data="orderlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_num"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="收件人" prop="name"></el-table-column>
        <el-table-column label="电话号码" prop="phone"> </el-table-column>
        <el-table-column label="收件地址" prop="address"> </el-table-column>
        <el-table-column label="下单时间" prop="sub_time"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showBox(scope.$index)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 修改地址的对话框 -->
    <el-dialog title="修改地址" :visible.sync="addressVisible" width="50%" @close="addressDialogClosed">
      <el-form :model="addressForm" ref="addressFormRef" label-width="100px">
        <el-form-item label="收件人姓名" prop="name">
          <el-input v-model="addressForm.name"></el-input>
        </el-form-item>
        <el-form-item label="收件人号码" prop="phone">
          <el-input v-model="addressForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressVisible = false">取 消</el-button>
        <el-button type="primary" @click="getAddress">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      orderlist: [],
      addressVisible: false,
      addressForm: {
        name: '',
        phone: '',
        address2: ''
      },
      // addressFormRules: {
      //   address2: [
      //     { required: true, message: '请填写详细地址', trigger: 'blur' }
      //   ]
      // },
      progressVisible: false,
      progressInfo: [],
      index: 0
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    async getOrderList () {
      const { data: res } = await this.$http.get('/api/seller', {
        params: this.queryInfo
      })
      if (res.status !== 0) {
        return this.$message.error('获取订单列表失败！')
      }
      this.total = res.total
      this.orderlist = res.data
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    },
    // 展示修改地址的对话框
    showBox (i) {
      this.addressVisible = true
      this.index = i
    },
    addressDialogClosed () {
      this.$refs.addressFormRef.resetFields()
    },
    async getAddress () {
      this.addressVisible = false
      const mData = {
        name: this.addressForm.name,
        phone: this.addressForm.phone,
        address: this.addressForm.address2,
        order_id: this.orderlist[this.index].order_id
      }
      const { data: res } = await this.$http.get('/api/address', {
        params: mData
      })
      console.log(res);
      if (res.status !== 0) {
        return this.$message.error('修改地址失败！')
      }
      this.$message.success('修改地址成功！')
      this.getOrderList()
    }

  }
}
</script>

<style lang="less" scoped>
h2 {
  margin-bottom: 20px;
}
.el-cascader {
  width: 100%;
}
</style>
