import { legacy_createStore as createStore } from "redux"

const configureStore = () => {
    const store = createStore(reducers)
}