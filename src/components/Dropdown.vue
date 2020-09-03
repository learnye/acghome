<template>
    <div style="height:30px">
    <div class="select">
        <div class="provice" @click="showProvince">
            {{province}}
        </div>
        <div class="city" @click="showCity">
            {{c}}
        </div>
        <div class="county" @click="showCounty">
            {{cy}}
        </div>
        <div class="show" v-show="Ashow">
            <ul v-show="clicktype==1">
                <li v-for="(val, index) in locaty" :key="index" :value="val.name" @click="changeProvince(val.name)">{{val.name}}</li>
            </ul>
            <ul v-show="clicktype==2">
                <li v-for="(name, index) in city" :key="index" :value="name.name" @click="changeCity(name.name)">{{name.name}}</li>
            </ul>
            <ul v-show="clicktype==3">
                <li v-for="(area, index) in county" :key="index" :value="area"  @click="changeCounty(area)">{{area}}</li>
            </ul>
        </div>
    </div>
    </div> 
</template>
<style scoped>
.select{
    display: inline-block;
    height: 30px;
    position: relative;
}
.select>.provice,.select>.city,.select>.county{
    display: inline-block;
    width: 120px;
    box-sizing: border-box;
    height: 30px;
    padding-left: 2px;
    border: solid 1px #e0e0e0;
    background-color: #fff;
    background: url("../assets/sorraw.png") no-repeat scroll 108% 45% #fff;
    user-select: none;
}
.select>.show{
    width: 360px;
    max-height: 210px;
    position: absolute;
    border: 1px #b2b2b2 solid;
    overflow: hidden;
    overflow-y: scroll;
    background-color: #fff;
    box-shadow: 0 3px 8px 0 rgba(0,0,0,.15);
    z-index: 99;
}
.select>.show>ul>li{
    font-size: 20px;
    padding: 0 20px;
    transition: all .2s;
}
.select>.show>ul>li:hover{
    background: #eee;
}
</style>

<script>
export default {
    name: 'Dropdown',
    props : ["locaty"], // 父组件中接受的地区数据
    data() {
        return {
            Ashow:false,
            clicktype:1,
            province : '选择省/直辖市' ,
            // 选择市区
            c : '选择市/区',
            city : [{ name : '选择市/区' }],
            // 县市
            cy : '选择县/市',
            county : ['选择县/市'],
        }
    },
    methods:{
        // 点击显示地址栏
        showProvince(){
            if(this.Ashow==true){
                this.Ashow=false;
            }else{
                this.Ashow=true;
            }
            this.clicktype=1;
        },
        showCity(){
            if(this.Ashow==true){
                this.Ashow=false;
            }else{
                this.Ashow=true;
            }
            this.clicktype=2;
        },
        showCounty(){
             if(this.Ashow==true){
                this.Ashow=false;
            }else{
                this.Ashow=true;
            }
            this.clicktype=3;
        },
        // 当省/直辖市选择出现变化的时候，要修改city和county
        changeProvince(data){
        	// 恢复默认状态
            this.c = '选择市/区'; 
            this.cy = '选择县/市';
            this.province= data;
            this.Ashow=false;
            // 删除当前的city和county数组第一个数据之后的所有数据，否则会将上一次选择的内容和本次选择的内容拼接到一起！
            this.city.splice(1) 
            this.county.splice(1);
            // 查找地区数据中是否包含用户当前选择的省直辖市对应的市区数据，并将数据保存到city数组中。
            for(var item in this.locaty){
                if(this.locaty[item].name == this.province){
                    this.city = this.city.concat(this.locaty[item].city);
                }
            }
        },
        // 修改县/市
        changeCity(data){
        	// 同上：恢复默认状态
            this.cy = '选择县/市';
            this.c= data;
            this.Ashow=false;
            this.county.splice(1);
            // 查找用户当前选择的
            this.locaty.forEach(ele => {
            // 先确定当前的省份
                if(ele.name == this.province){
                    ele.city.forEach((e)=>{
                    // 这里确定市区
                        if(e.name == this.c){
                        // 将市区对应的县市地区数据拼接到county中；
                            this.county = this.county.concat(e.area);
                        }
                    })
                }
            });
        },
        changeCounty(data){
            this.cy=data;
            this.Ashow=false;
        }
    },
    mounted() {
        document.addEventListener('click',e=>{
        if(!this.$el.contains(e.target)){
            this.Ashow=false; //这句话的意思是点击其他区域关闭（也可以根据自己需求写触发事件）
            }
        })
    },
}
</script>