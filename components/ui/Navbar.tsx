import { useState } from 'react';
import Link from 'next/link'
import { AppBar, Toolbar, Typography, Box, IconButton, Input, InputAdornment } from '@mui/material';
import { SearchOutlined, MenuOutlined, ClearOutlined, CategoryOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useUI } from '../../hooks';





export const Navbar: React.FC = () => {

    const { toggleMenu } = useUI();
    // const { searchProject } = useProjects();
    const [search, setSearch] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const router = useRouter();
    const onSearch = () => {
        if(search.trim().length === 0) return;
        // searchProject(search);
        // router.push('/projects');
    }
    

    return (
        <AppBar>
            <Toolbar>
                    <Link href='/' style={{ fontSize: 18, textDecoration:'none' }}>
                        <Box display='flex' color={'#E9D498'}>
                          <CategoryOutlined sx={{ fontSize: '30px' }}/>
                          <Box>
                            <Typography sx={{ fontSize: '12px', ml:.3}} className='red-hat-font'>Project</Typography>
                            <Typography sx={{ ml: 0.5, fontSize:'12px' }} fontWeight='light' className='red-hat-font'>Handler</Typography>
                          </Box>
                        </Box>
                    </Link>

                <Box flex={1}/>

                <Box gap={3} className='red-hat-font' sx={{borderRadius:10, display: isSearchVisible ? 'none' : { xs: 'none', sm: 'flex' } }}>
                    <Link href='/' style={{ fontSize: 18, textDecoration:'none', color:'#E9D498' }}>
                        Projects
                    </Link>
                </Box>

                <Box flex={1}/>
                
                <Box display='flex' alignItems='center' gap={1}>

                {/* sm */}

                {
                isSearchVisible ?
                    (
                        <Input
                            sx={{ display: {sm: 'flex'}, width:'110px', color:'#E9D498' }}
                            className='fadeIn'
                            type='text'
                            autoFocus   
                            value={search}
                            onChange={ (e) => setSearch( e.target.value ) }
                            onKeyUp={ (e) => e.key === 'Enter' && onSearch()}
                            placeholder="Search..."
                            endAdornment={
                                <InputAdornment sx={{color:'#E9D498'}} position="end">
                                    <IconButton sx={{color:'#E9D498'}}
                                        onClick={ ()=> setIsSearchVisible(!isSearchVisible) }
                                    >
                                     <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        /> 
                    ) 
                :   
                    (
                        <IconButton
                            onClick={ ()=> setIsSearchVisible(!isSearchVisible) }
                            sx={{ display: { sm: 'flex' }, color:'#E9D498' }}
                            className='fadeIn'

                        >
                            <SearchOutlined sx={{color:'#E9D498'}} />
                        </IconButton>
                    )
                }

                <IconButton onClick={ toggleMenu }>
                    <MenuOutlined sx={{ color: '#E9D498' }}/>
                </IconButton>
        
                </Box>
            </Toolbar>
        </AppBar>
    )
}
