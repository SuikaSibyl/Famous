<template>
    <div class="about">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div>
                    <el-button
                        style="z-index:100"
                        type="primary"
                        icon="el-icon-edit"
                        >我的收藏：</el-button
                    >
                </div>
                <div v-for="item in favPeople" :key="item">
                    <h1>{{ item.famouspeople.name }}</h1>
                    <el-image
                        :src="item.famouspeople.headimage"
                        fit="contain"
                    ></el-image>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getAllFavPeople, getAllFavWork } from "../api/api";
import cookie from "../../static/js/cookie.js";
export default {
    name: "Home",
    data() {
        return {
            favPeople: [],
            favWorks: [],
            url:
                "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        };
    },
    created: function() {
        getAllFavPeople().then((response) => {
            this.favPeople = response.data;
            console.log("data", response.data);
        });
        getAllFavWork().then((response) => {
            this.favWorks = response.data;
            console.log("data", response.data);
        });
    },
    methods: {
        deletePeolple(id) {
            delFav(id)
                .then((response) => {
                    console.log(response.data);
                    getAllFavPeople().then((response) => {
                        this.favPeople = response.data;
                        console.log("data", response.data);
                    });
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        deleteWork(id) {
            delFavWork(id)
                .then((response) => {
                    console.log(response.data);
                    getAllFavPeople().then((response) => {
                        this.favWorks = response.data;
                        console.log("data", response.data);
                    });
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
