import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Comment } from './types';

interface CommentsState {
  allComments: Comment[];
  loading: boolean;
  error?: string;
}

const initialState: CommentsState = {
  allComments: [],
  loading: false,
  error: undefined,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (): Promise<Comment[]> => {
    // already preparing application to support real api requests
    try {
      const response = await require('../../../assets/mockApi.json');
      return response;
    } catch (e) {
      return Promise.reject(e);
    }
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state: CommentsState, action: PayloadAction<Comment>) => {
      state.allComments = [...state.allComments, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.allComments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addComment } = commentsSlice.actions;

export default commentsSlice.reducer;
