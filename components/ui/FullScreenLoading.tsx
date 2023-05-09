import { Box, CircularProgress, Typography } from "@mui/material"


export const FullScreenLoading: React.FC = () => (
     <Box 
        className='fadeInUp'
        display='flex' 
        justifyContent='center' 
        alignItems='center'
        gap={2} 
        height='calc(100vh - 200px)'
        flexDirection='column'
    >
        <Typography className='red-hat-font' variant='h5' fontWeight={300}>Loading...</Typography>
        <CircularProgress thickness={ 1.5 }/>
        
    </Box>
)

