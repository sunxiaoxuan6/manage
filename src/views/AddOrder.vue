<template>
<!--    model:绑定数据,rules:绑定校验规则(双向绑定）-->
    <el-form style="width: 40%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="brand">
            <el-input v-model="ruleForm.brand"></el-input>
        </el-form-item>

        <el-form-item label="商品价格" prop="price">
            <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>

        <el-form-item label="商品数量" prop="num">
            <el-input v-model="ruleForm.num"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                ruleForm: {
                    brand:'',
                    price:'',
                    num:''
                },
                rules: {
                    brand: [
                        //required:true说明是必填项,message提示信息
                        { required: true, message: '请输入商品名称', trigger: 'brand' }
                    ],
                    price: [
                        { required: true, message: '请输入商品价格', trigger: 'price' }
                    ],
                    num: [
                        { required: true, message: '请输入商品数量', trigger: 'num'  }
                    ]
                }
            };
        },
        methods: {
            //提交
            submitForm(formName) {
                //_this表示当前vue对象
                const _this=this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('http://localhost:8181/message/save',this.ruleForm).then(function (res) {
                            if(res.data=='success') {
                                _this.$alert(_this.ruleForm.brand + '商品添加成功！', '消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push('/allOrder');
                                    }
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            //重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>