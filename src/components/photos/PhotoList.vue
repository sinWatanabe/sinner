<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
            {{item.title}}
          </a>
        </div>
      </div>
    </div>

  <ul class="photo-list">
    <li v-for="item in list" :key="item.id">
      <img v-lazy="item.img_url">
      <div class="info">
        <h1 class="info-title">{{ item.title }}</h1>
        <div class="info-body">{{ item.zhaiyao }}</div>
      </div>
    </li>
  </ul>

  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
//Vue.prototype.mui=mui;



export default{
    data(){
        return {
          cates:[],
          list:[]
        };
    },
    created(){
      this.getAllCategory();
      this.getPhotoListByCateId(0);
    },
    mounted(){
      mui('.mui-scroll-wrapper').scroll({
        deceleration:0.0005 //flick 减速系数，系数越大，滚动速度越慢，默认值 0.0006
      });
    },
    methods:{
      getAllCategory(){
        var vm=this;
            this.$http.get('api/getimgcategory').then(result =>{
                if(result.body.status === 0){
                    result.body.message.unshift({title: "全部",id :0});
                    this.cates=result.body.message;
                }
            }).catch(function(error){
                vm.errorMsg=error;
            });
        },
        getPhotoListByCateId(cateId){
          var vm=this;
          this.$http.get("api/getimages/" + cateId).then(result =>{
                if(result.body.status === 0){
                    this.list = result.body.message;
                }
            }).catch(function(error){
                vm.errorMsg=error;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list{
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li{
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 6px #999;
    position: relative;
    img{
      width: 100%;
      vertical-align: middle;
    }
    img[lazy=loading] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info{
      position: absolute;
      bottom: 0px;
      color: white;
      text-align: left;
      background-color:rgbc(0,0,0,0.4);
      max-height: 84px;
      .info-title{
        font-size: 14px;
      }
      .info-body{
        font-size: 13px;
      }
    }
  }
}
</style>