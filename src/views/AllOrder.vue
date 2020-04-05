<template>
    <div>
    <el-table
            :data="tableData"
            border
            style="width: 47%">
        <el-table-column
                prop="brand"
                label="商品名"
                width="150">
        </el-table-column>
        <el-table-column
                prop="price"
                label="单价"
                width="150">
        </el-table-column>
        <el-table-column
                prop="num"
                label="数量"
                width="150">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="150">
            <template slot-scope="scope">
                <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
                <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
<!--      分页  -->
    <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total"
            @current-change="page">
    </el-pagination>
    </div>
</template>
<script>
    export default {
        methods: {
            del(row){
                const _this=this;
                axios.delete('http://localhost:8181/message/deleteById/'+row.id).then(function (res) {
                        _this.$alert('商品删除成功！', '消息', {
                            confirmButtonText: '确定',
                            callback: action => {
                            //   动态刷新
                                window.location.reload()
                            }
                        });
                })
            },
            edit(row) {
                this.$router.push({
                    path:'/update',
                    query:{
                        id:row.id
                    }
                })
                // row.id
            },page(currentPage){
                const _this=this;
                axios.get('http://localhost:8181/message/findAll/'+(currentPage-1)+'/6').then(function (res) {
                    _this.tableData=res.data.content;
                    _this.pageSize=res.data.size;
                    _this.total=res.data.totalElements;
                })
            }
        },

        data() {
            return {
                pageSize:'1',
                total:'11',
                tableData: [{
                    id:1,
                    brand: '华为',
                    price: 4900,
                    num: 3
                }, {
                    id:2,
                    brand: '小米',
                    price: 4500,
                    num: 3
                }, {
                    id:3,
                    brand: 'OPPO',
                    price: 3600,
                    num: 3
                }, {
                    id:4,
                    brand: '苹果',
                    price: 5100,
                    num: 3
                }]
            }
        },
        created() {
            const _this=this;
            axios.get('http://localhost:8181/message/findAll/0/6').then(function (res) {
                _this.tableData=res.data.content;
                _this.pageSize=res.data.size;
                _this.total=res.data.totalElements;
            })
        }
    }
</script>