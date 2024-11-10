import React from "react";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";

import { images } from "../constants";
import  Loader  from "@/components/Loader";
import  {useGlobalContext}  from "@/context/GlobalProvider";
import CustomButton from "@/components/CustomButton";

import "../global.css";
import 'react-native-url-polyfill/auto'

const Welcome: React.FC = () => {
    const { loading, isLogged } = useGlobalContext();

    if (!loading && isLogged) return <Redirect href="/home" />;

    return (
    <SafeAreaView style={{ height: '100%', flex: 1, backgroundColor: "#161622" }}>
        {/* <Loader isLoading={loading} /> */}

        <StatusBar backgroundColor="#161622" style="light" />

        <ScrollView contentContainerStyle={{ height:'100%'}}>
        <View
            style={{
            flex: 1,
            width: '100%',
            justifyContent: "center",
            alignItems: "center",
            height: '100%',
            paddingHorizontal: 16,
            }}
        >
            <Image
            source={images.logo}
            style={{ width: 130, height: 84, marginBottom: 16 }}
            resizeMode="contain"
            />

            <Image
            source={images.cards}
            style={{ width: "100%", height: 298, maxWidth: 380, marginBottom: 16 }}
            resizeMode="contain"
            />

            <View style={{ marginTop: 20, alignItems: "center", position: "relative" }}>
            <Text
                style={{
                fontSize: 24,
                color: "#FFFFFF",
                fontWeight: "bold",
                textAlign: "center",
                }}
            >
                Discover Endless{"\n"}Possibilities with{" "}
                <Text className = "text-secondary">Aora</Text>
            </Text>

            <Image
                source={images.path}
                style={{
                width: 136,
                height: 15,
                position: "absolute",
                bottom: -8,
                right: -32,
                }}
                resizeMode="contain"
            />
            </View>

            <Text
            style={{
                fontSize: 14,
                color: "#B0B0B0",
                textAlign: "center",
                marginTop: 28,
                lineHeight: 20,
            }}
            >
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
            </Text>

            <CustomButton
            title = "Continue with Email"
            handlePress ={() => router.push('/sign-in')}
            containerStyles = "w-full mt-7"
            />
        </View>
        </ScrollView>

        <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
    );
};

export default Welcome;