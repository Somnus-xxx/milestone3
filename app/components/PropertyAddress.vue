<template>
    <page>
        <WebView :src="esLocSrc" />
    </page>
</template>

<script>
export default {
    props: ["esName", "$delegate"],
    mounted() {
        // console.log("in filter");
        // console.log(this.esName);

        this.esLocSrc =
            "https://leafletapi.mtchoy.now.sh/index.html?lat=" +
            this.estates.filter(d => d.esName == this.esName)[0].esLatitude +
            "&lng=" +
            this.estates.filter(d => d.esName == this.esName)[0].esLongitude +
            "&zoom=17&markerLat=" +
            this.estates.filter(d => d.esName == this.esName)[0].esLatitude +
            "&markerLng=" +
            this.estates.filter(d => d.esName == this.esName)[0].esLongitude +
            "&markerTitle=" +
            this.esName.replace(/ /g, "%20") +
            "&locate=true";
        // https://leafletapi.mtchoy.now.sh/index.html?lat=22.34&lng=114.18&zoom=17&markerLat=22.341072&markerLng=114.179645&markerTitle=AC%20Hall&locate=true

        // console.log(this.esLocSrc); 

        // this.estateLoc = this.estates.filter(function(p) {
        //     p.esName == "City One Shatin";
        // });
    },
    data() {
        return {
            esLocSrc: "",
            estates: [
                {
                    esName: "City One Shatin",
                    esLatitude: "22.386389",
                    esLongitude: "114.203889"
                },
                {
                    esName: "Festival City",
                    esLatitude: "22.3692",
                    esLongitude: "114.1743"
                },
                {
                    esName: "Southern District",
                    esLatitude: "22.2617",
                    esLongitude: "114.1301"
                },
                {
                    esName: "Island Resort",
                    esLatitude: "22.2655",
                    esLongitude: "114.2512"
                },
                {
                    esName: "Parc Oasis",
                    esLatitude: "22.3339",
                    esLongitude: "114.1740"
                },
                {
                    esName: "Castello",
                    esLatitude: "22.3837",
                    esLongitude: "114.2153"
                },
                {
                    esName: "Sunshine City",
                    esLatitude: "22.4244",
                    esLongitude: "114.2321"
                }
            ]
        };
    }
};
</script>

<style>
</style>