import axios from "axios";

export const loginUser = (userData) => (dispatch) => {
    axios
        .post("http://localhost:5000/users/login", userData)
        .then((res) => {
            if (res.data) {
                console.log("Successful login" + res.data);
                dispatch({ type: "LOGIN", payload: res.data });

                // dispatch({ type: CLEAR_ERRORS });
                // console.log(res.data.token);
                // window.localStorage.setItem("access_token", res.data.token);
            } else if (res.data.status === 401) {
                console.log("Username/password incorrect");
            }
        })
        .catch((err) => {
            // dispatch({ type: SET_ERRORS, payload: err.response.data });
        });
};

export const logout = () => (dispatch) => {
    localStorage.setItem("appState", null);
    dispatch({ type: "LOGOUT" });

    // dispatch({ type: CLEAR_ERRORS });
    // console.log(res.data.token);
    // window.localStorage.setItem("access_token", res.data.token);
};
