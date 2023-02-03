import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ExternalLink from '@/components/ExternalLink/ExternalLink';
import { useElementClientRect } from '@/hooks/useElementClientRect';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { styled } from '@mui/material';

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

const StyledToolbar = styled(Toolbar)({
    maxHeight: '64px',
    minHeight: '64px'
});

export default function Header(props: Props) {
    const { window, children } = props;

    const location = useLocation();
    const {width} = useWindowDimensions();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const projectName = 'ReactTypeScriptTemplete';
    const drawerWidth = 220;

    const headerRef = useRef(null);
    const {clientRect: headerClientRect} = useElementClientRect(headerRef);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    const navItems = ['Home', 'About', 'Contact'];

    const drawerItems = [
        {
            icon: <HomeIcon />,
            title: 'TOP',
            url: '/'
        },
        {
            icon: <AccountCircleIcon />,
            title: 'ABOUT',
            url: '/about'
        },
        {
            icon: <EngineeringIcon />,
            title: 'WORKS',
            url: '/works'
        }
    ]

    const drawer = (
        <Box>
            <StyledToolbar />
            <List disablePadding>
                {drawerItems.map((item, index) => (
                    <React.Fragment key={item.title}>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={item.url}>
                                <ListItemIcon sx={{ color: 'inherit' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                ref={headerRef}
                component="nav"
                position="fixed"
                sx={{
                    // width: { md: `calc(100% - ${drawerWidth}px)` },
                    // ml: { md: `${drawerWidth}px` },
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <StyledToolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'block', md: 'block' }, fontWeight: 'bold' }}
                    >
                        {projectName}
                    </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#fff' }}>
                                {item}
                            </Button>
                            ))}
                        </Box>
                </StyledToolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{flexGrow: 1, p: 0, width: { md: `calc(100% - ${drawerWidth}px)` }}}>
                <StyledToolbar />
                <Box
                    sx={{
                        p: 2,
                    }}
                    >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}