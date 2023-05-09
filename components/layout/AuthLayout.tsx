import { Box } from "@mui/material"


interface Props {
    title?: string
    children: React.ReactElement | React.ReactElement[]
}


export const AuthLayout: React.FC<Props> = ({children}) => {
   return (
    <>   
      <Box py={5} px={4}>
        {children}
      </Box>    
    </>
   )
}