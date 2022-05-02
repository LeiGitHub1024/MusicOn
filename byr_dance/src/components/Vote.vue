<template>
<div>
  <div style="margin:1rem">第一步：选择歌曲或者在下方输入<div style="margin-top:0.5rem"></div>  第二步：点击投票</div>
  <a-space>
    <!-- <a-list >
      <template #header>
        <span class='left'>    歌曲名称  </span>
        <span class="right">   数量</span>
      </template>
      <a-list-item  v-bind:style="{'background-color':bk[music.key],}" v-for="music in musicList" :key="music.key" @click="chooseMusic(music.key, music.name)">
        <content style="display:flex">
        <span class='left'> {{music.name}} </span>
        <span class="right"> {{music.vote}} </span>
        </content>
      </a-list-item>
    </a-list> -->

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
  <a-input  :disabled="voted" v-model="inputValue" @click="inputFocus" :style="{width:'60vw', marginTop:'1rem'}" placeholder="上面没有想点的歌？在此输入歌名" :size="mini" allow-clear />
  <operator>
    <div v-if="!voted">
      <div class='button'> <a-button  @click="submit" type="primary" size="large" :loading="loading">投票</a-button> </div>
    </div>
    <div v-else>
      <div style="margin:1rem">您已成功投票，每分钟只能投一次</div>
      <!-- <div class='button'> <a-button  @click="refresh" type="primary">刷新</a-button> </div> -->
    </div>
  </operator>
  <!-- <button @click="testButton">Test Button</button> -->
  <footer class="footer">版权所有 © 北京邮电大学 小胖 & 阿廖沙 <br/> 计算机学院（国家示范性软件学院）</footer>
</div>
  
</template>

<script>
import axios from "axios";
// import { ref } from 'vue'
import { Modal } from '@arco-design/web-vue';

export default {
  name:"VotePage",
  components: {
  },
  created(){
    this.getSourceData()
  },
  data() {
    return {
      selected:'0', //选中id
      selectedName:"",//选中名称
      inputValue:'', //用户输入的歌曲名称
      voted:false, //该ip是否已经投票
      loading:false,
      musicList:[],
      bk:[]//选中背景颜色
    }
  },
  methods: {
    getSourceData(){
      this.selected=""
      this.selectedName=""
      this.musicList=[]
      this.bk=[]
      axios.get( 'api/music/getTop').then((res) => {
        console.log('success',res,res?.data);
        this.voted = res?.data?.code? true:false
        res?.data?.data?.forEach((item,index)=>{
          this.musicList.push({
            key:index+1,
            name:item.value,
            vote:item.score
          })
        })
        }).catch((error) => {console.log('err',error);});
          
    },
    chooseMusic(idx,name){ //选中音乐修改样式
      if(!this.voted){
        
        this.bk = new Array(41).fill('')
        this.bk[idx]='#FF8C32'
        this.selected = idx
        this.selectedName = name
        console.log(idx,name,this.bk);

      }
    },
    inputFocus(){//点击输入框清空样式
      if(!this.voted){
        this.bk = new Array(10).fill('')
        this.selected = '0'
        this.selectedName = ''
      }
    },
    submit(){//提交数据
      if(this.selected==0&&this.inputValue==''){
        this.$message.info('请选择一个歌曲，或手动输入歌名后投票')
      }else{
        this.loading=true
        axios.post( 'api/music/addCount',{name:this.inputValue||this.selectedName}).then((res) => {
          console.log('success',res);
          this.loading=false
          this.voted=true
          //TODO 刷新一下投票值
          this.getSourceData()
          let modalMessage = res?.data?.data||'每分钟只能投一次哟'
          Modal.success({
            title: '投票成功',
            content:  (<div style="text-align:center">{modalMessage}</div>),
            width:'70vw',
            "modal-class":"modal",
            "align-center":true,
          });
          setTimeout(() => {
            this.getSourceData()
          }, 60000);
          
        }).catch((error) => {
          console.log('err',error);
        });
      
      }
  
    },
    // refresh(){//刷新按钮，暂时停用。
    //   console.log("刷新数据")
    // },
    testButton(){
      axios.post( 'api/music/addCount',{name:'张三99994'}).then((res) => {
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
    position: relative;
    bottom: 0;
    margin-top: 2rem;
    margin-bottom: 2rem;
    left:50%;
    transform: translate(-50%,0);
  }
  .modal{
    text-align: center;
  }

</style>