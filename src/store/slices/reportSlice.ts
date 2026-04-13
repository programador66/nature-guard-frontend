import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ReportDraft {
  title: string;
  name: string;
  description: string;
  types: string[];
  address: string;
  lat: number | null;
  lng: number | null;
}

interface ReportState {
  draft: ReportDraft | null;
  pendingSubmit: boolean;
}

const initialState: ReportState = {
  draft: null,
  pendingSubmit: false,
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    saveStep1(
      state,
      action: PayloadAction<
        Pick<ReportDraft, "title" | "name" | "description" | "types">
      >
    ) {
      state.draft = {
        title: action.payload.title,
        name: action.payload.name,
        description: action.payload.description,
        types: action.payload.types,
        address: state.draft?.address ?? "",
        lat: state.draft?.lat ?? null,
        lng: state.draft?.lng ?? null,
      };
    },
    saveStep2(
      state,
      action: PayloadAction<Pick<ReportDraft, "address" | "lat" | "lng">>
    ) {
      if (state.draft) {
        state.draft.address = action.payload.address;
        state.draft.lat = action.payload.lat;
        state.draft.lng = action.payload.lng;
      }
      state.pendingSubmit = true;
    },
    clearDraft(state) {
      state.draft = null;
      state.pendingSubmit = false;
    },
  },
});

export const { saveStep1, saveStep2, clearDraft } = reportSlice.actions;
export default reportSlice.reducer;
