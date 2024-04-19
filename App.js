import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import ImageList from './components/ImageList';

const API_KEY = '43440732-7cf74c312eeec2ee91b1c9c1f';

export default function App() {
  const [images, setImages] = useState([]);
  const [isOnline, setIsOnline] = useState(true); // Assume online by default

  useEffect(() => {
    // Check network connectivity
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });

    loadImages();

    return () => {
      unsubscribe();
    };
  }, []);

  const loadImages = async () => {
    try {
      if (isOnline) {
        // If online, fetch new images from API
        const response = await axios.get(
          `https://pixabay.com/api/?key=${API_KEY}&q=landscape&image_type=photo`
        );
        const fetchedImages = response.data.hits;
        setImages(fetchedImages);
        await AsyncStorage.setItem('images', JSON.stringify(fetchedImages));
      } else {
        // If offline, load images from local storage
        const offlineImages = await AsyncStorage.getItem('images');
        if (offlineImages) {
          setImages(JSON.parse(offlineImages));
        }
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  return (
    <View style={styles.container}>
      {images.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        <ImageList images={images} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
