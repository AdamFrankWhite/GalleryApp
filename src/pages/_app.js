import "@/styles/globals.css";
import Layout from "@/components/Layout";
import NavBar from "@/components/NavBar";
import { Provider } from "react-redux";
import configureStore from "../redux/configureStore";
import { saveState } from "../redux/localStorage";
const store = configureStore();
store.subscribe(() => {
    saveState({
        /* example state */
        user: store.getState().user,
        // total:store.getState().total,
    });
});
export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Layout>
                <NavBar />
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}
