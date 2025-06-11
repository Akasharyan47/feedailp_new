// My_ReviewTable.jsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ReviewTable = ({ reviews, onEdit, onDelete }) => {
  console.log("ReviewTable component rendered", { reviews });
  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Table header */}
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        {/* Table body */}
        <TableBody>
  {reviews.map((review) => (
    <TableRow key={review.product_id || review.product?.product?.product_id || Math.random()}>
      <TableCell>{review.name}</TableCell>
      <TableCell>{Array.isArray(review.Star_Ratings) ? review.Star_Ratings.join(', ') : review.rating}</TableCell>
      <TableCell>{review.reviewText || review.comment}</TableCell>
      <TableCell>
        <IconButton onClick={() => onEdit(review)} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(review.product_id)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

      </Table>
    </TableContainer>
  );
};

export default ReviewTable;
