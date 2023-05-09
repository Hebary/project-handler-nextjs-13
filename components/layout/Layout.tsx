import { Box } from "@mui/material"
import { Navbar } from "../ui"
import { Sidebar } from "../ui"
import { useAuth } from "../../hooks"


interface Props {
    title?: string
    children: React.ReactElement | React.ReactElement[]
}

export const Layout: React.FC<Props> = ({ children }) => {

  return (
      <>  
        <Navbar/>
        <Sidebar/>
        <Box py={10} px={4}>
          {children}
        </Box>
      </> 
   )
}