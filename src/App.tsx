import ZustandCounter from './components/ZustandCounter';
import ReduxCounter from './components/ReduxCounter';
import ZustandUsers from './components/ZustandUsers';
import ReduxUsers from './components/ReduxUsers';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
    return (
        <Provider store={store}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '2rem' }}>
                <div>
                    <ZustandCounter />
                    <ZustandUsers />
                </div>
                <div>
                    <ReduxCounter />
                    <ReduxUsers />
                </div>
            </div>
        </Provider>
    );
}

export default App;