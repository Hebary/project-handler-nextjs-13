import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { AddCircleOutlineRounded, CategoryOutlined, LoginOutlined} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useAuth, useProjects, useUI } from "../../hooks";




export const Sidebar: React.FC = () => {

    const { isMenuOpen, toggleMenu } = useUI();
    const { signOut, user } = useAuth();
    const { cleanProjectsState } = useProjects();
    // 
    const router = useRouter();

    const onSignOut = () => {
        signOut();
        cleanProjectsState();
        router.push('/auth/login')
        toggleMenu();
    }

    const navigateTo = (path: string) => { 
      router.push(path);
    }

    return (
        <Drawer
            open={ isMenuOpen }
            onClose={ toggleMenu }
            anchor='right'
            sx={{ backdropFilter:'blur(2px)', transition: 'all .7s cubic-bezier(0.25, 0.8, 0.25, 1)' }}
        >
            <Box sx={{width: 250, paddingTop: 1 }}>
                

            <Box sx={{ padding: 2 }}>
                <Typography variant='body2' fontWeight={500} textTransform={'capitalize'} className='red-hat-font'>Welcome { user?.name }</Typography>
            </Box>
            
            <Divider/>
            
            <List>
                <ListItemButton
                    onClick={ onSignOut }
                    >
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                    <ListItemText primary={'Sign Out'} />
                </ListItemButton>
                 
                <ListItemButton 
                    sx={{ display: { xs: '', sm: 'none' } }} 
                    onClick={ () => navigateTo('/projects') }
                >
                    <ListItemIcon>
                        <CategoryOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Projects'} />
                </ListItemButton>
            
                <ListItemButton
                        onClick={ () => { navigateTo('/new-project'); toggleMenu(); }}
                    >
                        <ListItemIcon>
                            <AddCircleOutlineRounded/>
                        </ListItemIcon>
                        <ListItemText primary={'New project'} />
                </ListItemButton>
            </List>
        </Box>      
        </Drawer>
    )
}
