
<template>
  <div class="dialog-report">
    <el-dialog
      title="新增活动"
      top="8vh"
      :visible.sync="show"
      width="600px"
      :close-on-click-modal="false"
    >
      <div class="detail-dialog-wrap">
        <vue-scroll>
          <el-form
            ref="form"
            :model="useData"
            label-width="140px"
          >
            <el-form-item label="活动名称" prop="id">
        <el-input
          v-model="useData.title"
          name="title"
          tabindex="1"
          style="width:57%;"
          auto-complete="off"
        />           
         </el-form-item>

                     <el-form-item label="活动描述" prop="id">
        <textarea
          v-model="useData.content"
          name="content"
          tabindex="1"
          :rows="5"
          style="width:57%;"
          auto-complete="off"
        />           
         </el-form-item>

            <el-form-item label="商户地址" prop="reportUserName">
        <el-input
          v-model="useData.address"
          name="address"
          tabindex="1"
          style="width:57%;"
          auto-complete="off"
        />                     </el-form-item>



            <el-form-item label="活动时间" prop="accuseId">
        自：        
    <el-date-picker
            v-model="useData.startTime"
            type="datetime"
                      style="width:50%;"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
            placeholder="选择日期时间">
    </el-date-picker>    
                  </el-form-item>
            <el-form-item label="" prop="accuseType">

        
                至：    <el-date-picker
            v-model="useData.endTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
                                  style="width:50%;"
            value-format="yyyy-MM-dd HH:mm"
            placeholder="选择日期时间">
    </el-date-picker>                
          </el-form-item>



            <el-form-item label="活动图片" prop="reportUserId">

　　　　　　　<el-button
              class="fileParent"
              type="file"
              icon="el-icon-plus"
              style="background:#808080"
              @change="uploadFile"
            >
              <img :src="tempImg" v-if="tempImg" alt />
              <img :src="useData.pics[0].picUrl" v-if="(useData.id)&&!tempImg" alt />
              <input class="file" type="file" @change="uploadFile" multiple="multiple" />

            </el-button>
            </el-form-item>

            <el-form-item label="状态" prop="accuseName">                   
        <el-radio-group
        v-model="chartRadio"
        class="radio-group"
        size="mini"
        @change="handleRadioChange"
      >
        <el-radio-button label="启用"></el-radio-button>
        <el-radio-button label="禁用"></el-radio-button>
      </el-radio-group>
             </el-form-item>

          </el-form>
        <el-button type="primary" style="width:10%;margin-left:50%;margin-top:20px;" v-if="this.useData.id"  size="small" @click="handleAddMember()">更新</el-button>
        <el-button type="primary" style="width:10%;margin-left:50%;margin-top:20px;" v-else size="small" @click="handleAddMember()">新增</el-button>

        </vue-scroll>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript" src="../lib/vue.js"></script>
