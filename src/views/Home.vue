<template>
    <el-container>
        <el-container style="height: 98vh;">
            <HeadBar current="home"></HeadBar>
            <el-container>
                <el-main class="elmain" style="padding: 0;">
                    <!-- 弹窗 -->
                    <el-dialog
                        title="头像匹配结果"
                        :before-close="dialogClose"
                        :visible="dialogVisible"
                    >
                        <el-image
                            :src="respic"
                            fit="scale-down"
                            style="height: 160px; width: 400px;margin-left:130px;"
                        >
                        </el-image>
                        <div
                            class="row-wrap"
                            style="justify-content: center; text-align: center;"
                        >
                            <div
                                v-for="item in result"
                                class="search-card"
                                :key="item.id"
                            >
                                <div class="search-block">
                                    <el-button
                                        style="padding: 5px; right: 10px;"
                                        type="primary"
                                        icon="el-icon-info"
                                        circle
                                        @click="gotoPeople(item.id)"
                                    ></el-button>
                                    <el-image
                                        :src="item.headimage"
                                        fit="cover"
                                        style="height: 160px; width: 120px;"
                                    >
                                        <div slot="error" class="image-slot">
                                            <i
                                                class="el-icon-picture-outline"
                                            ></i>
                                        </div>
                                    </el-image>
                                    <div>
                                        <span class="tags">{{
                                            item.major
                                        }}</span
                                        ><span
                                            style="font-size: 24px; margin-left: 5px;"
                                            >{{ item.name }}</span
                                        >
                                    </div>
                                    <div
                                        style="font-size: 16px; margin-top: 5px;"
                                    >
                                        {{ item.birthplace }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-dialog>

                    <div class="card image-search-bar">
                        <div style="font-size: 18px; color: #409EFF;">
                            <el-tag effect="plain" size="small">AI识图</el-tag
                            >寻找您的文化气质
                        </div>
                        <div style="margin: 5px 0 10px 0;">
                            上传一张你的照片，寻找最相似的文化名家
                        </div>
                        <div>
                            <el-button
                                icon="el-icon-picture-outline-round"
                                type="primary"
                                size="small"
                                @click="uploadFile"
                                round
                                >上传照片</el-button
                            >
                            <input
                                type="file"
                                name="file"
                                id="file1"
                                style="display: none;"
                                @change="add"
                            />
                        </div>
                    </div>
                    <Cesium></Cesium>
                </el-main>
            </el-container>
            <el-footer class="footer" height="40px">
                <FootBar></FootBar>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script>
import Cesium from "@/components/Cesium.vue";
import cookie from "../../static/js/cookie";
import store from "../store";
import HeadBar from "../components/HeadBar";
import FootBar from "../components/FootBar";
import { upload, searchpeoplepic, searchpeopleupload } from "../api/api";
import Vue from "vue";
export default {
    name: "Home",
    data() {
        return {
            IsLog: false,
            result: [],
            IsRes: false,
            respic: "",
            uploadpic: "",
            recordid: "",
            fileName: "",
            dialogVisible: false,
        };
    },
    components: {
        Cesium,
        HeadBar,
        FootBar,
    },
    created() {},
    methods: {
        uploadFile() {
            document.querySelector("#file1").click();
        },
        async add() {
            var that = this;
            var data = new FormData();
            var image = document.getElementById("file1").files[0];
            console.log(image);
            data.append("file", image);
            data.append("headers", {
                "Content-Type": "multipart/form-data",
            });
            console.log(data);
            var res = await upload(data);
            console.log("res", res);
            if (res.data.result[0] == "-1") {
                that.$data.IsRes = false;
            } else {
                that.$data.IsRes = true;
                that.$data.recordid = res.data.recordid;
                console.log("that.$data.recordid", that.$data.recordid);

                var temp = [];
                res.data.result.forEach(async function(item, index) {
                    console.log(item);
                    temp.push(searchpeoplepic(item));
                });

                Promise.all(temp).then(async (res) => {
                    for (var i = 0; i < temp.length; i++) {
                        console.log("res[i]", i, res[i]);
                        this.$data.result.push(res[i].data[0]);
                    }
                });
            }
            var res2 = await searchpeopleupload(that.$data.recordid);
            console.log("res2", res2);
            that.$data.respic = res2.data.resimage;
            that.$data.uploadpic = res2.data.image;
            if (that.$data.IsRes) {
                that.$data.dialogVisible = true;
            } else {
                this.$message("AI被您的美颜震惊了，没有匹配成功>_<");
                that.dialogClose();
            }

            console.log(
                this.$data.IsRes,
                this.$data.respic,
                this.$data.uploadpic,
                this.$data.recordid,
                this.$data.result
            );
        },
        gotoPeople(id) {
            this.$router.push({ path: "about/" + id });
            this.dialogClose();
        },
        dialogClose() {
            this.$data.dialogVisible = false;
            this.$data.result = [];
        },
    },
};
</script>

<style>
@import url("../../static/main.css");

input.file {
    background-color: #409eff;
}
</style>
