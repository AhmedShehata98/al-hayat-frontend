import react from 'react';
import {Box, Button, Divider, Typography} from "@mui/material";

export default function Dialog({onClose,onAccept,onReject}) {

    return (
        <Box as={'dialog'}
             open
             width={'fit'}
             minHeight={'fit'}
             border={"1px solid #c4c4c4"}
             borderRadius={'8px'}
             padding={'1.5rem'}
             boxShadow={4}
             >
            <Typography variant={'p'} color={'#181818'} paddingBottom='1.5rem' paddingTOp={'1rem'} display={'flex'}>are you sure need to delete this ?</Typography>
            <Divider />
            <Box width={'100%'} padding={'0.5rem'} display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
              <Button type="button" color={'error'} variant={'contained'} onClick={onAccept}>yes</Button>
              <Button type="button" color={'secondary'} onClick={onReject}>no</Button>
            </Box>
        </Box>
    )
}