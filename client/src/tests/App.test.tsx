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

//   expect(sgetByText(/learn/i)).toBeInTheDocument();
// });
