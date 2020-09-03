<template>
    <div class="content-box">
        <div class="subject-wrap">
            <div class="producrt-add">
                <div class="content-setting">
                    <div class="common-text">
                        基本信息
                    </div>
                    <div class="input-item is-require">
                        <label for="product_name" class="label">商品名称：</label>
                        <div class="item-content">
                            <input v-model="pname" type="text" id="product_name" autocomplete="off" class="input-inner">
                        </div>
                    </div>
                    <div class="input-item">
                        <label for="product_id" class="label">商品编码：</label>
                        <div class="item-content">
                            <input v-model="pid" type="text" id="product_id" autocomplete="off" class="input-inner" disabled>
                        </div>
                    </div>
                    <div class="input-item">
                        <label for="product_type" class="label">商品类型：</label>
                        <div class="item-content">
                            <input v-model="ptype" type="text" id="product_type" autocomplete="off" class="input-inner">
                        </div>
                    </div>
                    <div class="input-item is-require">
                        <label for="product_manu" class="label">生产厂家：</label>
                        <div class="item-content">
                            <input v-model="pmanu" type="text" id="product_manu" autocomplete="off" class="input-inner">
                        </div>
                    </div>
                     <div class="input-item is-require">
                        <label for="product_image" class="label">商品图片：</label>
                        <div class="file-upload-design" ref="pic" :style="`background-image:url(${avatar});`">
                            <span class="delete-btn" v-show="isShow==false" @click="deleteImage"><i class="iconfont icon-quxiao"></i></span>
                            <div class="file-upload-design-icon" name="desgin" @click="dialog_show" v-show="isShow==true"></div>
                            <input type="file" name="avatar" id="fileToUpload"  style="display:none;" accept="image/*" @change="changeImage($event)">
                        </div>
                    </div>
                     <div class="input-item">
                        <label for="product_desc" class="label">商品简介：</label>
                        <div class="item-content">
                            <input v-model="pdesc" type="text" id="product_desc" autocomplete="off" class="input-inner">
                        </div>
                    </div>
                    <div class="common-text mt50">
                        规格/库存
                    </div>
                    <div class="input-item is-require">
                        <label for="product_spec" class="label">商品规格：</label>
                        <div class="item-content">
                            <input v-model="spec" type="text" id="product_spec" autocomplete="off" class="input-inner">
                        </div>
                    </div>
                    <div class="input-item is-require">
                        <label for="product_sprice" class="label">商品价格：</label>
                        <div class="item-content">
                            <input v-model="sprice" type="text" id="product_sprice" autocomplete="off" class="input-inner">
                        </div>
                    </div>
                    <div class="input-item">
                        <label for="product_disc" class="label">商品折扣：</label>
                        <div class="item-content">
                            <input v-model="pdisc" type="text" id="product_disc" autocomplete="off" class="input-inner">
                        </div>
                    </div>
                    <div class="input-item is-require">
                        <label for="product_total" class="label">库存数量：</label>
                        <div class="item-content">
                            <input v-model="ptotal" type="text" id="product_total" autocomplete="off" class="input-inner">
                        </div>
                    </div>
                    <div class="input-item">
                        <label for="product_intr" class="label">商品详情：</label>
                        <div class="item-content">
                            <input v-model="pintr" type="text" id="product_intr" autocomplete="off" class="input-inner">
                        </div>
                    </div>
                </div>
                <div class="common-button-wrapper">
                    <button class="com-btn" @click="submitProduct">发布</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['pid'],
    data() {
        return {
            pname:"",
            pmanu:"",
            avatar:"",
            image:"",
            oldimage1:"",
            oldimage2:"",
            files:"",
            pdesc:"",
            spec:"",
            sprice:"",
            pdisc:"",
            ptotal:"",
            pintr:"",
            ptype:"",
            isShow:true,
        }
    },
    methods: {
        // 点击图片加是触发上传图片点击
        dialog_show(e) {
            document.getElementById('fileToUpload').click();
        },
        // 将从文件获取的图片转为base64格式在网页上预览，
        changeImage(e){
            var imgURL="";
            var file=null;
            // console.log(e.target.files);
            // 将文件名赋予image
            this.image=e.target.files[0].name;
            // 将files保存所有信息
            this.files=e.target.files;
            // 图片格式转换
            if(e.target.files && e.target.files[0]){
                var reader=new FileReader();
                reader.onload=(e)=>{
                    imgURL=e.target.result;
                    this.avatar=imgURL;
                    // console.log(this.avatar)
                };
                reader.readAsDataURL(e.target.files[0]);
                this.isShow=false;
                return imgURL;
            }
        },
        // 删除显示在网页上的图片
        deleteImage(){
            this.avatar='';
            this.$refs.pic.style=``;
            this.image="";
            this.isShow=true;
        },
        // 将图片存入指定文件夹中
        uploadAvatar(files){
            //通过FormData生成服务端需要的数据格式
            let data = new FormData();
            data.append('file',files);
            // 进行异步请求
            this.axios({
                method:'POST',
                url:'/custom',
                data,
                headers:{"Content-Type":"multipart/form-data"}
            }).then(res=>{
                console.log(res.data)
            })
        },
        // 数据提交
        submitProduct(){
            // console.log(this.files[0]);
            if(this.image!=this.oldimage1){
                this.uploadAvatar(this.files[0]);
            }
            var data=`pname=${this.pname}&pid=${this.pid}&ptype=${this.ptype}&pmanu=${this.pmanu}&pimage=${this.image}&pdesc=${this.pdesc}&pdisc=${this.pdesc}&ptotal=${this.ptotal}&&pintr=${this.pintr}`;
            var data1=`spid=${this.pid}&spec=${this.spec}&sprice=${this.sprice}`;
            this.axios.put('/update_product',data).then(res=>{
                if(res.data.code==1){
                    alert('商品修改成功');
                    this.$router.push('/Manage');
                }else{
                    console.log('error');
                }
            })
            this.axios.put('/update_spec',data1).then(res=>{
                if(res.data.code==1){
                console.log('success');
            }else{
                console.log('error');
            }
            })
        },
        // 获取商品信息
        getProduct(){ 
            this.axios.get('/show_product',{params:{pid:this.pid}}).then(res=>{
                this.pname=res.data.result.pname;
                this.pmanu=res.data.result.pmanu;
                this.ptype=res.data.result.ptype;
                this.sprice=res.data.result.sprice;
                this.pdesc=res.data.result.pdesc;
                this.pdisc=res.data.result.pdisc;
                console.log(res.data)
                console.log(res.data.result.image.split(",")[0]);
                this.oldimage1=res.data.result.image;
                this.image=res.data.result.image;
                this.oldimage2=require('../assets/image/products/'+res.data.result.image.split(",")[0]);
                this.ptotal=res.data.result.ptotal;
                this.pintr=res.data.result.pintr;
                this.spec=res.data.result.spec;
                this.spec=res.data.result.spec;
                this.$refs.pic.style=`background-image:url(${this.oldimage2});`;
                this.isShow=false;
            })
        },
    },
    mounted() {
        // console.log(this.$refs.pic);
        this.getProduct();
    },
}
</script>
<style scoped>
.content-box {
    max-height: calc(100vh - 48px);
    min-height: calc(100vh - 80px);
    overflow: auto;
    padding: 20px 16px;
    box-sizing: border-box;
    font-size: 12px;
}
.subject-wrap {
    padding: 16px;
    min-height: calc(100vh - 90px);
    overflow-x: auto;
    background: #FFFFFF;
}
.producrt-add{
    margin-bottom: 50px;
}
.content-setting{
    padding-left: 16px;
}
.content-setting .common-text{
    position: relative;
    height: 40px;
    padding-left: 20px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 12px;
}
.common-text:before {
    background: #3a8ee6;
    position: absolute;
    content: "";
    width: 4px;
    height: 14px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
}
/* 商品信息样式 */
.content-setting .input-item{
    display: flex;
    margin-bottom: 18px;
}
.input-item .label{
    display: inline-block;
    text-align: right;
    vertical-align: middle;
    font-size: 12px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 180px;
    line-height: 32px;
}
.is-require>label::before{
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
}
/* 信息输入框样式 */
.input-item .item-content{
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    max-width: 460px;
}
.item-content .input-inner{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    height: 32px;
    line-height: 32px;
}
/* 添加图片样式 */
.file-upload-design{
        margin-top: 10px;
        width: 110px;
        height: 110px;
        position: relative;
        overflow: hidden;
        background-color: #fff ;
        border: 1px dashed #ddd;
        border-radius: 5px;
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100%;
    }
.file-upload-design-icon{
        width: 30px;
        height: 30px;
        background-image: url("../assets/manage/add.png");
        background-size: 100% 100%;
        margin: 38% 38%;
}
.file-upload-design-icon:hover{
        cursor: pointer;
}
/* 删除按钮 */
.delete-btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 16px;
    height: 16px;
    line-height: 16px;
    font-size: 16px;
    color: #fff;
    
}
.delete-btn i{
    display: none;
}
.delete-btn:hover i{
    background: red;
    display: block;
}
.mt50{
    margin-top: 50px;
}
/* 固定提交信息框 */
.common-button-wrapper {
    -webkit-transition: width .3s;
    transition: width .3s;
    position: absolute;
    background: #fff;
    left: 0;
    bottom: 17px;
    right: 0;
    border-top: 1px solid #eee;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 50px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    z-index: 999;
}
.common-button-wrapper .com-btn{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 5px 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
}
</style>