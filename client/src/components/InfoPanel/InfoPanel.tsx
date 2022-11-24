import { Resource } from '../../types/resource';
import { getResourceOutput, isCarbonNeutral } from '../../util';
import styles from './InfoPanel.module.scss';

interface InfoPanelProps {
    resources: Resource[],
}

function InfoPanel(props: InfoPanelProps) {

    console.log(props);
  const getMaxOutput = (resources: Resource[]) => {
    let ret = 0;
    resources.forEach(resource => {
        console.log(resource.max_output);
        ret += resource.max_output;
    });
    return ret;
  }

  const getCurrentOutput = (resources: Resource[]) => {
    let ret = 0;
    resources.forEach(resource => {
        ret += getResourceOutput(resource);
    });
    return ret;
  }

  const getMaxCarbonNeutralOutput = (resources: Resource[]) => {
    const carbonNeutralResources = resources.filter(r => isCarbonNeutral(r.type));
    return getMaxOutput(carbonNeutralResources);
  }

  const getCarbonNeutralOutput = (resources: Resource[]) => {
    const carbonNeutralResources = resources.filter(r => isCarbonNeutral(r.type));
    return getCurrentOutput(carbonNeutralResources);
  }

  return (
    <div className={styles['info-panel']}>
        <h2 className={styles.heading}>Statistics</h2>
        <div className={styles.row}>
            <span className={styles.label}>Current Output</span>
            <span className={styles.value}>{getCurrentOutput(props.resources)} kW</span>
        </div>
        <div className={styles.row}>
            <span className={styles.label}>Max Output</span>
            <span className={styles.value}>{getMaxOutput(props.resources)} kW</span>
        </div>
        <div className={styles.row}>
            <span className={styles.label}>Carbon Neutral Output</span>
            <span className={styles.value}>{getCarbonNeutralOutput(props.resources)} kW</span>
        </div>
        <div className={styles.row}>
            <span className={styles.label}>Max Carbon Neutral Output</span>
            <span className={styles.value}>{getMaxCarbonNeutralOutput(props.resources)} kW</span>
        </div>
    </div>
  );
}

export default InfoPanel;
