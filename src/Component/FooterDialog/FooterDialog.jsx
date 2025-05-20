import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
 
  


const FooterDialog = ({open,close}) => { 
  const [scroll, setScroll] = React.useState('paper');

//   const handleClickOpen = (scrollType) => () => {
//     setOpen(true);
//     setScroll(scrollType);
//   };

  

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) { 
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>  
      <Dialog
           open={open}
           onClose={close}
           scroll={scroll}
           aria-labelledby="scroll-dialog-title"
           aria-describedby="scroll-dialog-description"
        >
           <DialogTitle sx={{paddingBottom:"2px", fontSize:"18px"}} id="scroll-dialog-title">
           About Us  
           </DialogTitle>
           <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                 id="scroll-dialog-description"
                 ref={descriptionElementRef}
                 tabIndex={-1}
                 sx={{ fontSize:"14px"}} 
              >
                 Cras mattis consectetur purus sit amet fermentum.
                 Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                 Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                 Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                 Cras mattis consectetur purus sit amet fermentum.
                 Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                 Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                 Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,\    Cras mattis consectetur purus sit amet fermentum.
                 Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                 Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                 Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,    Cras mattis consectetur purus sit amet fermentum.
                 Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                 Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                 Praesent commodo cursus magna, vel scelerisque nisl ttis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`, Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,\ Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`, Cras mattis consectetur purus sit amet fermentum. Crttis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`, Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,\ Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`, Cras mattis consectetur purus sit amet fermentum. Crttis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`, Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,\ Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`, Cras mattis consectetur purus sit amet fermentum. Crttis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`, Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,\ Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`, Cras mattis consectetur purus sit amet fermentum. Crttis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`, Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,\ Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`, Cras mattis consectetur purus sit amet fermentum. Cr

              </DialogContentText>
           </DialogContent>
           <DialogActions>
              <Button onClick={close}>Cencel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default FooterDialog;