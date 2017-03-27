<template>
    <div>
        <QueryBar>
            <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="用户名">
                    <el-input v-model="query.userName" placeholder="用户名" size="small"></el-input>
                </el-form-item>
                <el-form-item label="所属部门">
                    <el-select v-model="query.group" placeholder="所属部门" size="small">
                        <el-option label="架构部" value="jiagou"></el-option>
                        <el-option label="研发部" value="yanfa"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
                </el-form-item>
            </el-form>
        </QueryBar>
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
                    prop="group"
                    label="所属部门"
                    width="180">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ '网' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="less" scoped>
</style>
<script lang="babel">
    import {mapState, mapActions} from 'vuex';
    export default{
        data() {
            return {
                query: {
                    userName: '',
                    group: '',
                    currentPage: 1,
                    pageSize: 20,
                }
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
            onSubmit() {
                this.getUsersByPage(this.query);
                console.log('submit!', this.query);
            }
        }
    }
</script>
