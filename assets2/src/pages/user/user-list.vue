<template>
    <div>
        <QueryBar>
            <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="用户名">
                    <el-input v-model="query.userName" @keyup.enter="handleSearch" placeholder="用户名"
                              size="small"></el-input>
                </el-form-item>
                <el-form-item label="所属部门">
                    <el-select v-model="query.group" placeholder="所属部门" size="small">
                        <el-option label="架构部" value="jiagou"></el-option>
                        <el-option label="研发部" value="yanfa"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch" size="small">查询</el-button>
                </el-form-item>
            </el-form>
        </QueryBar>
        <ToolBar>
            <el-button type="primary" @click="handleAdd" size="small">
                <FontIcon name="el-icon-plus"/>
                添加
            </el-button>
        </ToolBar>
        <el-table
                :data="users"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="用户名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄"
                    width="180">
            </el-table-column>
            <el-table-column
                    :formatter="renderGroup"
                    prop="group"
                    label="所属部门"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template scope="scope">
                    <Permission permission="detail">
                        <el-button @click="() => handleDetail(scope)" type="text" size="small">详情</el-button>
                    </Permission>
                    <Permission permission="detail">
                        <el-button @click="() => handleEdit(scope)" type="text" size="small">编辑</el-button>
                    </Permission>
                    <Permission permission="detail">
                        <Popover :text="`您确定要删除 '${scope.row.name}' 吗？`" @ok="() => handleDelete(scope)">
                            <el-button type="text" size="small">删除</el-button>
                        </Popover>
                    </Permission>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :show="total > 0">
            <el-pagination
                    @size-change="handlePageSizeChange"
                    @current-change="handleCurrentPageChange"
                    :current-page="query.currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="query.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </Pagination>
    </div>
</template>
<style lang="less" scoped>
</style>
<script lang="babel">
    import {mapState, mapActions} from 'vuex';
    import Permission from '../../components/permission.vue';
    import Popover from '../../components/popover.vue';
    import Pagination from '../../components/pagination.vue';
    import ToolBar from '../../components/tool-bar.vue';

    export default{
        components: {
            Permission,
            Popover,
            Pagination,
            ToolBar,
        },
        data() {
            return {
                query: {
                    userName: '',
                    group: '',
                    currentPage: 1,
                    pageSize: 20,
                },
            }
        },
        computed: mapState({
            users: state => state.user.users.results,
            total: state => state.user.users.total,
            padding: state => state.user.padding,
        }),
        methods: {
            ...mapActions([
                'getUsersByPage'
            ]),
            renderGroup(row, column) {
                if (row.group === 'jiagou') {
                    return '架构部';
                }
                if (row.group === 'yanfa') {
                    return '研发部';
                }
                return '未知部门';
            },
            handleAdd() {
                alert('添加');
            },
            handleDetail(data) {
                alert(`查看详情：${data.row.name}`);
            },
            handleEdit(data) {
                alert(`编辑：${data.row.name}`);
            },
            handleDelete(data) {
                alert(`执行删除：${data.row.name}`);
            },
            handleSearch() {
                this.query.currentPage = 1;
                this.search();
            },
            handleCurrentPageChange(currentPage) {
                this.query.currentPage = currentPage;
                this.search();
            },
            handlePageSizeChange(pageSize) {
                this.query.pageSize = pageSize;
                this.search();
            },
            search(params) {
                this.getUsersByPage({
                    ...this.query,
                    ...params
                });
            },
        }
    }
</script>
