<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [],
            itemsData: [
                {
                    icon: 'el-icon-more',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'table',
                    title: '基础表格'
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'tabs',
                    title: 'tab选项卡'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '表单相关',
                    subs: [
                        {
                            index: 'form',
                            title: '基本表单'
                        },
                        {
                            index: '3-2',
                            title: '三级菜单',
                            subs: [
                                {
                                    index: 'editor',
                                    title: '富文本编辑器'
                                },
                                {
                                    index: 'markdown',
                                    title: 'markdown编辑器'
                                }
                            ]
                        },
                        {
                            index: 'upload',
                            title: '文件上传'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'icon',
                    title: '自定义图标'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'charts',
                    title: 'schart图表'
                },
                {
                    icon: 'el-icon-rank',
                    index: '6',
                    title: '拖拽组件',
                    subs: [
                        {
                            index: 'drag',
                            title: '拖拽列表'
                        },
                        {
                            index: 'dialog',
                            title: '拖拽弹框'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-global',
                    index: 'i18n',
                    title: '国际化功能'
                },
                {
                    icon: 'el-icon-lx-warn',
                    index: '7',
                    title: '错误处理',
                    subs: [
                        {
                            index: 'permission',
                            title: '权限测试'
                        },
                        {
                            index: '404',
                            title: '404页面'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-redpacket_fill',
                    index: '/donate',
                    title: '支持作者'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: '8',
                    title: '课程管理',
                    subs: [
                        {
                            index: 'createcourse',
                            title: '新增课程'
                        },

                        {
                            index: 'course',
                            title: '课程列表'
                        },

                    ]
                },{
                    icon: 'el-icon-user',
                    index: '9',
                    title: '用户管理',
                    subs: [
                        {
                            index: 'users',
                            title: '用户列表'
                        },{
                            index: 'createteachers',
                            title: '新增教师'
                        },{
                            index: 'teachers',
                            title: '教师列表'
                        },

                    ]
                }, {
                    icon: 'el-icon-setting',
                    index: '10',
                    title: '网站设置',
                    subs: [
                        {
                            index: 'createagreement',
                            title: '新增协议'
                        },

                        {
                            index: 'agreements',
                            title: '协议列表'
                        },

                    ]
                },

            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });

        // 1、获取后端路由的数据
        var adminMenuData = this.$root.menuData[1].children;
        // 2、编写计算Items 的逻辑
        let computedItems = [];
        let findItems = function(array1, array2) {
            array1.forEach(route => {
                let path = route.path;
                array2.forEach(item => {
                    // 没有subs  的情况下进行运算
                    if (!item.hasOwnProperty('subs') && item.index === path) {
                        computedItems.push(item);
                    }
                    else if(item.hasOwnProperty('subs')) {
                        let subForItem = {};
                        subForItem.icon = item.icon;
                        subForItem.index = item.index;
                        subForItem.title = item.title;
                        subForItem.subs = [];
                        let subArray = item.subs;
                        subArray.forEach(sub => {
                            // 没有3级菜单的情况下进行数据注入

                            if (!sub.hasOwnProperty('subs') && sub.index === path) {
                                subForItem.subs.push(sub);
                            }
                        });
                        // 如果 二级目录 存在，则需要往computedItems 注入数据
                        if (subForItem.subs.length !== 0) {
                            let hasItem = false;
                            computedItems.forEach(item=>{
                               if (item.index === subForItem.index) {
                                   item.subs.push(subForItem.subs[0]);
                                   hasItem = true;
                               }
                            });
                            if (!hasItem){
                                computedItems.push(subForItem);
                            }

                        }
                    }
                });
            })
        };

        // 3、调用函数 计算出Items
        findItems(adminMenuData, this.itemsData);
        // 4、将计算出的数据赋值给 Data 里的 items， 供页面渲染
        this.items = computedItems;

    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
