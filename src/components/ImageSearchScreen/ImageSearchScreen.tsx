import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/reduxHooks';
import {fetchImages} from '../../redux/imagesSlice';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {ImageGallery} from './ImageGallery/ImageGallery';

export const ImageSearchScreen = () => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');
  const {isLoading, images: hits, isError, totalImages: totalHits, isSearchPerformed} =
    useAppSelector((state) => state.images);

  const [page, setPage] = useState(1);

  const fetchMoreImages = async () => {
    if (!isLoading && totalHits > hits.length) {
      setPage(page + 1);

      dispatch(fetchImages({q: searchText, page: page + 1}));
    }
  };

  const fetchFirstImages = async (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    const text = event?.nativeEvent?.text;
    if (text !== searchText) {
      setSearchText(text);
      setPage(1);
      dispatch(fetchImages({q: text, page: 1}));
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.searchInputContainer}>
        <View style={styles.searchInputIcon}>
          <MaterialIcons name="search" size={24} color="#999" />
        </View>

        <TextInput
          enablesReturnKeyAutomatically
          returnKeyType="search"
          style={styles.searchInput}
          onSubmitEditing={fetchFirstImages}
        />
      </View>

      {!isSearchPerformed && !isLoading && (
        <Text style={styles.emptyText}>Let's search for some cats</Text>
      )}

      {isSearchPerformed && isError && (
        <Text style={styles.emptyText}>
          Something went terribly wrong. Let's wait for some time and try
          another search
        </Text>
      )}

      {isSearchPerformed && !isError && hits.length === 0 && !isLoading && (
        <Text
          style={styles.emptyText}
        >{`Looks like photo of ${searchText} is yet to be taken`}</Text>
      )}

      {isSearchPerformed && !isError && (
        <ImageGallery fetchMoreImages={fetchMoreImages} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  searchInputContainer: {
    height: 40,
    width: 250,
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',

    borderRadius: 30,
    backgroundColor: '#fff',

    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2
  },
  searchInput: {
    flex: 1,
  },
  searchInputIcon: {
    paddingRight: 5,
    alignSelf: 'center',
  },

  emptyText: {
    fontSize: 20,
    padding: 30,
    textAlign: 'center',
  },
});
