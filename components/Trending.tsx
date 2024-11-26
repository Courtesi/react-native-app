import { Image, View, Text, FlatList, TouchableOpacity, ImageBackground, ViewToken } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { icons } from '@/constants';
import { Video, ResizeMode, AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av';

const zoomIn = {
    0: { transform: [{ scale: 0.9 }] },
    1: { transform: [{ scale: 1.1 }] },
  };
  
  const zoomOut = {
    0: { transform: [{ scale: 1 }] },
    1: { transform: [{ scale: 0.9 }] },
  };

Animatable.initializeRegistryWithDefinitions({
    zoomIn,
    zoomOut,
});
const TrendingItem = ({activeItem, item}: {activeItem: any, item: any}) => {
    const [play, setPlay] = useState(false);

    // console.log(activeItem.$id, item.$id);
    
    return (
        <Animatable.View
        className = "mr-5"
        animation = {activeItem === item.$id ? 'zoomIn': 'zoomOut'}
        duration = {500}
        >
            {play ? (
                <Video
                source = {{uri: item.video}}
                className = "w-52 h-72 rounded-[35px] mt-3 \
                bg-white/10"
                resizeMode = {ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
                    if (status.isLoaded) {
                        const playbackStatus = status as AVPlaybackStatusSuccess;
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    } else {
                        console.log("Playback error", status.error);
                        setPlay(false);
                    }
                    
                }}
                />
            ) : (
                <TouchableOpacity
                className = "relative justify-center items-center"
                activeOpacity = {0.7}
                onPress = {() => setPlay(true)}
                >
                    <ImageBackground
                    source = {{uri: item.thumbnail}}
                    className = "w-52 h-72 rounded-[35px] \
                    my-5 overflow-hidden shadow-lg\
                    shadow-black/40"
                    resizeMode = "cover"
                    />

                    <Image
                    source = {icons.play}
                    className = "w-12 h-12 absolute"
                    resizeMode = "contain"
                    />

                </TouchableOpacity>
                    
            )}
            
        </Animatable.View>
    )
}
const Trending = ({posts}: {posts: any}) => {
    const [activeItem, setActiveItem] = useState(posts[1]);

    const viewableItemsChanged = ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    }

    return (
    <FlatList
    data = {posts}
    keyExtractor={(item: any) => item.$id}
    renderItem = {({item}) => (
        <TrendingItem
        activeItem={activeItem}
        item = {item}
        />
    )}
    onViewableItemsChanged={viewableItemsChanged}
    viewabilityConfig={{
        itemVisiblePercentThreshold: 70
    }}
    contentOffset = {{x: 170, y: 0}}
    horizontal
    />
    )
}

export default Trending