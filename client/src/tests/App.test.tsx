import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../store';
import App from '../components/App/App';

const store = setupStore();

// test('renders learn react link', () => {
//   const { getByText } = render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );

//   expect(getByText(/learn/i)).toBeInTheDocument();
// });

it('Renders loading spinner until data is loaded', () => {
    // TODO
});

it('Renders error alert if data fetch fails', () => {
    // TODO
});

it('Renders dashboard if data fetch succeeds', () => {
    // TODO
});
