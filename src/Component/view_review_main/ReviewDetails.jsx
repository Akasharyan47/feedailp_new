import React from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Divider,
  Rating,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ReviewDetails = ({ review, onCloseDetails }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const cellStyle = {
    fontSize: isMobile ? "0.8rem" : "",
    margin: 0,
    padding: "6px 0 6px 0", 
    width:"auto",

  };

  return (
    <Dialog
      open={true}
      onClose={onCloseDetails}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          maxHeight: "80vh", // Set max height to 80% of viewport height
          overflowY: "auto",
        },
      }}
    >
      <>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              style={{ fontSize: isMobile ? "0.9rem" : "", margin: 0, padding: 0 }}
            >
              Details for User: {review.user}
            </Typography>
            <IconButton color="secondary" onClick={onCloseDetails}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Divider />

          <TableContainer>
            <Table size={isMobile ? "small" : ""}>
              <TableBody  >
              <TableRow  >
                  <TableCell style={{ ...cellStyle}} colSpan={1} >
                    <Typography
                      variant="body1"
                      
                    >
                      Company:
                    </Typography>{" "}
                    {review.company}
                  </TableCell>
                  <TableCell style={{ ...cellStyle}} colSpan={1} >
                    <Typography
                      variant="body1"
                      
                    >
                      Product:
                    </Typography>{" "}
                    {review.product}
                  </TableCell>
                  <TableCell style={{ ...cellStyle}} colSpan={1} >
                    <Typography
                      variant="body2"
                       
                    >
                        Uploaded:
                    </Typography>{" "}
                    {review.date}
                  </TableCell>
                </TableRow>
                {/* <TableRow> 
                  <TableCell style={cellStyle}>Product: {review.product}</TableCell>
                  <TableCell></TableCell>
                   
                </TableRow> */}
                <TableRow>
                  <TableCell colSpan={3} style={cellStyle} sx={{textAlign:"justify", width:"100%" }} >
                    {review.comment}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={cellStyle}>Rating</TableCell>
                  <TableCell colSpan={3} style={cellStyle}>
                    <Box mt={1}>
                      <Rating
                        name={`rating-${review.id}`}
                        value={review.rating}
                        readOnly
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {review.service_experience && (
            <>
              <Divider />

              <TableContainer>
                <Table size={isMobile ? "small" : ""}>
                  <TableBody>
                    <TableRow>
                      <TableCell style={cellStyle}>Rating</TableCell>
                      <TableCell style={cellStyle}>{review.rating}</TableCell>
                    </TableRow>
                    {Object.entries(review.service_experience).map(
                      ([question, answer], index) => (
                        <TableRow key={index}>
                          <TableCell style={cellStyle}>{question}</TableCell>
                          <TableCell style={cellStyle}>
                            {typeof answer === "boolean"
                              ? answer.toString()
                              : answer}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </DialogContent>
      </>
    </Dialog>
  );
};

export default ReviewDetails;
