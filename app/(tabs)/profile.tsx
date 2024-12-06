import { Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import EmptyState from '@/components/EmptyState';
import { getUserPosts, searchPosts, signOut } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import VideoCard from '@/components/VideoCard';
import { Models } from 'react-native-appwrite';
import { router, useLocalSearchParams } from 'expo-router';
import SearchInput from '@/components/SearchInput';
import { useGlobalContext } from '@/context/GlobalProvider';
import { icons } from '@/constants';
import InfoBox from '@/components/InfoBox';


const Profile = () => {
    const {user, setUser, setIsLogged } = useGlobalContext();
    if (!user) {
        return(
            <SafeAreaView>
                <View>
                    <Text>
                        You done fucked up
                    </Text>
                </View>
            </SafeAreaView>
        );
    }
    const {data: posts} = useAppwrite(() => getUserPosts(user.$id));
    

    const logout = async () => {
        await signOut();
        setUser(null);
        setIsLogged(false);

        router.replace('/sign-in');
    }

    // console.log(query, posts);

    return (
    <SafeAreaView className = "bg-primary border-2 \
    h-full">
        <FlatList
            data = {posts}
            keyExtractor={(item:Models.Document) => item.$id}
            renderItem = {({item}) => (
                <VideoCard
                video = {item}
                />
            )}
            ListHeaderComponent = {() => (
                <View className = "w-full justify-center items-center \
                mt-6 mb-12 px-4">
                    <TouchableOpacity
                    className = "w-full items-end mb-10"
                    onPress = {logout}
                    >
                        <Image
                        source = {icons.logout}
                        resizeMode = "contain" className = "w-6 h-6"
                        />
                    </TouchableOpacity>
                    <View className = "w-16 h-16 border border-secondary \
                    rounded-lg justify-center items-center">
                        <Image source = {{uri: user?.avatar}}
                        className = "w-[90%] h-[90%] rounded-lg"
                        resizeMode = "cover" />
                    </View>

                    <InfoBox
                    title = {user?.username}
                    containerStyles = "mt-5"
                    titleStyles = "text-lg"
                    />

                    <View className = "mt-5 flex-row">
                        <InfoBox
                        title = {String(posts.length) || "0"}
                        subtitle = "Posts"
                        containerStyles = "mr-10"
                        titleStyles = "text-xl"
                        />
                        <InfoBox
                        title = "1.2k"
                        subtitle = "Followers"
                        titleStyles = "text-xl"
                        />
                    </View>
                </View>
            )}
            ListEmptyComponent = {() => (
                <EmptyState
                title = "No Videos Found"
                subtitle = "No videos found for this search query"
                />
            )}
        />
    </SafeAreaView>
    )
}

export default Profile