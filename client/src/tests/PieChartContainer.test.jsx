import { render, screen } from '@testing-library/react';
import PieChartContainer from '../components/PieChartContainer/PieChartContainer';
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

it('should render correct percentages based on resources prop', () => {
    const exampleResourcesProp = [
        {nickname: 'Example Resource 1', type: 'SOLAR', percent_output: 100, max_output: 40, online: true, id: 1},
        {nickname: 'Example Resource 2', type: 'WIND', percent_output: 50, max_output: 80, online: true, id: 2},
        {nickname: 'Example Resource 3', type: 'COAL', percent_output: 100, max_output: 100, online: true, id: 3},
        {nickname: 'Example Resource 4', type: 'GAS', percent_output: 50, max_output: 80, online: true, id: 4}
    ];

    render(
        <PieChartContainer resources={exampleResourcesProp}>
        </PieChartContainer>,
        container
    );

    expect(screen.getByTestId('pie-chart-container')).toHaveTextContent('18%'); // 40 / 220 (same for 3 of the example resources)
    expect(screen.getByTestId('pie-chart-container')).toHaveTextContent('45%'); // 100 / 220
});
