import { StyleSheet, View, Text, ScrollView, Image, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import {images} from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';

import 'react-native-url-polyfill/auto';
import {createUser} from '../../lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const SignUp = () => {
    const { setUser, setIsLogged } = useGlobalContext();

    const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        if (!form.username || !form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all the fields');
        }

        setIsSubmitting(true);

        try {
            const result = await createUser(form.email, form.username, form.password);
            
            // set it to global state...
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
              Sign Up to Aora
            </Text>

            <FormField 
              title = "Username"
              value = {form.username}
              handleChangeText = {(e) => setForm({...form, username: e})}
              otherStyles = "mt-10"
              placeholder = "Enter your Username"
            />

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
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading = {isSubmitting}/>

            <View className = "justify-center pt-5 flex-row gap-2">
              <Text className = "text-lg text-gray-100 font-pregular">
                Have an Account Already?
              </Text>
              <Link href="/sign-in" className = "text-lg font-psemibold text-secondary">
              Sign In
              </Link>
            </View>
            
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}
export default SignUp