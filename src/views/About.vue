<template>
    <div class="about">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple">
                    <div class="block">
                        <el-image
                            style="width: 300px; height: 300px"
                            :src="url"
                            fit="contain"
                        >
                        </el-image>
                    </div>
                    <h1>Name: {{ name }}</h1>
                    <h3>ID: id:{{ id }}</h3>
                    <h3>ID: 生日：{{ dateofbirth }}</h3>
                    <h3>ID: 死亡：{{ dateofdeath }}</h3>
                    <h3>ID: 出生地：{{ birthplace }}</h3>
                    <h3>ID: 专业：{{ major }}</h3>
                    <h3>ID: 性别：{{ gender }}</h3>
                    <div>
                        <el-button
                            v-if="hasFav"
                            @click="deleteCollect"
                            style="z-index:100"
                            type="primary"
                            icon="el-icon-edit"
                            >已收藏</el-button
                        >
                        <el-button
                            v-else
                            @click="addCollect"
                            style="z-index:100"
                            type="primary"
                            icon="el-icon-edit"
                            >收藏</el-button
                        >
                    </div>
                    <el-carousel indicator-position="outside">
                        <el-carousel-item v-for="item in works" :key="item">
                            <el-image
                                style="width: 100%; height: 100%"
                                :src="item.image"
                                fit="contain"
                            ></el-image>
                        </el-carousel-item>
                    </el-carousel></div
            ></el-col>
        </el-row>
    </div>
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
import cookie from "../../static/js/cookie.js";
export default {
    name: "Home",
    data() {
        return {
            name: name,
            id: this.$route.params.id,
            dataofbirth: null,
            dateofdeath: null,
            birthplace: null,
            major: null,
            gender: null,
            works: [],
            hasFav: false,
            url:
                "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        };
    },
    created: function() {
        accuratePeople({
            id: parseInt(this.$route.params.id),
        }).then((response) => {
            this.$data.name = response.data.name;
            this.$data.url = response.data.headimage;
            this.$data.dataofbirth = response.data.dataofbirth;
            this.$data.dateofdeath = response.data.dateofdeath;
            this.$data.birthplace = response.data.birthplace;
            this.$data.major = response.data.major;
            this.$data.gender = response.data.gender;
            if (cookie.getCookie("token")) {
                getFav(parseInt(this.$route.params.id))
                    .then((response) => {
                        this.hasFav = true;
                    })
                    .catch(function(error) {
                        console.log(error.response);
                    });
            }
        });

        var that = this;
        askworks({
            id: this.$route.params.id,
        }).then((response) => {
            response.data.forEach(function(single, index) {
                console.log("single", single);
                askIsworkFav(single.id)
                    .then((response) => {
                        single["isFav"] = true;
                        that.$data.works.push(single);
                        console.log("sss", single);
                    })
                    .catch(function(error) {
                        single["isFav"] = false;
                        that.$data.works.push(single);
                        console.log("erro", error);
                        console.log("ssss", single);
                    });
            });
        });
    },
    methods: {
        addCollect() {
            addFav({ famouspeople: this.$route.params.id })
                .then((response) => {
                    console.log(response.data);
                    this.hasFav = true;
                    alert("已成功加入收藏夹");
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        deleteCollect() {
            delFav(this.$route.params.id)
                .then((response) => {
                    console.log(response.data);
                    this.hasFav = false;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        addCollectWork(workid) {
            addFavWork({ works: workid })
                .then((response) => {
                    console.log(response.data);
                    alert("已成功加入收藏夹");
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        deleteCollectWork(workid) {
            delFavWork(workid)
                .then((response) => {
                    console.log(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
    },
};
</script>

<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}
</style>
