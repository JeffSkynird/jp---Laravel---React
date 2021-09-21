import React from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';

// routing
import Routes from './routes';

// defaultTheme
import themes from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';

// ===========================|| APP ||=========================== //

const App = () => <StyledEngineProvider injectFirst>
<ThemeProvider theme={themes()}>
    <CssBaseline />
    <NavigationScroll>
        <Routes />
    </NavigationScroll>
</ThemeProvider>
</StyledEngineProvider>

export default App;
