import { Resource } from '../../types/resource';
import { Box, Paper, Typography } from "@mui/material";
import {
    isCarbonNeutral,
    getMaxTotalOutput,
    getCurrentTotalOutput
} from '../../util';
import styles from './InfoPanel.module.scss';

interface InfoPanelProps {
    resources: Resource[],
}

function InfoPanel(props: InfoPanelProps) {
  const getMaxCarbonNeutralOutput = (resources: Resource[]) => {
    const carbonNeutralResources = resources.filter(r => isCarbonNeutral(r.type));
    return getMaxTotalOutput(carbonNeutralResources);
  }

  const getCarbonNeutralOutput = (resources: Resource[]) => {
    const carbonNeutralResources = resources.filter(r => isCarbonNeutral(r.type));
    return getCurrentTotalOutput(carbonNeutralResources);
  }

  return (
    <Box className={styles['info-panel']}>
        <Box className={styles.header}>
            <h2 className={styles.heading}>Stats</h2>
        </Box>
        <Paper className={styles.info}>
            <Box className={styles.column}>
                <Typography sx={{ fontSize: '14px', color: 'text.secondary' }}>
                  Current Output
                </Typography>
                <Typography className={styles.value} data-testid="output">
                  {getCurrentTotalOutput(props.resources)} kW
                </Typography>
                <Typography sx={{ fontSize: '14px', color: 'text.secondary' }}>
                  Max Output
                </Typography>
                <Typography className={styles.value} data-testid="max-output">
                  {getMaxTotalOutput(props.resources)} kW
              </Typography>
            </Box>
            <Box className={styles.column}>
                <Typography sx={{ fontSize: '14px', color: 'text.secondary' }}>
                  Current Carbon Neutral Output
                </Typography>
                <Typography className={styles.value} data-testid="carbon-neutral-output">
                  {getCarbonNeutralOutput(props.resources)} kW
                </Typography>
                <Typography sx={{ fontSize: '14px', color: 'text.secondary' }}>
                  Max Carbon Neutral Output
                </Typography>
                <Typography className={styles.value} data-testid="max-carbon-neutral-output">
                  {getMaxCarbonNeutralOutput(props.resources)} kW</Typography>
            </Box>
        </Paper>
    </Box>
  );
}

export default InfoPanel;
