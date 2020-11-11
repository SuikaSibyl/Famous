<template>
    <el-container>
        <el-container style="height: 98vh;">
            <HeadBar current="none" title="人物详情"></HeadBar>
            <el-container>
                <el-aside width="500px" class="aside">
                    <div class="column-wrap" style="position: relative;">
                        <el-button
                            v-if="!name"
                            @click="refresh"
                            style="position: absolute; z-index: 200; right: 0;"
                            type="primary"
                            icon="el-icon-refresh-right"
                            circle
                        ></el-button>
                        <div class="row-wrap margin-bottom">
                            <div
                                class="avatar-wrap"
                                style="margin-right: 20px;"
                            >
                                <el-image :src="url" fit="contain"> </el-image>
                            </div>
                            <div class="column-wrap margin-bottom">
                                <div class="row-wrap">
                                    <div
                                        style="font-size: 28px; font-weight: lighter;"
                                    >
                                        {{ name }}
                                    </div>
                                    <div
                                        style="line-height: 40px; color: gray; margin-left: 4px;"
                                    >
                                        ({{ gender }})
                                    </div>
                                </div>
                                <div>
                                    <el-button
                                        v-if="hasFav"
                                        @click="deleteCollect"
                                        style="z-index:100"
                                        type="warning"
                                        icon="el-icon-star-on"
                                        size="medium"
                                        round
                                        >取消收藏</el-button
                                    >
                                    <el-button
                                        class="el-button-modify"
                                        v-else
                                        @click="addCollect"
                                        style="z-index:100"
                                        type="primary"
                                        icon="el-icon-star-off"
                                        size="medium"
                                        round
                                        >收藏人物</el-button
                                    >
                                </div>
                                <div>
                                    {{ dateofbirth }} -
                                    {{ dateofdeath ? dateofdeath : "?" }}
                                </div>
                                <div>
                                    <span class="text-blue text-bold"
                                        >出生地：</span
                                    >{{ birthplace }}
                                </div>
                                <div>
                                    <span class="text-blue text-bold"
                                        >专业：</span
                                    >{{ major }}
                                </div>
                                <div>
                                    <span class="text-blue text-bold"
                                        >国籍：</span
                                    >{{ nationality }}
                                </div>
                                <div>
                                    <span class="text-blue text-bold"
                                        >毕业院校：</span
                                    >{{ academy }}
                                </div>
                            </div>
                        </div>
                        <div class="margin-bottom">
                            <el-divider
                                class="divider-about"
                                content-position="left"
                                >简介</el-divider
                            >
                            <div style="margin-top: 15px;">
                                {{ introduction }}
                            </div>
                            <el-divider
                                class="divider-about"
                                content-position="left"
                                >代表作品</el-divider
                            >
                            <div style="margin-top: 15px;">{{ repwork }}</div>
                            <el-divider
                                class="divider-about"
                                content-position="left"
                                >主要成就</el-divider
                            >
                            <div style="margin-top: 15px;">{{ majorAchv }}</div>
                        </div>
                    </div>
                </el-aside>
                <el-main class="elmain">
                    <el-carousel
                        style="height: 100%;"
                        :autoplay="false"
                        trigger="click"
                    >
                        <el-carousel-item
                            v-for="(item, index) in works"
                            :key="item.id"
                        >
                            <el-image
                                class="elimage"
                                style="width: 100%; height: 100%; background-color: white;"
                                :src="item.image"
                                fit="contain"
                            ></el-image>
                            <div class="work-title card">{{ item.title }}</div>
                            <div class="work-btn-wrap">
                                <el-button
                                    v-if="item.isFav"
                                    @click="deleteCollectWork(item.id, index)"
                                    style="z-index:100"
                                    type="warning"
                                    icon="el-icon-star-on"
                                    size="medium"
                                    round
                                    >取消收藏</el-button
                                >
                                <el-button
                                    v-else
                                    @click="addCollectWork(item.id, index)"
                                    style="z-index:100"
                                    type="primary"
                                    icon="el-icon-star-off"
                                    size="medium"
                                    round
                                    >收藏作品</el-button
                                >
                                <el-button
                                    type="info"
                                    icon="el-icon-view"
                                    @click="downloadWork(item.image)"
                                    circle
                                ></el-button>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </el-main>
            </el-container>
            <el-footer class="footer" height="40px">
                <FootBar></FootBar>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script>
