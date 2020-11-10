<template>
    <div class="about"></div>
</template>

<script>
import { searchPeopleName, searchPeopleMajor, searchWork } from "../api/api";
import cookie from "../../static/js/cookie.js";
export default {
    name: "Home",
    data() {
        return {};
    },
    created: function() {},
    methods: {
        searchWorks(workname) {
            searchWork({ search: workname })
                .then((response) => {
                    console.log(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        searchpeoplename(peoplename) {
            searchPeopleName({ search: peoplename })
                .then((response) => {
                    console.log(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        searchpeoplemajor(peoplemajor) {
            searchPeopleName({ search: peoplemajor })
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
