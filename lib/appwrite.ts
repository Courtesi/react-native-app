import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    // Your configuration here
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.wenslo.unrigid',
    projectId :'672d8d7b003378bd999f',
    databaseId: '672d8fdb003c0588f97e',
    userCollectionId: '672d8fef003b5a0b11a7',
    videoCollectionId: '672d9005002c9e2172fa',
    storageId: '672d90e00035c00f71f0'
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email: string, username: string, password: string) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials();

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;

    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error("Unknown error occurred");
        }
    }
}

export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(
            email,
            password
        )
    } catch (error) {
        throw error;
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId
        )

        return posts.documents;
    } catch (error) {
        throw error;
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(7)]
        )

        // console.log(posts);

        return posts.documents;
    } catch (error) {
        throw error;
    }
}

export const searchPosts = async (query: string) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search("title", query)]
        )

        if (!posts) throw new Error("Something went wrong");

        console.log(query, posts);

        return posts.documents;
    } catch (error) {
        throw error;
    }
}

export const getUserPosts = async (userId: string) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal("creator", userId)]
        )

        if (!posts) throw new Error("Something went wrong");

        // console.log(query, posts);

        return posts.documents;
    } catch (error) {
        throw error;
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');

        return session;
    } catch (Error) {
        throw Error;
    }
}