<template>
<div>
  <a-space>
    <a-list >
      <template #header>
        <span class='left'>    歌曲名称  </span>
        <span class="right">   数量</span>
      </template>
      <a-list-item v-bind:style="{'background-color':bk[music.index],}" v-for="music in musicList" :key="music.index" @click="chooseMusic(music.index)">
        <content style="display:flex">
        <span class='left'> {{music.name}} </span>
        <span class="right"> {{music.vote}} </span>
        </content>
      </a-list-item>
    </a-list>
    
  </a-space>
  <a-input  :disabled="voted" v-model="inputValue" @click="inputFocus" :style="{width:'60vw', marginTop:'1rem'}" placeholder="上面没有想点的歌？在此输入歌名" :size="mini" allow-clear />
  <operator>
    <div v-if="!voted">
      <div class='button'> <a-button  @click="submit" type="primary" size="large" :loading="loading">投票</a-button> </div>
    </div>
    <div v-else>
      <div style="margin:1rem">您已成功投票</div>
      <!-- <div class='button'> <a-button  @click="refresh" type="primary">刷新</a-button> </div> -->
    </div>
  </operator>

  <!-- <button @click="testButton">Test Button</button> -->
  <footer class="footer">created by 阿廖沙 小胖 </footer>
</div>
  
</template>

<script>
import axios from "axios";

export default {
  name:"VotePage",
  components: {
  },
  setup(props) {
    console.log(props,'调用get接口请求数据');
    //TODO 调用getData接口，赋值musicList、voteFlag
  
  },
  data() {
    return {
      selected:'0', //选中id
      inputValue:'', //用户输入的歌曲名称
      voted:false, //该ip是否已经投票
      loading:false,
      musicList:[ //音乐列表
        {index:'1',name:"双节棍棍棍棍棍棍棍棍棍棍棍棍棍棍棍棍棍棍", vote:2333333333333333},
        {index:'2',name:"asdfsdf", vote:2333},
        {index:'3',name:"双节23棍", vote:223},
        {index:'4',name:"asdfsad", vote:213},
        {index:'5',name:"adsfsdafa", vote:23},
        {index:'6',name:"双节23棍", vote:23},
        {index:'7',name:"双节23棍", vote:23},
        {index:'8',name:"双节23棍", vote:23},
        {index:'9',name:"双节23棍", vote:11},
        {index:'10',name:"双节23棍", vote:3},

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
    width: 70vw;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap; 
    display: inline-block;
  }
  .right{
    width: 10vw;
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