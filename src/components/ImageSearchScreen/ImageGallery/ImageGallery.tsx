import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import {Image, ListRenderItemInfo, TouchableNativeFeedback} from 'react-native';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ImageHit} from '../../../services/pixabayService/pixabayConstants';
import {useAppSelector} from '../../../redux/reduxHooks';
import {RootState} from '../../../redux/store';
import {
  AppScreens,
  NavigationParams,
} from '../../Navigation/navigationConstants';

export type ImageGalleryProps = {
  fetchMoreImages: () => Promise<void>;
};

export const ImageGallery = ({fetchMoreImages}: ImageGalleryProps) => {
  const {
    images: hits,
    totalImages: totalHits,
    isLoading,
  } = useAppSelector((state: RootState) => state.images);
  const {navigate} =
    useNavigation<StackNavigationProp<NavigationParams, AppScreens.Gallery>>();

  const renderFlatListImage = useMemo(
    () =>
      ({item}: ListRenderItemInfo<ImageHit>) =>
        (
          <TouchableNativeFeedback
            onPress={() => navigate(AppScreens.Details, {imageId: item.id})}
          >
            <View style={styles.imageWrapper}>
              <Image
                style={[styles.image]}
                key={item.id}
                source={{
                  uri: item.previewURL,
                  width: item.previewWidth,
                  height: item.previewHeight,
                }}
                resizeMode="cover"
                resizeMethod="scale"
              />
            </View>
          </TouchableNativeFeedback>
        ),
    []
  );

  return (
    <FlatList
      removeClippedSubviews
      showsVerticalScrollIndicator={false}
      data={hits}
      maxToRenderPerBatch={20}
      numColumns={2}
      horizontal={false}
      renderItem={renderFlatListImage}
      contentContainerStyle={styles.root}
      onEndReachedThreshold={0.25}
      onEndReached={fetchMoreImages}
      ListFooterComponent={
        <View style={styles.footer}>
          {hits.length >= totalHits && !isLoading && totalHits !== 0 && (
            <View style={styles.footerTextContainer}>
              <Text>Looks like you've scrolled through all the items</Text>
            </View>
          )}

          {isLoading && (
            <ActivityIndicator size="large" style={styles.loader} />
          )}
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  root: {
    paddingBottom: 20,
  },

  footer: {
    marginTop: 30,
  },

  footerTextContainer: {
    paddingTop: 10,
    flexGrow: 1,
    borderTopWidth: 1,
    borderTopColor: '#999',
  },

  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  imageWrapper: {
    margin: 5,

    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },

  loader: {
    paddingVertical: 15,
  },
});
