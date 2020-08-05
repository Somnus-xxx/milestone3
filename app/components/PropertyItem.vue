<template>
    <StackLayout margin="10">
        <StackLayout
            borderRadius="5"
            height="150"
            width="90%"
            stretch="aspectFit"
            class="background-image"
            :backgroundImage="item.imageUrl"
        ></StackLayout>

        <Label fontSize="14" class="font-weight-bold" color="#000000" :text="item.title"></Label>
        <Label fontSize="12" color="#999999" :text="item.estate+' / '+'Rent:$'+item.rent"></Label>
    </StackLayout>
</template>

<script>
import { isIOS, isAndroid } from "tns-core-modules/platform";
export default {
    props: ["item"],

    mounted() {
        // console.log(JSON.stringify(this.item));
    },
    methods: {},
    data() {
        return {};
    }
};
</script>
<style scoped>
.content {
    margin-left: 16;
    margin-right: 16;
    margin-bottom: 3;
    margin-top: 16;
}

.lineBreak {
    height: 7;
    border: none;
    color: #e0e0e0;
    background-color: #e0e0e0;
}
</style>