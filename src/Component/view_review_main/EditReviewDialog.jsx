import React, { useState, useEffect } from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slide,
  Button,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditReviewDialog = ({ open, onClose, onSave, review }) => {
  const [editedReview, setEditedReview] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (review) {
      setEditedReview({ ...review });
    }
  }, [review]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('service_experience.')) {
      const field = name.split('.')[1];
      setEditedReview((prev) => ({
        ...prev,
        service_experience: {
          ...prev.service_experience,
          [field]: value === 'true' ? true : value === 'false' ? false : value
        }
      }));
    } else {
      setEditedReview((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/update_review_bp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedReview)
      });

      const result = await res.json();
      if (result.status === 'success') {
        onSave(editedReview);
        onClose();
      } else {
        console.error('Save failed:', result.message);
      }
    } catch (err) {
      console.error('API error while saving:', err);
    }
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
            Edit Review
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSave}>
            Save
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="User"
              name="user"
              value={editedReview.user || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              label="Rating"
              name="rating"
              type="number"
              value={editedReview.rating || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              inputProps={{ min: 1, max: 5 }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={editedReview.date || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Comment"
              name="comment"
              value={editedReview.comment || ''}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Company"
              name="company"
              value={editedReview.company || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Product"
              name="product"
              value={editedReview.product || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>

        <Typography variant="h6" mt={4}>
          Service Experience
        </Typography>
        <TableContainer sx={{ mt: 2 }}>
          <Table size={isMobile ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                <TableCell>Question</TableCell>
                <TableCell>Answer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {editedReview.service_experience &&
                Object.entries(editedReview.service_experience).map(([key, value]) => (
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
                        >
                          <MenuItem value="true">True</MenuItem>
                          <MenuItem value="false">False</MenuItem>
                        </TextField>
                      ) : (
                        <TextField
                          name={`service_experience.${key}`}
                          value={value}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      )}
                    </TableCell>
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
