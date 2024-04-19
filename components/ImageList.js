import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const ImageList = ({ images }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>

                        <View style={styles.userContainer}>
                            <Text style={styles.username}>{item.user}</Text>

                            <View style={styles.likesContainer}>
                                <Image source={require('./assets/heart.png')} style={styles.likeImage}></Image>
                                <Text style={styles.likes}>{item.likes} likes</Text>
                            </View>
                        </View>

                        <Image
                            source={{ uri: item.webformatURL }}
                            style={styles.image}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
        marginRight: 10,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black'
    },
    userContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: 300,
        paddingVertical: 10
    },
    likesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    },
    likeImage: {
        width: 10,
        height: 10, marginRight: 5
    },
    likes: {
        color: '#666',
    },
});

export default ImageList;
