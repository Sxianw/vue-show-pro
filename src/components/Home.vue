<template>
  <el-container>
    <el-header>
      <div id="logo-box">
        <img src="../assets/img/heima.png" alt>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="menushow?'65px':'200px'">
        <div
          @click="menushow=!menushow"
          style="height: 25px;
          width:200px;
          line-height: 25px;
          color: #fff;
          text-align: center;
          font-size: 12px;
          user-select: none;
          background-color: #4a5064;
          letter-spacing: 0.1em;
          cursor: pointer;"
          :style="menushow?'width:65px;':'width:200px;'"
        >|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :style="menushow?'width:65px;':'width:200px;'"
          :collapse="menushow"
          :collapse-transition="false"
          :unique-opened="true"
        >
          <el-submenu :index="item.id+''" v-for="(item, k) in menuList" :key="item.id">
            <template slot="title">
              <i :class="'iconfont icon-' +menuicon[k]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="item.id+'-'+item2.id"
              v-for="item2 in item.children"
              :key="item2.id"
            >
              <i class="el-icon-menu"></i>
              {{item2.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getMenuList()
  },
  data() {
    return {
      menushow: false,
      menuList: [],
      menuicon: ['users', 'tijikongjian', 'shangpin', 'danju', 'baobiao']
    }
  },
  methods: {
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }

      console.log(res.data)
      this.menuList = res.data
    },
    logout() {
      this.$confirm('确认要退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: #373d41;
    padding: 0;
    padding-right: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    #logo-box {
      display: flex;
      align-items: center;
      user-select: none;
      font-size: 22px;
      color: #fff;
      img {
        height: 50px;
        width: 50px;
        margin-right: 10px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
}

</style>
