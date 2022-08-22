import React from 'react';
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/app-header.jsx'
// import { AppFooter } from './cmps/app-footer.jsx'



import routes from './routes'

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className=''>
        <Routes>
          {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
          {/* forInner routes in react-router-dom 6 make an external route here and open scope for it, and include inside */}
        </Routes>
      </main>
      {/* <AppFooter /> */}
    </div>
  );
}

export default App;
