import { Resource } from "../../types/resource";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  Slider
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './ResourceDetail.module.scss';
import React, { useState } from "react";

import {
  useUpdateResourceMutation,
  useDeleteResourceMutation
} from "../../services/resource";

interface ResourceDetailProps {
  resource: Resource,
}

function ResourceDetail(props: ResourceDetailProps) {
  const [currentOutputPercent, setCurrentOutputPercent] = useState(props.resource.percent_output)
  const [ deleteDialogOpen, setDeleteDialogOpen ] = useState(false);
  const [ deleteResource, { isLoading: isDeleting } ] = useDeleteResourceMutation();
  const [ updateResource ] = useUpdateResourceMutation();

  const handleSliderChange = (e: Event, newVal: number | number[]) => {
    const roundedPercent = Math.round(newVal as number);
    setCurrentOutputPercent(roundedPercent);
  }

  const handleSliderChangeCommitted = async (e: Event | React.SyntheticEvent, newVal: number | number[]) => {
    await updateResource({
      id: props.resource.id,
      data: { percent_output: Math.round(newVal as number) },
    });
  }

  const handleOnlineChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await updateResource({
      id: props.resource.id,
      data: { online: !props.resource.online },
    });
  };

  const handleDeleteClick = async () => {
    await deleteResource(props.resource.id)
    setDeleteDialogOpen(false);
  }

  return (
    <Box className={styles['resource-detail']}>
      <Box className={styles.output}>
        {currentOutputPercent} %
        <Slider
          value={currentOutputPercent}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderChangeCommitted}
          min={0}
          max={100}
          marks={[{ value: 0, label: '0%' }, { value: 100, label: '100%' }]}/>
      </Box>
      <Box className={styles.footer}>
        <FormControlLabel
          label="Online"
          control={
            <Switch
              checked={!!props.resource.online}
              onChange={handleOnlineChange} />
          } />
        <IconButton onClick={() => setDeleteDialogOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Dialog
        open={deleteDialogOpen}
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this resource?"}
        </DialogTitle>
        <DialogActions>
          <Button
            sx={{textTransform: "none"}}
            onClick={() => setDeleteDialogOpen(false)}
          >
              Cancel
          </Button>
          <Button
            disabled={isDeleting}
            variant="contained"
            sx={{textTransform: "none"}}
            color="error"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ResourceDetail;
