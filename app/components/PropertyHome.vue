<template>
    <Page>
        <ActionBar title="Home" />
        <StackLayout>
            <BottomNavigation height="400px">
                <TabStrip>
                    <TabStripItem>
                        <Label text="Home"></Label>
                        <Image src="res://home"></Image>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="Estates"></Label>
                        <Image src="res://browse"></Image>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="Search"></Label>
                        <Image src="res://search"></Image>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="Me"></Label>
                        <Image src="res://favorites"></Image>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="Login"></Label>
                        <Image src="res://favorites"></Image>
                    </TabStripItem>
                </TabStrip>
                <TabContentItem>
                    <ListView for="property in propHomeList" @itemTap="onPropertyTap">
                        <v-template>
                            <PropertyItem :item="property"></PropertyItem>
                        </v-template>
                    </ListView>
                </TabContentItem>
                <TabContentItem>
                    <ListView for="estate in estates" @itemTap="onEstateTap">
                        <v-template>
                            <StackLayout>
                                <Label :text="estate.esName" class="h2" />
                            </StackLayout>
                        </v-template>
                    </ListView>
                </TabContentItem>
                <TabContentItem>
                    <ListView for="bedroom in bedroomList" @itemTap="onBedroomTap">
                        <v-template>
                            <StackLayout>
                                <Label :text="bedroom.title" class="h2" />
                            </StackLayout>
                        </v-template>
                    </ListView>
                </TabContentItem>
                <TabContentItem>
                    <StackLayout class="mainContent">
                        <StackLayout alignItems="center">
                            <Image
                                :src="isLoggedIn ? '~/images/profile_pic.png' : '~/images/profile_pic_u.png'"
                                stretch="aspectFill"
                                class="profilePic"
                            ></Image>
                            <Label
                                :text="isLoggedIn ? 'Hansen' : ''"
                                color="#000"
                                fontSize="20"
                                fontWeight="bold"
                                textAlignment="center"
                            />
                        </StackLayout>
                        <StackLayout orientation="vertical">
                            <Button
                                :text="isLoggedIn ? 'Logout':'Login'"
                                @tap="onLoginBtnTap"
                                class="btn btn-primary m-t-20"
                            />
                            <Button
                                v-show="isLoggedIn"
                                text="My Rentals"
                                @tap="onMyRentalBtnTap"
                                class="btn btn-primary m-t-20"
                            />
                        </StackLayout>
                    </StackLayout>
                </TabContentItem>
            </BottomNavigation>
        </StackLayout>
    </Page>
</template>

<script>
import { isIOS, isAndroid } from "tns-core-modules/platform";
import PropertyDetail from "./PropertyDetail";
import PropertyList from "./PropertyList";
import PropertyLogin from "./PropertyLogin";
import PropertyItem from "./PropertyItem";

const gestures = require("ui/gestures");
const app = require("application");

export default {
    components: {
        PropertyItem
    },
    data() {
        return {
            propHomeList: [],
            propWholeList: [],
            isLoggedIn: false,
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
            ],
            bedroomList: [
                {
                    title: "Bedrooms <= 2"
                },
                {
                    title: "Bedrooms >= 3"
                }
            ]
        };
    },
    async mounted() {
        global.rootURL = "http://192.168.1.106:1337";
        var response = await fetch(global.rootURL + "/property/home", {
            method: "GET",
            credentials: "same-origin"
        });

        if (response.ok) {
            // console.log("ok:");
            this.propHomeList = await response.json();
            // console.log(JSON.stringify(this.propHomeList));
        } else {
            // console.log("else:");
            console.log(response.statusText);
        }

        var response = await fetch(global.rootURL + "/property/json", {
            method: "GET",
            credentials: "same-origin"
        });

        if (response.ok) {
            // console.log("ok:");
            this.propWholeList = await response.json();
            // console.log(JSON.stringify(this.propWholeList));
        } else {
            // console.log("else:");
            console.log(response.statusText);
        }
    },
    methods: {
        onPropertyTap: function(args) {
            // console.log("Item with index: " + args.index + " tapped");
            // console.log("Property selected: " + args.item.title);

            this.$navigateTo(PropertyDetail, {
                transition: {
                    // name: "slideTop",
                    // duration: 380,
                    // curve: "easeIn"
                },
                transitionIOS: {},
                transitionAndroid: {},
                props: {
                    selectedProperty: args.item,
                    isLoggedIn: this.isLoggedIn,
                    $delegate: this
                }
                // animated: true
            });
        },
        //for Tab2:Estates
        onEstateTap: function(args) {
            // console.log("Item with index: " + args.index + " tapped");
            // console.log("Estate selected: " + args.item.estate);

            this.$navigateTo(PropertyList, {
                transition: {},
                transitionIOS: {},
                transitionAndroid: {},
                props: {
                    selectedProList: this.propWholeList.filter(
                        p => p.estate == args.item.esName
                    ),
                    isLoggedIn: this.isLoggedIn,
                    $delegate: this
                }
            });
        },
        onBedroomTap: function(args) {
            // console.log("Item with index: " + args.index + " tapped");
            // console.log("Bedroom selected: " + args.item.title);
            if (args.index == 0) {
                var filteredProps = this.propWholeList.filter(
                    p => p.bedrooms <= 2
                );
                // console.log("prop: "+prop.length);
            } else if (args.index == 1) {
                var filteredProps = this.propWholeList.filter(
                    p => p.bedrooms >= 3
                );
                // console.log("prop: "+prop.length);
            }
            this.$navigateTo(PropertyList, {
                transition: {},
                transitionIOS: {},
                transitionAndroid: {},
                props: {
                    selectedProList: filteredProps,
                    isLoggedIn: this.isLoggedIn,
                    $delegate: this
                }
            });
        },
        onLoginBtnTap: async function(args) {
            if (this.isLoggedIn) {
                var response = await fetch(global.rootURL + "/user/logout", {
                    method: "POST",
                    credentials: "same-origin"
                });
                // console.log("fetch success");
                if (response.ok) {
                    this.isLoggedIn = false;

                    var data = await response.json(); // for res.ok() or res.json()
                    alert(data);
                } else if (response.status == 401) {
                    var data = await response.text(); // for res.send()
                    alert(data);
                } else {
                    alert(response.statusText);
                }
            } else {
                this.$navigateTo(PropertyLogin, {
                    transition: {},
                    transitionIOS: {},
                    transitionAndroid: {},
                    props: {
                        $delegate: this
                    }
                });
            }
        },
        onMyRentalBtnTap: async function(args) {
            var response = await fetch(
                global.rootURL + "/user/propertyOfUser",
                {
                    method: "GET",
                    credentials: "same-origin"
                }
            );
            // console.log("fetch success");

            if (response.ok) {
                this.$navigateTo(PropertyList, {
                    transition: {},
                    transitionIOS: {},
                    transitionAndroid: {},
                    props: {
                        $delegate: this,
                        isLoggedIn: this.isLoggedIn,
                        selectedProList: await response.json()
                    }
                });
            } else if (response.status == 401) {
                var data = await response.text(); // for res.send()
                alert(data);
            } else {
                alert(response.statusText);
                console.log(response.statusText);
            }
        }
    }
};
</script>

<style scoped>
.home-panel {
    vertical-align: center;
    font-size: 20;
    margin: 15;
}

.description-label {
    margin-bottom: 15;
}
</style>