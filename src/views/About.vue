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
                    <h1>ID: {{ id }}</h1>
                    <h1>This is an about page</h1>
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
import { accuratePeople, askworks, getFav, addFav, delFav } from "../api/api";
import cookie from "../../static/js/cookie.js";
export default {
    name: "Home",
    data() {
        return {
            name: name,
            id: this.$route.params.id,
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
            console.log(response);
            response.data.forEach(function(single, index) {
                console.log(single.image);
                that.$data.works.push(single);
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
