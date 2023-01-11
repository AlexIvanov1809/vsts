import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import teaTypeService from "../../service/teaItems/type.service";
import { AppDispatch, RootState } from "../createStore";
import { IFiltersInitialState, IFilters } from "../models/IFilters";

const initialState: IFiltersInitialState = {
  entities: null,
  isLoading: true,
  error: null,
};

const teaTypeSlice = createSlice({
  name: "teaTypes",
  initialState,
  reducers: {
    teaTypesRequested: (state) => {
      state.isLoading = true;
    },
    teaTypesReceived: (state, action: PayloadAction<IFilters[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    teaTypesRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    teaTypesCreated: (state, action: PayloadAction<IFilters>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    teaTypesRemoved: (state, action: PayloadAction<string>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    },
  },
});

const { reducer: teaTypesReducer, actions } = teaTypeSlice;
const {
  teaTypesRequested,
  teaTypesReceived,
  teaTypesRequestFailed,
  teaTypesCreated,
  teaTypesRemoved,
} = actions;

const teaTypesCreateRequested = createAction(
  "teaTypes/teaTypesCreateRequested",
);
const createTeaTypesFailed = createAction("teaTypes/createTeaTypesFailed");

export const loadTeaTypesList = () => async (dispatch: AppDispatch) => {
  dispatch(teaTypesRequested());
  try {
    const { content } = await teaTypeService.get();
    dispatch(teaTypesReceived(content));
  } catch (error) {
    dispatch(teaTypesRequestFailed((error as Error).message));
  }
};

export const teaTypesRemove =
  (itemId: string) => async (dispatch: AppDispatch) => {
    try {
      const { content } = await teaTypeService.remove(itemId);
      if (!content) {
        dispatch(teaTypesRemoved(itemId));
      }
    } catch (error) {
      dispatch(createTeaTypesFailed());
    }
  };

export const createNewTeaTypesItem =
  (payload: IFilters) => async (dispatch: AppDispatch) => {
    dispatch(teaTypesCreateRequested());
    try {
      const { content } = await teaTypeService.create(payload);
      dispatch(teaTypesCreated(content));
    } catch (error) {
      dispatch(createTeaTypesFailed());
    }
  };

export const getTeaTypesList = () => (state: RootState) =>
  state.teaTypes.entities;
export const getTeaTypesLoadingStatus = () => (state: RootState) =>
  state.teaTypes.isLoading;
export const getTeaTypesError = () => (state: RootState) =>
  state.teaTypes.error;

export default teaTypesReducer;