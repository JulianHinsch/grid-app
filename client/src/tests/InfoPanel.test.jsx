import { render, screen } from '@testing-library/react';
import InfoPanel from '../components/InfoPanel/InfoPanel';
import { unmountComponentAtNode } from 'react-dom';

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

it('should render correct totals based on resources prop', () => {
    const exampleResourcesProp = [
        {nickname: 'Example Resource 1', type: 'SOLAR', percent_output: 100, max_output: 40, online: true, id: 1},
        {nickname: 'Example Resource 2', type: 'WIND', percent_output: 50, max_output: 80, online: true, id: 1},
        {nickname: 'Example Resource 3', type: 'COAL', percent_output: 100, max_output: 100, online: true, id: 1},
        {nickname: 'Example Resource 4', type: 'GAS', percent_output: 50, max_output: 80, online: true, id: 1}
    ];

    render(
        <InfoPanel resources={exampleResourcesProp}>
        </InfoPanel>,
        container
    );

    expect(screen.getByTestId('output')).toHaveTextContent('220 kW');
    expect(screen.getByTestId('max-output')).toHaveTextContent('300 kW');
    expect(screen.getByTestId('carbon-neutral-output')).toHaveTextContent('80 kW');
    expect(screen.getByTestId('max-carbon-neutral-output')).toHaveTextContent('120 kW');
});
