import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import { Post, Tag, Theme, User } from "shared/types"
import { AxiosListResponse } from "services/api/config"
import { BASE, TAGS } from "services/api"

export interface MainState {
    user: User | null
    isLoggedIn: boolean

    flows: Theme[]

    readingNow: Post[]

    tags: Tag[]
}

const initialState: MainState = {
    user: null,
    isLoggedIn: false,
    flows: [],
    readingNow: [],
    tags: []
}

export const fetchFlows = createAsyncThunk("flows/fetchFlows", () =>
    BASE.getFlows().then((res: AxiosResponse<Theme[]>) => res.data)
)

export const fetchReadingNow = createAsyncThunk(
    "readingNow/fetchReadingNow",
    () =>
        BASE.getReadingNow().then((res: AxiosListResponse<Post>) =>
            res.data.results.slice(0, 5)
        )
)

export const fetchTags = createAsyncThunk("tags/fetchTags", () =>
    TAGS.getList().then((res) => res.data)
)

export const mainSlice = createSlice({
    name: "main",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchFlows.fulfilled, (state, action) => {
            state.flows = action.payload
        })

        builder.addCase(fetchReadingNow.fulfilled, (state, action) => {
            state.readingNow = action.payload
        })

        builder.addCase(fetchTags.fulfilled, (state, action) => {
            state.tags = action.payload
        })
    },
    reducers: {}
})

// Action creators are generated for each case reducer function

export default mainSlice.reducer
