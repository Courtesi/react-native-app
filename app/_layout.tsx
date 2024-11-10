import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useColorScheme } from '@/hooks/useColorScheme';
import GlobalProvider from '@/context/GlobalProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//     </ThemeProvider>
//   );
// }



const RootLayout = () => {
	return (
		<GlobalProvider>
			<Stack>
				<Stack.Screen name="index" options={{
					headerShown: false
				}}/>
				<Stack.Screen name="(auth)" options={{
					headerShown: false
				}}/>
				<Stack.Screen name="(tabs)" options={{
					headerShown: false
				}}/>
				{/* <Stack.Screen name="/search/[query]" options={{
					headerShown: false
				}}/> */}
			</Stack>
		</GlobalProvider>
		
	)
}

export default RootLayout