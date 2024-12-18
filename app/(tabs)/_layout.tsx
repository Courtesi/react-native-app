import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Text, View, Image, StatusBar } from 'react-native';

import {icons} from '../../constants';
import { useGlobalContext } from "../../context/GlobalProvider";
// import Loader from "@/components/Loader";

const TabIcon = ({icon, color, name, focused}: {icon: any, color: string, name: string, focused: boolean}) => {
    return (
        <View className = "w-16 flex items-center justify-center gap-">
            <Image
                source = {icon}
                resizeMode = "contain"
                tintColor={color}
                className="w-6 h-6"
            />
            <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
            style = {{color: color}}>
                {name}
            </Text>
        </View>
    )
}
export default function TabLayout() {
    const { loading, isLogged } = useGlobalContext();

    if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
        <Tabs
        screenOptions={{
            tabBarActiveTintColor: "#FFA001",
            tabBarInactiveTintColor: "#CDCDE0",
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: "#161622",
                borderTopWidth: 1,
                borderTopColor: "#232533",
                height: 84,
            },
        }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.home}
                            color={color}
                            name="Home"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="bookmark"
                options={{
                    title: 'Bookmark',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.bookmark}
                            color={color}
                            name="Bookmark"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'Create',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.plus}
                            color={color}
                            name="Create"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.profile}
                            color={color}
                            name="Profile"
                            focused={focused}
                        />
                    )
                }}
            />
        </Tabs>

        {/* <Loader isLoading={loading} /> */}
        <StatusBar backgroundColor="#161622"/>
    </>
    
    );
}
