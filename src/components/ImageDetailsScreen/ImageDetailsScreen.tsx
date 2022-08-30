import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect, useMemo} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {AppScreens, NavigationParams} from '../Navigation/navigationConstants';
import {
  addOrientationChangeListener,
  getOrientationAsync,
  Orientation,
} from 'expo-screen-orientation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useAppSelector} from '../../redux/reduxHooks';

export const ImageDatilsScreen = () => {
  const [isPortrait, setIsPortrait] = useState(true);
  const styles = useMemo(() => getStyles(isPortrait), [isPortrait]);

  useEffect(() => {
    try {
      getOrientationAsync().then((orientation) =>
        setIsPortrait(orientation === Orientation.PORTRAIT_UP)
      );
    } catch (e) {}
  }, []);

  useEffect(() => {
    const sub = addOrientationChangeListener((event) => {
      const orientation = event?.orientationInfo?.orientation;

      setIsPortrait(orientation === Orientation.PORTRAIT_UP);
    });

    return sub?.remove;
  }, []);

  const route = useRoute<RouteProp<NavigationParams, AppScreens.Details>>();
  const navigation = useNavigation();
  const image = useAppSelector((state) =>
    state.images?.images?.find((hit) => hit.id === route.params?.imageId)
  );
  const imageTags = useMemo(() => image.tags.split(', '), []);

  return (
    <View style={styles.root}>
      <View style={styles.backButtonContainer}>
        <TouchableNativeFeedback onPress={navigation.goBack}>
          <MaterialIcons name="close" size={30} color="#000" />
        </TouchableNativeFeedback>
      </View>

      <Image
        style={styles.image}
        source={{
          uri: image?.largeImageURL,
          width: image?.imageWidth,
          height: image?.imageHeight,
        }}
      />

      <View style={styles.details}>
        <Text
          style={styles.resolution}
        >{`Resolution — ${image.imageWidth} x ${image.imageHeight}`}</Text>

        <View style={styles.tags}>
          {imageTags.map((tag) => (
            <View style={styles.tag} key={tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <View>
          <Text style={styles.uploadedByText}>Uploaded By</Text>
          <Text style={[styles.uploadedByText, styles.author]}>
            {image.user}
          </Text>
        </View>
      </View>
    </View>
  );
};

const getStyles = (isPortrait: boolean) =>
  StyleSheet.create({
    root: {
      position: 'relative',
      flex: 1,
      flexDirection: isPortrait ? 'column' : 'row',
    },

    backButtonContainer: {
      position: 'absolute',
      top: 30,
      left: 10,
      zIndex: 10,
      width: 36,
      height: 36,
      marginHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff99',
      borderRadius: 20,
    },

    image: {
      width: isPortrait ? '100%' : null,
      height: isPortrait ? '100%' : null,
      flex: 2,
      backgroundColor: '#999',
    },
    details: {
      flex: 2,
      padding: 20,
    },

    resolution: {
      fontSize: 18,
      fontWeight: '600',
    },

    tags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 5,
      marginBottom: 15,
    },

    tag: {
      height: 30,
      paddingHorizontal: 15,
      marginRight: 10,
      marginTop: 5,

      backgroundColor: '#fb4e18',
      borderRadius: 15,
    },

    tagText: {
      color: '#fff',
      lineHeight: 28,
    },

    uploadedByText: {
      fontSize: 15,
    },

    author: {
      fontWeight: '600',
    },
  });
