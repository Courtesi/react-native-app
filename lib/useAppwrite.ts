import { useEffect, useState } from "react";
import { Models } from 'react-native-appwrite';
import {Alert} from "react-native";

const useAppwrite = (fn: any) => {
    const [data, setData] = useState<Array<Models.Document>>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fn();

            setData(response);
        } catch(error) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Error: an unknown error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => fetchData();

    return {data, refetch};
}

export default useAppwrite;