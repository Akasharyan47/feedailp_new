import React, { useState } from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,TableHead,
  Typography,MenuItem,
  Box,Table,TableBody,TableRow,
  Button,TableContainer,Checkbox,
  TextField,FormControlLabel,
  Slide,TableCell
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditReviewDialog = ({ open, onClose, onSave, review }) => {
  const [editedReview, setEditedReview] = useState({ ...review });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedReview((prevReview) => ({
      ...prevReview,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    onSave(editedReview);
    onClose();
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Edit Review
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSave}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Box p={3}>
        {/* Display the form with selected review data for editing */}
        <TextField
          label="ID"
          name="id"
          type="number"
          value={editedReview.id}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="User"
          name="user"
          value={editedReview.user}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rating"
          name="rating"
          type="number"
          value={editedReview.rating}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Comment"
          name="comment"
          value={editedReview.comment}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={editedReview.date}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Company"
          name="company"
          value={editedReview.company}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Product"
          name="product"
          value={editedReview.product}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        {/* Render service_experience questions dynamically */}
        <h3>Service Experience:</h3>
        <TableContainer  >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Question</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {Object.entries(editedReview.service_experience).map(([key, value]) => (
    <TableRow key={key}>
      <TableCell>{key.replace(/_/g, ' ')}</TableCell>
      <TableBody>
  {Object.entries(editedReview.service_experience).map(([key, value]) => (
    <TableRow key={key}>
      <TableCell>{key.replace(/_/g, ' ')}</TableCell>
      <TableCell>
        {typeof value === 'boolean' ? (
          <TextField
            select
            name={`service_experience.${key}`}
            value={value.toString()}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="true">True</MenuItem>
            <MenuItem value="false">False</MenuItem>
          </TextField>
        ) : (
          <TextField
            name={`service_experience.${key}`}
            type="number"
            value={value.toString()}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        )}
      </TableCell>
    </TableRow>
  ))}
</TableBody>

    </TableRow>
  ))}
</TableBody>

          </Table>
        </TableContainer>
      </Box>
    </Dialog>
  );
};

export default EditReviewDialog;
