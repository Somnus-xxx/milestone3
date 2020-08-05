<template>
    <Page>
        <ScrollView orientation="vertical">
            <StackLayout orientation="vertical">
                <Label
                    :text="detailJSON.title"
                    margin="10"
                    class="header"
                    horizontalAlignment="center"
                />
                <Image :src="detailJSON.imageUrl" height="300" stretch="aspectFill" />
                <StackLayout orientation="vertical" class="mainContent">
                    <GridLayout
                        width="100%"
                        columns="auto,*"
                        rows="auto,auto,auto,auto,auto,auto"
                        verticalAlignment="center"
                        class="mainContent"
                    >
                        <Label
                            row="0"
                            col="0"
                            class="item-name"
                            textwrap="true"
                            verticalAlignment="bottom"
                            horizontalAlignment="left"
                            text="Estate Name:"
                        />
                        <Label
                            row="0"
                            col="1"
                            class="item-category"
                            textwrap="true"
                            verticalAlignment="bottom"
                            horizontalAlignment="left"
                            :text="detailJSON.estate"
                        />
                        <Label
                            row="1"
                            col="0"
                            class="item-name"
                            textwrap="true"
                            verticalAlignment="bottom"
                            horizontalAlignment="left"
                            text="Bedrooms:"
                        />
                        <Label
                            row="1"
                            col="1"
                            class="item-category"
                            textwrap="true"
                            verticalAlignment="bottom"
                            horizontalAlignment="left"
                            :text="detailJSON.bedrooms"
                        />
                        <Label
                            row="2"
                            col="0"
                            class="item-name"
                            textwrap="true"
                            verticalAlignment="bottom"
                            horizontalAlignment="left"
                            text="Gross Area:"
                        />
                        <Label
                            row="2"
                            col="1"
                            class="item-category"
                            textwrap="true"
                            verticalAlignment="bottom"
                            horizontalAlignment="left"
                            :text="detailJSON.grossArea"
                        />
                        <Label
                            row="3"
                            col="0"
                            class="item-name"
                            textwrap="true"
                            verticalAlignment="bottom"
                            horizontalAlignment="left"
                            text="Expected Tenants:"
                        />
                        <Label
                            row="3"
                            col="1"
                            class="item-category"
                            textwrap="true"
                            verticalAlignment="bottom"
                            horizontalAlignment="left"
                            :text="detailJSON.expectedTenants"
                        />
                        <Label
                            row="4"
                            col="0"
                            class="item-name"
                            textwrap="true"
                            verticalAlignment="bottom"
                            horizontalAlignment="left"
                            text="Remain Tenant:"
                        />
                        <Label
                            row="4"
                            col="1"
                            class="item-category"
                            textwrap="true"
                            verticalAlignment="bottom"
                            horizontalAlignment="left"
                            :text="detailJSON.remainTenant"
                        />
                        <Label
                            row="5"
                            col="0"
                            class="item-name"
                            textwrap="true"
                            verticalAlignment="bottom"
                            horizontalAlignment="left"
                            text="Rent:"
                        />
                        <Label
                            row="5"
                            col="1"
                            class="item-category"
                            textwrap="true"
                            verticalAlignment="bottom"
                            horizontalAlignment="left"
                            :text="detailJSON.rent"
                        />
                    </GridLayout>

                    <Button v-show="isLoggedIn"
                        :text="detailJSON.rentState ? 'Move Out' : 'Move In'"
                        @tap="onRentBtnTap"
                        class="btn btn-primary m-t-20"
                    />
                    <Button text="Address" @tap="onAddressBtnTap" class="btn btn-primary m-t-20" />
                </StackLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
import PropertyAddress from "./PropertyAddress";
import PropertyHome from "./PropertyHome";
export default {
    props: ["selectedProperty","isLoggedIn"],
    data() {
        return {
            detailJSON: {}
        };
    },
    async mounted() {
        this.fetchPropertyDetails();
    },
    methods: {
        fetchPropertyDetails: async function() {
            var response = await fetch(
                global.rootURL +
                    "/property/details/" +
                    this.selectedProperty.id,
                {
                    method: "GET",
                    credentials: "same-origin"
                }
            );

            if (response.ok) {
                this.detailJSON = await response.json();
            } else {
                console.log(response.statusText);
            }
        },
        moveIn: async function() {
            var response = await fetch(
                global.rootURL + "/user/own/" + this.selectedProperty.id,
                {
                    method: "PATCH",
                    credentials: "same-origin"
                }
            );
            if (response.ok) {
                alert(await response.json());
            } else if (response.status == 409) {
                let options = {
                    title: "Move In Failed",
                    message: await response.text(),
                    okButtonText: "OK"
                };
                alert(options);
            } else {
                alert(response.statusText);
            }
        },
        moveOut: async function() {
            var response = await fetch(
                global.rootURL + "/user/own/" + this.selectedProperty.id,
                {
                    method: "DELETE",
                    credentials: "same-origin"
                }
            );
            if (response.ok) {
                alert(await response.json());
            } else if (response.status == 409) {
                let options = {
                    title: "Move Out Failed",
                    message: await response.text(),
                    okButtonText: "OK"
                };
                alert(options);
            } else {
                alert(response.statusText);
            }
        },
        onAddressBtnTap() {
            // console.log("Property selected: " + this.selectedProperty.title);
            this.$navigateTo(PropertyAddress, {
                transition: {},
                transitionIOS: {},
                transitionAndroid: {},
                props: {
                    esName: this.selectedProperty.estate
                    // $delegate: this
                }
            });
        },
        onRentBtnTap() {
            if (this.detailJSON.rentState) {
                const confirmOptions = {
                    title: "Are you sure?",
                    message: "to move out this apartment?",
                    okButtonText: "Yes",
                    cancelButtonText: "Cancel"
                };
                confirm(confirmOptions).then(result => {
                    // console.log(result);
                    if (result) {
                        this.moveOut();
                        this.fetchPropertyDetails();
                    }
                });
            } else {
                const confirmOptions = {
                    title: "Are you sure?",
                    message: "to move in this apartment?",
                    okButtonText: "Yes",
                    cancelButtonText: "Cancel"
                };
                confirm(confirmOptions).then(result => {
                    // console.log(result);
                    if (result) {
                        this.moveIn();
                        this.fetchPropertyDetails();
                    }
                });
            }
        }
    }
};
</script>
<style>
</style>