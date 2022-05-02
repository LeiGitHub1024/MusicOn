<template>
<div>
  <a-space>
   <a-list :virtualListProps="{
      height: 450,
    }"
    :data="musicList">
      <template #header>
        <span class='left'> 歌曲名称 </span>
        <span class="right"> 数量</span>
      </template>
      <template  #item="{ item }">
          <a-list-item style="padding:0" :key="item.key" @click="chooseMusic(item.key, item.name)">
            <div style="display:flex;padding:13px 20px" :style="{'background-color':bk[item.key]}">
                <span class='left'> {{item.name}} </span>
                <span class="right"> {{item.vote}} </span>
            </div>
          </a-list-item>
      </template>
    
    </a-list>
    
  </a-space>
  <operator>
    <div style="margin:1rem"  ><a-button :loading="loading" type="primary" @click="nextVote" >开始下一轮投票</a-button></div>
    <div v-show="loading"> 为防止误触，每五秒只能点击一次 </div>
  </operator>

  <footer class="footer">created by 阿廖沙 小胖 </footer>
</div>
  
</template>

<script>
import axios from "axios";

export default {
  name:"VotePage",
  components: {
  },

  created(){
    axios.get( 'api/music/getTop').then((res) => {
      // 接口调用成功回调
      console.log('success',res,res?.data);
      this.voted = res?.data?.code? true:false
      res?.data?.data?.forEach((item,index)=>{
        this.musicList.push({
          key:index,
          name:item.value,
          vote:item.score
        })
      })
      }).catch((error) => {
        // 接口调用失败毁掉
        console.log('err',error);
      });    
  },
  data() {
    return {
      selected:'0', //选中id
      inputValue:'', //用户输入的歌曲名称
      voted:false, //该ip是否已经投票
      loading:false,
      musicList:[ //音乐列表
      ],
      bk:[]//选中背景颜色
    }
  },
  methods: {
    chooseMusic(idx){ //选中音乐修改样式
      if(!this.voted){
        this.bk = new Array(10).fill('')
        this.bk[idx]='#FF8C32'
        this.selected = idx
      }
    },
    inputFocus(){//点击输入框清空样式
      if(!this.voted){
        this.bk = new Array(10).fill('')
        this.selected = '0'
      }
    },
    submit(){//提交数据
      if(this.selected==0&&this.inputValue==''){
        console.log(1);
        this.$message.info('请选择一个歌曲，或手动输入歌名后投票')
      }else{
        this.loading=true
        setTimeout(() => {
          this.loading=false
          console.log(this.selected, this.inputValue);
        //TODO 请求接口，成功之后跳转到刷新界面
        this.voted=true
        }, 1000);
      }
  
    },
    nextVote(){
      axios.post( 'api/music/reset').then((res) => {
      console.log('success',res,res?.data);
      }).catch((error) => {
        console.log('err',error);
      });    
      this.loading=true;
      setTimeout(() => {
        this.loading=false
      }, 5000);
    },
    // refresh(){//刷新按钮，暂时停用。
    //   console.log("刷新数据")
    // },
    testButton(){
      axios.post( 'api/https://photo.sina.cn/aj/index',{page:1,cate:'recommend'}).then((res) => {
      // 接口调用成功回调
      console.log('success',res);
      
    }).catch((error) => {
      // 接口调用失败毁掉
      console.log('err',error);
    });
    }
  },
}
</script>
<style >
  .left{
    width: 60vw;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap; 
    display: inline-block;
  }
  .right{
    width: 20vw;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap; 
    display: inline-block;
  }
  .button{
    margin-top:1rem ;
  }
  .footer{
    position: fixed;
    bottom: 0;
    margin-bottom: 1rem;
    left:50%;
    transform: translate(-50%,0);
  }

</style>