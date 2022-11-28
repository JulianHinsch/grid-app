import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    InputAdornment,
    Button
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ResourceType } from "../../types/resource";

import { useCreateResourceMutation } from "../../services/resource";

interface NewResourceDialogProps {
    open: boolean,
    handleClose: Function
}

function NewResourceDialog(props: NewResourceDialogProps) {
    const [nickname, setNickname] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [maxOutput, setMaxOutput] = useState<string | number>('');

    const [ createResource ] = useCreateResourceMutation();

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    }

    const handleTypeChange = (e: SelectChangeEvent) => {
        setType(e.target.value as string);
    }

    const handleMaxOutputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxOutput(parseInt(e.target.value));
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        await createResource({
            nickname,
            type,
            max_output: maxOutput,
        })

        handleClose();
    }

    const handleClose = () => {
        props.handleClose();
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle sx={{ fontWeight: 'bold' }}>New Resource</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        required
                        label="Nickname"
                        variant="outlined"
                        sx={{ mb: 1, mt: 2 }}
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                    <FormControl fullWidth sx={{ mb: 1, mt: 1 }} required>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={type}
                            label="Type"
                            onChange={handleTypeChange}
                            required
                        >
                            {Object.values(ResourceType).map((val) => (
                                <MenuItem value={val} key={val}>{val}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        label="Max Output"
                        variant="outlined"
                        value={maxOutput}
                        onChange={handleMaxOutputChange}
                        InputProps={{
                            type: "number",
                            endAdornment: <InputAdornment position="end">kW</InputAdornment>,
                        }}
                        sx={{ mt: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        sx={{textTransform: "none"}}>
                            Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disableElevation
                        sx={{textTransform: "none"}}>
                            Create
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default NewResourceDialog;
