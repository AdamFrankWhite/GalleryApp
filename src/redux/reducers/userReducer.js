const initialState = {
    username: null,
    email: null,
    token: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN": {
            return {
                // Again, one less level of nesting to copy
                ...state,
                username: action.payload.username,
                email: action.payload.email,
                token: action.payload.token,
            };
        }
        case "LOGOUT": {
            return {
                // Again, one less level of nesting to copy
                initialState,
            };
        }
        default:
            return state;
    }
}
