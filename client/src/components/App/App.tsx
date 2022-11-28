import { Alert, Box, CircularProgress } from '@mui/material';

import { useGetAllResourcesQuery } from '../../services/resource';

import ResourceList from '../ResourceList/ResourceList';
import InfoPanel from '../InfoPanel/InfoPanel';

import styles from './App.module.scss';
import PieChartContainer from '../PieChartContainer/PieChartContainer';

function App() {
  const { data, error, isLoading } = useGetAllResourcesQuery('');

  return (
    <Box className={styles.app}>
      <Box className={styles.header}>
        <h1>Grid Manager</h1>
      </Box>
      {isLoading && <CircularProgress />}
      {error && <Alert variant="filled" severity='error'>Oops! Something went wrong.</Alert>}
      {data && (
        <Box className={styles.dashboard}>
          <ResourceList resources={data}/>
          <PieChartContainer resources={data}/>
          <InfoPanel resources={data}/>
        </Box>
      )}
    </Box>
  );
}

export default App;
