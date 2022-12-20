import { useState } from 'react';
import Resource from '../ResourceDetail/ResourceDetail';
import NewResourceDialog from '../NewResourceDialog/NewResourceDialog';
import { Resource as ResourceType } from '../../types/resource';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Button,
    Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from './ResourceList.module.scss';
import { getCurrentOutput } from '../../util';

interface ResourceListProps {
    resources: ResourceType[],
}

function ResourceList(props: ResourceListProps) {
    const [newResourceDialogOpen, setNewResourceDialogOpen] = useState(false);

    const handleNewResourceClick = () => {
        setNewResourceDialogOpen(true);
    }

    const handleNewResourceDialogClose = () => {
        setNewResourceDialogOpen(false);
    }

    return (
        <Box className={styles['resource-list']}>
            <Box className={styles.header}>
                <h2 className={styles.heading}>
                    Resources
                </h2>
                <Button
                    variant="contained"
                    disableElevation
                    onClick={handleNewResourceClick}
                    sx={{textTransform: "none"}}
                    data-testid="new-resource-button">
                        New Resource
                </Button>
            </Box>
            <NewResourceDialog
                open={newResourceDialogOpen}
                handleClose={handleNewResourceDialogClose}/>
            {[...props.resources].sort((r1, r2) => r1.id - r2.id).map((resource, idx) => (
                <Accordion key={idx}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        data-testid={`resource-summary-${resource.id}`}
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold '}}>
                            {resource.nickname}
                        </Typography>
                        <Typography sx={{ width: '33%', flexShrink: 0, color: 'text.secondary', textTransform: 'capitalize' }}>
                            {resource.type.toLowerCase()}
                        </Typography>
                        <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold '}}>
                            {getCurrentOutput(resource)}/{resource.max_output} kW
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Resource resource={resource}/>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    )
}

export default ResourceList;
