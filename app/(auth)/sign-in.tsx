import { StyleSheet, View, Text, ScrollView, Image, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import {images} from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser, getCurrentUser, signIn } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const SignIn = () => {
    const { setUser, setIsLogged } = useGlobalContext();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const submit = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all the fields');
        }

        setIsSubmitting(true);

        try {
            await signIn(form.email, form.password)

            // set it to global state...
            const result = await getCurrentUser();
            setUser(result);
            setIsLogged(true);
            router.replace('/home');
            
        } catch (error) {
            if (error instanceof Error) {
            Alert.alert('Error', error.message);
            } else {
            Alert.alert('Error', 'An unknown error occurred');
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView>
            <View className="w-full flex justify-center min-h-[85vh] px-4 my-6">

            <Image
            source={images.logo}
            resizeMode="contain"
            style = {{width: 115, height: 34}}
            />

            <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
                Log in to Aora
            </Text>

            <FormField 
                title = "Email"
                value = {form.email}
                handleChangeText = {(e) => setForm({...form, email: e})}
                otherStyles = "mt-7"
                keyboardType = "email-address"
                placeholder = "Enter your Email"
            />

            <FormField 
                title = "Password"
                value = {form.password}
                handleChangeText = {(e) => setForm({...form, password: e})}
                otherStyles = "mt-7"
                placeholder = "Enter your Password"
            />

            <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading = {isSubmitting}/>

            <View className = "justify-center pt-5 flex-row gap-2">
                <Text className = "text-lg text-gray-100 font-pregular">
                Don't have an account?
                </Text>
                <Link href="/sign-up" className = "text-lg font-psemibold text-secondary">
                Sign Up
                </Link>
            </View>
            
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}
export default SignIn