import React from 'react';
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/app-header.jsx'
import { UserMsg } from './cmps/user-msg'
import { BackOffice } from './pages/backoffice.page.jsx';
import { InfoPage } from './pages/info.page.jsx';
import { QuestionPage } from './pages/question.page.jsx'



import routes from './routes'

function App() {
  return (
    <div className="App">
      <UserMsg />
      <AppHeader />
      <main className=''>
        <Routes>
          {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
          {/* forInner routes in react-router-dom 6 make an external route here and open scope for it, and include inside */}
          <Route path='/backoffice' element={<BackOffice />}>
            <Route path='info' element={<InfoPage />} />
            <Route path='question' element={<QuestionPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