import {
    accuratePeople,
    askworks,
    getFav,
    addFav,
    delFav,
    addFavWork,
    delFavWork,
    askIsworkFav,
} from "../api/api";
import HeadBar from "../components/HeadBar";
import FootBar from "../components/FootBar";
import cookie from "../../static/js/cookie.js";
export default {
    name: "Home",
    data() {
        return {
            name: name,
            id: this.$route.params.id,
            dateofbirth: null,
            dateofdeath: null,
            birthplace: null,
            major: null,
            gender: null,
            introduction: null,
            nationality: null,
            academy: null,
            repwork: null,
            majorAchv: null,
            works: [],
            hasFav: false,
            url:
                "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            IsLog: false,
        };
    },
    components: {
        HeadBar,
        FootBar,
    },
    created: function() {
        accuratePeople({
            id: parseInt(this.$route.params.id),
        }).then((response) => {
            this.$data.name = response.data.name;
            this.$data.url = response.data.headimage;
            this.$data.dateofbirth = response.data.dateofbirth;
            this.$data.dateofdeath = response.data.dateofdeath;
            this.$data.birthplace = response.data.birthplace;
            this.$data.major = response.data.major;
            this.$data.gender = response.data.gender;
            this.$data.introduction = response.data.introduction;
            this.$data.nationality = response.data.nationality;
            this.$data.academy = response.data.academy;
            this.$data.repwork = response.data.repwork;
            this.$data.majorAchv = response.data.majorAchv;
            if (cookie.getCookie("token")) {
                getFav(parseInt(this.$route.params.id))
                    .then((response) => {
                        this.hasFav = true;
                    })
                    .catch(function(error) {
                        console.log(error.response);
                    });
            }
            if (this.$store.state.userInfo) {
                if (this.$store.state.userInfo.name) this.IsLog = true;
            }
        });

        var that = this;
        askworks({
            id: this.$route.params.id,
        }).then((response) => {
            response.data.forEach(function(single, index) {
                if (cookie.getCookie("token")) {
                    askIsworkFav(single.id)
                        .then((response) => {
                            single["isFav"] = true;
                            that.$data.works.push(single);
                        })
                        .catch(function(error) {
                            single["isFav"] = false;
                            that.$data.works.push(single);
                            //console.log('err', error)
                        });
                } else {
                    single["isFav"] = false;
                    that.$data.works.push(single);
                }
            });
        });
    },
    methods: {
        addCollect() {
            addFav({ famouspeople: this.$route.params.id })
                .then((response) => {
                    console.log(response.data);
                    this.hasFav = true;
                    this.$message({
                        message: "收藏人物成功",
                        type: "success",
                    });
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        deleteCollect() {
            delFav(this.$route.params.id)
                .then((response) => {
                    console.log(response.data);
                    this.$message("已取消收藏");
                    this.hasFav = false;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        addCollectWork(workid, itemid) {
            console.log("addcollectwork:", workid);
            addFavWork({ works: workid })
                .then((response) => {
                    console.log(response.data);
                    this.$data.works[itemid].isFav = true;
                    this.$message({
                        message: "收藏作品成功",
                        type: "success",
                    });
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        deleteCollectWork(workid, itemid) {
            console.log("deletecollectwork:", workid);
            delFavWork(workid)
                .then((response) => {
                    console.log(response.data);
                    this.$message("已取消收藏");
                    this.$data.works[itemid].isFav = false;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        downloadWork(url) {
            window.open(url);
        },
        refresh() {
            location.reload();
        },
    },
};
</script>

<style>
@import url("../../static/main.css");

.el-carousel__container {
    position: relative;
    height: inherit;
}
</style>
