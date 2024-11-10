import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import {icons} from "../constants";

interface FormFieldProps {
    title: string; // Title of the form field
    value: string; // The value of the input field
    placeholder?: string;
    handleChangeText: (text: string) => void; // Function to handle text input change
    otherStyles?: string; // Optional custom styles for the container or input
    // Add any additional props if needed, e.g. for custom error messages, or accessibility props
    [key: string]: any; // This allows you to accept any additional props with arbitrary keys (optional)
}

const FormField: React.FC<FormFieldProps> = ({title,value,placeholder,handleChangeText,otherStyles,...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">
            {title}
            </Text>

            <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
            <TextInput
                className="flex-1 text-white font-psemibold text-base"
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
                secureTextEntry={title === 'Password' && !showPassword}
            />

            {title === 'Password' && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={!showPassword ? icons.eye : icons.eyeHide }
                className = "w-6 h-6"
                resizeMode='contain'/>
                </TouchableOpacity>
            )}
            </View>
        </View>
    )
}

export default FormField