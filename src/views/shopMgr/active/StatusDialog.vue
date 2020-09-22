<template>
  <div class="dialog-report">
    <el-dialog
      title="新增热门"
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



                    <el-form-item label="商户活动名称" prop="reportUserName">
        <el-input
          v-model="useData.title"
          name="title"
          style="width:50%;"
          tabindex="1"
          auto-complete="off"
        />                     </el-form-item>


            <el-form-item label="投放地区" prop="accuseName">
                            
        <el-radio-group
        v-model="useData.radio"
        class="radio-group"
        size="mini"
        @change="handleRadioChange"
      >
        <el-radio-button label="活动当地"></el-radio-button>
                <el-radio-button label="全国"></el-radio-button>
      </el-radio-group>
             </el-form-item>
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
          


          </el-form>
        <el-button type="primary" style="width:10%;margin-left:50%;margin-top:20px;" size="small" @click="handleAddMember()">新增</el-button>

        </vue-scroll>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { add_hot_activity,get_upload_token,update_hot_activity} from '@/api/contentMgr'
import { allReportType } from '@/utils/const'
import ReportStatus from '@/components/ReportStatus'
import Userid from '@/components/Userid'
import Activityid from '@/components/Activityid'
import { visible } from '@/mixins/commonSet'
export default {
  components: { ReportStatus, Userid, Activityid },
  mixins: [visible],
  props: {
    useData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tempImg:"",
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
      let barId = this.useData.userId
      let activityId = this.useData.id
      let startTime =  this.useData.startTime;
      let endTime =  this.useData.endTime;
      let order =  1;
      let status =  '1';
      let type = 'recommend';
      let city = '';

          switch (this.useData.radio) {
                    case "活动当地":
                        city = this.useData.city;
                        break;
                    case "全国":
                        city = '全国';
                        break;
                    default:
                        throw new Error("Table Layout don't have event " + this.chartRadio + ".")
                    }

      // if(this.useData.id)
      // {
      //   if(this.tempImg)
      //   {

      //     this.useData.picUrl = this.tempImg;
      //   }
      // order =  this.useData.order;
      // status =  this.useData.status;
      // let id = this.useData.id;
      // let data = ({ id:id,title: title, url: url, order: order, status: status, type: type, picUrl: picUrl, urlType: urlType});
      //  console.log(data)
      // update_hot_activity(data);

      //   this.handleDialogClose()
      //   this.$emit('emitFunc', { function: 'getData', arguments: [] })
      // }
      // else
      // {
      let data = ({ barId: barId, activityId: activityId, startTime: startTime, endTime: endTime, order: order, status: status, type: type,city: city});
      console.log(data)
      add_hot_activity(data);
        this.$emit('emitFunc', { function: 'getData', arguments: [] })
        this.handleDialogClose()
        this.$emit('emitFunc', { function: 'getData', arguments: [] })
      


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
