import userReducer from "./userReducer";

export default function rootReducer(state = {}, action) {
    // always return a new object for the root state
    return {
        // the value of `state.todos` is whatever the todos reducer returns
        user: userReducer(state.user, action),
        // For both reducers, we only pass in their slice of the state
        // filters: filtersReducer(state.filters, action),
    };
}
