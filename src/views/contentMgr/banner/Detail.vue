<template>
  <div class="dialog-report">
    <el-dialog
      title="新增banner"
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


            <el-form-item label="banner" prop="reportUserId">

　　　　　　　<el-button
              class="fileParent"
              type="file"
              icon="el-icon-plus"
              style="background:#808080"
              @change="uploadFile"
            >
              <img :src="tempImg" v-if="tempImg" alt />
              <img :src="useData.picUrl" v-else alt />
              <input class="file" type="file" @change="uploadFile" multiple="multiple" />

            </el-button>
                                <div class="text-desc">最多上传1张照片</div>      

            </el-form-item>




            <el-form-item label="类型" prop="accuseName">
                            
        <el-radio-group
        v-model="useData.radio"
        class="radio-group"
        size="mini"
        @change="handleRadioChange"
      >
        <el-radio-button label="URL外链"></el-radio-button>
                <el-radio-button label="活动详情"></el-radio-button>
        <el-radio-button label="商户详情"></el-radio-button>
      </el-radio-group>
             </el-form-item>


            <el-form-item label="根据类型显示" prop="id">
        <el-input
          v-model="useData.url"
          name="url"
          tabindex="1"
          style="width:50%;"
          auto-complete="off"

        />
          URL链接/商户id/商户活动id           
                       </el-form-item>


            <el-form-item label="描述" prop="reportUserName">
        <el-input
          v-model="useData.title"
          name="title"
          tabindex="1"
          style="width:50%;"
          auto-complete="off"
        />                     </el-form-item>
          


          </el-form>
        <el-button type="primary" style="width:10%;margin-left:50%;margin-top:20px;" v-if="this.useData.id"  size="small" @click="handleAddMember()">更新</el-button>
        <el-button type="primary" style="width:10%;margin-left:50%;margin-top:20px;" v-else size="small" @click="handleAddMember()">新增</el-button>

        </vue-scroll>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { add_banner,get_upload_token,update_banner} from '@/api/contentMgr'
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
      let title =  this.useData.title;
            let url =  this.useData.url;
      let order =  1;
      let status =  '1';
      let type = '';
      if(this.useData.typelable =='推荐页banner')
      {
        type = "recommend";
      }
      if(this.useData.typelable =='活动页banner')
      {
        type = "activity";
      }     
                let picUrl  = this.tempImg;
      let urlType = '';

          switch (this.useData.radio) {
                    case "URL外链":
                        urlType = '1';
                        break;
                    case "活动详情":
                        urlType = '2';
                        break;
                    case "商户详情":
                        urlType = '3';
                        break;
                    default:
                        throw new Error("Table Layout don't have event " + this.chartRadio + ".")
                    }

      if(this.useData.id)
      {
        if(this.tempImg)
        {

          this.useData.picUrl = this.tempImg;
        }
      order =  this.useData.order;
      status =  this.useData.status;
      let id = this.useData.id;
      let data = ({ id:id,title: title, url: url, order: order, status: status, type: type, picUrl: picUrl, urlType: urlType});
       console.log(data)
      update_banner(data);

        this.handleDialogClose()
        this.$emit('emitFunc', { function: 'getData', arguments: [] })
      }
      else
      {
      let data = ({ title: title, url: url, order: order, status: status, type: type, picUrl: picUrl, urlType: urlType});
      console.log(data)
      add_banner(data);
        this.$emit('emitFunc', { function: 'getData', arguments: [] })
        this.handleDialogClose()
        this.$emit('emitFunc', { function: 'getData', arguments: [] })
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
