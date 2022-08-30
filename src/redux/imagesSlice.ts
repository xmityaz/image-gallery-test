import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ImageHit} from '../services/pixabayService/pixabayConstants';
import {
  MinimlPixabeyRequest,
  pixabayService,
} from '../services/pixabayService/pixabayService';

export const fetchImages = createAsyncThunk(
  'images/serch',
  async (params: MinimlPixabeyRequest, thunkAPI) => {
    try {
      const imagesReponse = await pixabayService.searchImages(params);

      return {...imagesReponse, page: params?.page};
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// redux-toolkit query could be used. But it does not have a good support for infinite scroll.
// Using it for this task would result in redux being totally redundant
const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    isSearchPerformed: false,
    isLoading: false,
    isError: false,
    images: [] as ImageHit[],
    totalImages: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchImages.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(fetchImages.pending, (state, action) => {
      if (action?.meta?.arg?.page === 1) {
        state.images = [];
      }
      state.isSearchPerformed = true;
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.isLoading = false;

      state.images =
        action.payload.page === 1
          ? action.payload.hits
          : [...state.images, ...action.payload.hits];

      state.totalImages = action.payload.totalHits;
    });
  },
});

export const imagesReducer = imagesSlice.reducer;
