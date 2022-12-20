import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import ResourceList from '../components/ResourceList/ResourceList';
import { unmountComponentAtNode } from 'react-dom';
import { setupStore } from '../store';
import { Provider } from 'react-redux';

let container;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
});

const store = setupStore();

it('Renders list of resources', () => {
    const exampleResourcesProp = [
        {nickname: 'Example Resource 1', type: 'SOLAR', percent_output: 100, max_output: 40, online: true, id: 1},
        {nickname: 'Example Resource 2', type: 'WIND', percent_output: 50, max_output: 80, online: true, id: 2},
        {nickname: 'Example Resource 3', type: 'COAL', percent_output: 100, max_output: 100, online: true, id: 3},
        {nickname: 'Example Resource 4', type: 'GAS', percent_output: 50, max_output: 80, online: true, id: 4}
    ];

    render(
        <Provider store={store}>
            <ResourceList resources={exampleResourcesProp} />
        </Provider>,
        container
    );

    expect(screen.getByTestId('resource-summary-1')).toBeVisible();
    expect(screen.getByTestId('resource-summary-2')).toBeVisible();
    expect(screen.getByTestId('resource-summary-3')).toBeVisible();
    expect(screen.getByTestId('resource-summary-4')).toBeVisible();
});

it('Opens new resource dialog when user presses button', async () => {
    render(
        <Provider store={store}>
            <ResourceList resources={[]} />
        </Provider>,
        container
    );

    await userEvent.click(screen.getByTestId('new-resource-button'))

    expect(screen.getByTestId('new-resource-dialog')).toBeVisible();
});
