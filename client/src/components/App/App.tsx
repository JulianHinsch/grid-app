import { Alert, CircularProgress } from '@mui/material';

import { useGetAllResourcesQuery } from '../../services/resource';

import ResourceList from '../ResourceList/ResourceList';
import InfoPanel from '../InfoPanel/InfoPanel';

import styles from './App.module.scss';
import PieChartContainer from '../PieChartContainer/PieChartContainer';

function App() {
  const { data, error, isLoading } = useGetAllResourcesQuery('');

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1>Grid Manager</h1>
      </div>
      {isLoading && <CircularProgress />}
      {error && <Alert variant="filled" severity='error'>Oops! Something went wrong.</Alert>}
      {data && (
        <div className={styles.dashboard}>
          <ResourceList resources={data}/>
          <PieChartContainer resources={data}/>
          <InfoPanel resources={data}/>
        </div>
      )}
    </div>
  );
}

export default App;
