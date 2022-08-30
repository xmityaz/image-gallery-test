import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ImageSearchScreen} from '../ImageSearchScreen/ImageSearchScreen';
import {ImageDatilsScreen} from '../ImageDetailsScreen/ImageDetailsScreen';
import {StyleSheet} from 'react-native';
import {AppScreens, NavigationParams} from './navigationConstants';

const MainStack = createStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer<NavigationParams>>
      <MainStack.Navigator initialRouteName={AppScreens.Gallery}>
        <MainStack.Screen
          name={AppScreens.Gallery}
          component={ImageSearchScreen}
          options={{
            headerTitle: 'Image Gallery',
          }}
        />
        <MainStack.Screen
          name={AppScreens.Details}
          options={{
            headerMode: 'screen',
            presentation: 'modal',
            headerBackTitleVisible: false,
            headerTransparent: true,
            headerTitle: '',
            headerBackImage: () => null,
          }}
          component={ImageDatilsScreen}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    width: 36,
    height: 36,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff99',
    borderRadius: 20,
  },
});
