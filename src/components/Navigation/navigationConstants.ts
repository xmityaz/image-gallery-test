export enum AppScreens {
  Details = 'details',
  Gallery = 'gallery',
}

export type NavigationParams = {
  [AppScreens.Gallery]: null;
  [AppScreens.Details]: {imageId: number};
};
