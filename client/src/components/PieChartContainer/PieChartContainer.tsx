import { Paper } from '@mui/material';
import ReactTooltip from 'react-tooltip';
import { PieChart } from 'react-minimal-pie-chart';
import { Resource } from '../../types/resource';
import { getCurrentOutput, getCurrentTotalOutput, isCarbonNeutral } from '../../util';

import styles from './PieChartContainer.module.scss';
import { useState } from 'react';

interface PieChartContainerProps {
  resources: Resource[];
}

function PieChartContainer(props: PieChartContainerProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const data = [...props.resources].sort((r1, r2) => r1.id - r2.id).map(resource => (
    {
      title: resource.nickname,
      value: getCurrentOutput(resource),
      color: isCarbonNeutral(resource.type) ? '#4caf50' : '#1976D2',
    }
  ));

  return (
    <Paper className={styles['pie-chart-container']} data-tip="" data-for="chart">
      <ReactTooltip
        id="chart"
        getContent={() => {
          if (typeof hovered === 'number') {
            const curr = data[hovered];
            return (
              <span>{curr.title}<br />{curr.value} kW</span>
            )
          }
        }}
      />
      <PieChart
        data={data}
        lineWidth={40}
        onMouseOver={(_, index) => {
          setHovered(index);
        }}
        onMouseOut={() => {
          setHovered(null);
        }}
        label={({ dataEntry }) => dataEntry.percentage > 1 ? Math.round(dataEntry.percentage) + '%' : ''}
        labelStyle={{
          fill: 'white',
          fontSize: '5px',
        }}
        radius={50}
        startAngle={270}
        labelPosition={80}
        totalValue={getCurrentTotalOutput(props.resources)}
        animate={true}
        paddingAngle={1}
      />
    </Paper>
  );
}

export default PieChartContainer;