<script type="text/javascript" src="../lib/elementui/index.js"></script>
<script type="text/javascript">
import { get_upload_token,add_bar,update_bar,get_bar,add_bar_activity,update_bar_activity} from '@/api/shopMgr'
import { allReportType } from '@/utils/const'
import dateRangePicker from '../components/dateRangePicker'
import ReportStatus from '@/components/ReportStatus'
import Userid from '@/components/Userid'
import Activityid from '@/components/Activityid'
import { visible } from '@/mixins/commonSet'
import pageConfig from './pageConfig'
export default {
  components: { dateRangePicker,ReportStatus, Userid, Activityid },
  mixins: [visible,pageConfig],
  props: {
    useData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      timevalue1: "",
            timevalue2: "",
      tempImg:"",
      chartRadio:"启用",
      shopState:true,
      allReportType
    }
  },
  methods: {
    async getData() {

                  console.log(this.useData)

    },
    async handleAddMember()
    {



      const tdata = await get_bar({barId:this.useData.userId})
      console.log(tdata.data)

      let title =  this.useData.title;
            let content =  this.useData.content;
      let userId =  this.useData.userId;
      let startTime =  this.useData.startTime;
            let endTime =  this.useData.endTime;
      let lat =  tdata.data.lat;
      let lng =  tdata.data.lng;
            let address =  this.useData.address;
      let status ="created";
      status = this.chartRadio === '启用' ? "created": "deleted";
      //let pics  = [this.tempImg];
      
        let pics = [
          {
            picUrl: this.tempImg
          }
        ];
      console.log(tdata)
      if(this.useData.id)
      {
        if(this.tempImg)
        {
          this.useData.pics = [
          {
            picUrl: this.tempImg
          }
        ];
        }
         let data = ({ title: title, content: content, userId: userId, startTime: startTime, endTime: endTime, lat: lat, lng: lng, address: address,status:status,pics:this.useData.pics,id:this.useData.id});
       console.log(data)
      update_bar_activity(data);
              this.handleDialogClose()
        this.$emit('emitFunc', { function: 'get_bar_activity', arguments: [] })
      }
      else
      {
         let data = ({ title: title, content: content, userId: userId, startTime: startTime, endTime: endTime, lat: lat, lng: lng, address: address,status:status,pics:pics});
      console.log(data)
      add_bar_activity(data);
              this.handleDialogClose()
        this.$emit('emitFunc', { function: 'get_bar_activity', arguments: [] })
      }



    },
    async postimg(ndata)
    {
      const data = await get_upload_token({})
      let region = "oss-cn-beijing";
      let accessKeyId = data.data.accessKeyId;
      let accessKeySecret = data.data.accessKeySecret;
      let bucket = data.data.bucketName;
      let OSS = require('ali-oss')
      console.log(accessKeyId)

      let client = new OSS({
        region: region,
        accessKeyId:accessKeyId,
        accessKeySecret:accessKeySecret,
        stsToken: data.data.securityToken,
        bucket:bucket,
      });
      console.log(client)

      let date = Date.parse(new Date());
      let fileName = `${date}`;
      fileName = Base64.encode(fileName)  
      fileName = "shop/"+fileName;
      console.log(fileName)
      try {
          //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
          let result = await client.put(fileName, ndata);
          console.log(result);
          this.tempImg = result.url;
                    console.log(tempImg);
        } catch (e) {
          console.log(e);
    }

    },
    async uploadFile(event) {
      let self = this;



      let file = event.target.files[0]; //获取input的图片file值
            let point = file.name.lastIndexOf('.');
      let suffix = file.name.substr(point);
     let fileName = file.name.substr(0, point);
        let date = Date.parse(new Date());
      fileName = `${fileName}_${date}${suffix}`;

			// if(file.size<=1* 1024* 1024){
			// //判断图片是否大于1M,是就直接上传
      // ndata=file;
      // self.postimg(ndata);
			// }else{
			// 	//反之压缩图片
			//    let reader = new FileReader();
			// 	// 将图片2将转成 base64 格式
			// 	reader.readAsDataURL(file);
			// 	console.log(reader)
			// 	// 读取成功后的回调
			// 	reader.onloadend = function () {
			// 	let result = this.result;
			// 	let img = new Image();
			// 	img.src = result;
      //          img.onload = function () {
      //   ndata=  self.compress(img,0.6);
      //               console.log('*******ndata*******')
      //       console.log(ndata)
			//         self.postimg(ndata);

			// 	// //BASE64转图片
			// 	// var arr = ndata.split(','), mime = arr[0].match(/:(.*?);/)[1],
			// 	// bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
			// 	// while(n--){
			// 	// u8arr[n] = bstr.charCodeAt(n);
			// 	// }
      //   //  ndata=new File([u8arr],f.file.name, {type:mime})
      //          }
      //   }
      // }
			        self.postimg(file);


  },
  compress(img, size) {
            let canvas = document.createElement('canvas')
            let ctx = canvas.getContext('2d')
            let initSize = img.src.length
            let width = img.width
            let height = img.height
            canvas.width = width
            canvas.height = height
            // 铺底色
            ctx.fillStyle = '#fff'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0, width, height)
            //进行最小压缩
            let ndata = canvas.toDataURL('image/jpeg', size)
            console.log('*******压缩后的图片大小*******')
            console.log(ndata.length / 1024)
            const buffer = Buffer.from(ndata, 'base64');
            console.log(buffer)

            return buffer
        },
           handleRadioChange(value) {
           this.shopState = this.chartRadio === '启用' ? true: false
    },
}
}
</script>


<style lang="scss">
.dialog-report{
  .el-form-item__content{
    padding-left: 20px !important;
  }
  .report-img{
    padding: 10px;
    overflow-x: auto;
    flex-wrap: nowrap;
    .img-item{
      margin-right: 30px;
      line-height: 1em;
      height: 100px;
      width: auto;
    }
  }
}
.fileParent {
  position: relative;
     width: 120px;
    height: 78px;
    left: 0px;
    top: 0;
  img {
    position: absolute;
    width: 120px;
    height: 78px;
    left: 0px;
    top: 0;
  }
  
}
.file {
  position: absolute;
  left: 0;
  opacity: 0;
      top: 0;
      width: 120px;
    height: 78px;
}
</style>
