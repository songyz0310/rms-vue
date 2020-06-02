<template>
  <el-container class="clear-padding fill-container">
    <el-header class="clear-padding logo-div">
      <img v-if="!menuObj.isCollapse" src="../../assets/logo1.png" />
      <img v-else src="../../assets/logo2.png" />
    </el-header>
    <el-main class="clear-padding">
      <el-menu
        :default-active="defaultActive"
        :default-openeds="defaultOpen"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="menuObj.isCollapse"
      >
        <template v-for="menu in menuList">
          <el-submenu
            v-if="menu.children&&menu.children.length>0"
            :key="menu.key"
            :index="menu.key"
          >
            <template slot="title">
              <i :class="menu.icon"></i>
              <span>{{menu.name}}</span>
            </template>
            <el-menu-item
              v-for="subMenu in menu.children"
              :key="subMenu.key"
              :index="subMenu.key"
              @click="toPage(subMenu.path)"
            >{{subMenu.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item v-else :key="menu.key" :index="menu.key">
            <i :class="menu.icon"></i>
            <span>{{menu.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-main>
    <el-footer
      v-show="!menuObj.isCollapse"
      class="clear-padding owner-icp"
      height="20px"
    >{{owner.icp}}</el-footer>
  </el-container>
</template>
<script>
export default {
  props: {
    menuObj: {
      type: Object
    }
  },
  data() {
    return {
      owner: {
        icp: "©2020  京ICP备20005488号"
      },

      defaultActive: null,
      defaultOpen: [],
      menuList: [
        {
          name: "信息管理",
          icon: "el-icon-s-comment",
          key: "messageManage",
          path: null,
          children: [
            {
              name: "写信",
              icon: null,
              key: "writeMessagePage",
              path: "/message/write"
            },
            {
              name: "收件箱",
              icon: null,
              key: "recipientMessagePage",
              path: "/message/recipient"
            },
            {
              name: "发件箱",
              icon: null,
              key: "sendedMessagePage",
              path: "/message/sended"
            },
            {
              name: "草稿箱",
              icon: null,
              key: "draftMessagePage",
              path: "/message/draft"
            },
            {
              name: "垃圾箱",
              icon: null,
              key: "rubishMessagePage",
              path: "/message/rubish"
            },
            {
              name: "已删除",
              icon: null,
              key: "deletedMessagePage",
              path: "/message/deleted"
            }
          ]
        },
        {
          name: "系统管理",
          icon: "el-icon-menu",
          key: "systemManage",
          path: null,
          children: null
        }
      ],
      allMenuMap: null
    };
  },
  created() {
    //将菜单转换为map方便取值
    this.allMenuMap = new Map();
    this.menuList.forEach(menu => {
      this.allMenuMap.set(menu.path, menu);

      if (menu.children && menu.children.length > 1) {
        menu.children.forEach(subMenu => {
          subMenu.parentKey = menu.key;
          this.allMenuMap.set(subMenu.path, subMenu);
        });
      }
    });
  },
  mounted() {
    this.activeMenu(this.$route.path);
  },
  methods: {
    toPage(path) {
      if (this.$route.path != path) {
        this.$router.push({ path });
      }
    },
    activeMenu(path) {
      let menu = this.allMenuMap.get(path);
      if (menu.parentKey) {
        this.defaultOpen = [menu.parentKey];
      } else {
        this.defaultOpen = [menu.key];
      }
      this.defaultActive = menu.key;
    }
  },
  watch: {
    $route(to, from) {
      //路由跳转动态调整打开和激活的菜单
      this.activeMenu(to.path);
    }
  }
};
</script>
<style scoped>
.el-container {
  overflow: hidden;
}

.el-menu {
  border: 0;
}
.logo-div {
  height: 45px !important;
  background: #ffffff;
  text-align: center;
}
.logo-div > img {
  height: 100%;
}
.owner-icp {
  color: gold;
  text-align: center;
  font-size: 12px;
}
</style>