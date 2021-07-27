<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 课程管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>新增课程</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
            <el-step title="步骤 1" ></el-step>
            <el-step title="步骤 2" ></el-step>
            <el-step title="步骤 3" ></el-step>
        </el-steps>


        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">

                    <el-form-item label="课程标题">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>

                    <el-form-item label="副标题">
                        <el-input v-model="form.subtitle"></el-input>
                    </el-form-item>

                    <el-form-item label="课程标签">
                        <el-input v-model="form.label"></el-input>
                    </el-form-item>
                    <el-form-item label="选择教师">
                        <el-select v-model="form.teacher_id" placeholder="请选择">
                            <el-option
                                    v-for="item in teachersOption"
                                    :key="item.id"
                                    :label="item.nickname"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="课程价格">
                        <el-input v-model="form.price"></el-input>
                    </el-form-item>

                    <el-form-item class="upload-bg register-bg" label="上传文件" prop="ad_url">
                        <div class="hide-video-box"></div>
                        <el-upload
                                class="avatar-uploader"
                                ref="upload"
                                :action="upload_url"
                                list-type="picture-card"
                                :name="upload_name"
                                :on-remove="handleRemove"
                                :on-exceed="handleExceed"
                                :file-list="ad_url_list"
                                :limit="1"
                                :http-request="uploadSectionFile">
                            <span class="font-14">选择图片</span>
                            <div slot="tip" class="el-upload__tip">尺寸750*1125px，大小2M以内，视频支持MP4</div>
                        </el-upload>
                        <div class="bg-box">广告背景图预览</div>
                    </el-form-item>



                    <!--<el-form-item label="课程分类">-->
                        <!--<el-select v-model="form.region" placeholder="请选择">-->
                            <!--<el-option key="bbk" label="步步高" value="bbk"></el-option>-->
                            <!--<el-option key="xtc" label="小天才" value="xtc"></el-option>-->
                            <!--<el-option key="imoo" label="imoo" value="imoo"></el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->


                    <!--<el-form-item label="课程摘要">-->
                        <!--<el-input type="textarea" rows="5" v-model="form.desc"></el-input>-->
                    <!--</el-form-item>-->

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">创建课程</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {createCourses,upLoaderImagesTest, getTeachers} from '@/service/api/index'
    import bus from '@/views/admin/common/bus'

    export default {

    name: 'baseform',

    inject: ['reload'],


    data() {
        return {
            form: {
                title: '',
                subtitle: '',
                price: '',
                cover: '',
                label: '',
                teacher_id: '',
            },
            teachersOption: [],
            upload_url: '',//上传URL
            upload_name: '',//图片或视频名称
            ad_url: '',//上传后的图片或视频URL
            ad_url_list: [],//预览列表
            image_path: ''// 图片上传后的存储地址,
        };
    },
    created(){
        getTeachers().then(res=>{
            this.teachersOption = res;
        }).catch(err=>{
            console.log(err);
        })
    },



    methods: {
        onSubmit() {
            this.$confirm('此操作将创建课程, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';

                        let res = createCourses(this.form);
                        res.then(res=>{

                            done();
                            instance.confirmButtonLoading = false;
                            this.$message({
                                type: 'success',
                                message: '创建成功!'
                            });

                            //调用bus的关闭当前标签功能
                            bus.$emit('close_current_tags');

                            this.$router.push('/admin/createchapter/'+res.id)
                        }).catch(error => {
                            done();
                            instance.confirmButtonLoading = false;
                            this.$message({
                                type: 'info',
                                message: '创建课程失败!'
                            });
                        });

                    } else {
                        done();
                    }
                },

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            })

        },
        handleExceed: function () {
            _.$alert('请先删除选择的图片或视频，再上传', '提示', {
                type: 'warning'
            });
        },
        handleRemove: function (res, file) {
            var self = this;
            self.ad_url = '';
            var liItem = document.getElementsByClassName('hide-video-box')[0];
            liItem.innerHTML = '';
        },
        uploadSectionFile: function (params) {
            var self = this,
                file = params.file,
                fileType = file.type,
                isImage = fileType.indexOf('image') != -1,
                isVideo = fileType.indexOf('video') != -1,
                file_url = self.$refs.upload.uploadFiles[0].url;

            var isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                _.$alert('上传图片或视频大小不能超过 2MB!', '提示', { type: 'error' });
                self.$refs.upload.uploadFiles = [];
                return;
            }

            if(!isImage && !isVideo){
                _.$alert('请选择图片或视频!', '提示', { type: 'error' });
                self.$refs.upload.uploadFiles = [];
                return;
            }

            if (isImage) {
                var img = new Image();
                img.src = file_url;
                img.onload = function () {
                    // if (img.width !== 750 || img.height != 1125) {
                    // if (img.width !== 750 || img.height != 1125) {
                    //     _.$alert('图片尺寸为750*1125px', '提示', { type: 'error' });
                    //     //将上传列表清空
                    //     self.$refs.upload.uploadFiles = [];
                    //     return;
                    // }
                    //图片上传
                    // self.upload_url = '你的图片上传URL';
                    // self.upload_url = 'http://larabbs.test/api/v1/imagesTest';
                    self.upload_name = 'file';
                    self.uploadFile(file, isVideo, '');
                }
            } else if (isVideo) {
                var isMP4 = file.type === 'video/mp4';
                if (!isMP4) {
                    _.$alert('上传视频只支持 mp4 格式!', '提示', { type: 'error' });
                    self.$refs.upload.uploadFiles = [];
                    return;
                }
                var videoDiv = document.createElement('video');
                var liItem = document.getElementsByClassName('hide-video-box')[0];
                videoDiv.src = file_url;
                liItem.appendChild(videoDiv);

                videoDiv.onloadeddata = function (event) {
                    var target = event.target;
                    var width = target.offsetWidth;
                    var height = target.offsetHeight;

                    if (width !== 750 || height != 1125) {
                        _.$alert('视频尺寸为750*1125px', '提示', { type: 'error' });
                        //将上传列表清空
                        self.$refs.upload.uploadFiles = [];
                        return;
                    }

                    //视频上传
                    self.upload_url = '你的视频上传URL';
                    self.upload_name = 'file_video[]';
                    self.uploadFile(file, isVideo, videoDiv);
                }
            }
        },
        uploadFile: function (file, isVideo, videoDiv) {
            var self = this,
                formData = new FormData();
            formData.append(self.upload_name, file);
            formData.append('type', 'topic');

            // axios.post(self.upload_url, formData, { headers:{
            //         Authorization: 'Bearer ' + store.getters.accessToken,
            //     } })

            upLoaderImagesTest(formData)            //  todo。。。。调用已经封装好的组件
                .then(function (res) {
                    self.form.cover = res.path ;
                    self.ad_url_list = [{ url:res.path }];

                    console.log(self.form.cover);
                    if (res.result === '0000') {
                        self.ad_url = res.data[0];
                        //创建一个显示video的容器
                        if (isVideo) {
                            var liItem = document.getElementsByClassName('el-upload-list__item')[0];
                            videoDiv.style.width = '278px';
                            videoDiv.style.height = '415px';
                            liItem.prepend(videoDiv);
                        }
                        return;
                    }
                    _.$alert('上传失败，请重新上传', '提示', { type: 'error' });
                    self.$refs.upload.uploadFiles = [];
                })
                .catch(function (err) {
                    console.error(err);
                });
        }

    }

};
</script>