<template>
    <page>
        <ListView for="proeprty in selectedProList" @itemTap="onPropertyTap">
            <v-template>
                <PropertyItem :item="proeprty"></PropertyItem>
            </v-template>
        </ListView>
    </page>
</template>

<script>
import PropertyDetail from "./PropertyDetail";
import PropertyItem from "./PropertyItem";

export default {
    components: {
        PropertyItem
    },
    props: ["selectedProList","isLoggedIn"],
    data() {
        return {};
    },
    methods: {
        onPropertyTap: function(args) {
            // console.log("Item with index: " + args.index + " tapped");
            // console.log("Property selected: " + args.item.title);
            this.$navigateTo(PropertyDetail, {
                transition: {},
                transitionIOS: {},
                transitionAndroid: {},
                props: {
                    selectedProperty: args.item,
                    isLoggedIn: this.isLoggedIn,
                    $delegate: this
                }
            });
        }
    }
};
</script>

<style>
</style>