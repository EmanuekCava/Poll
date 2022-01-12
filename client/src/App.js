import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

// COMPONENTS

import Header from './app/components/header/header'

// ROUTES

import Index from './app/routes/index.routes'
import Auth from './app/routes/auth.routes'
import Polls from './app/routes/polls.routes'

import MyPolls from './app/routes/private/mypolls.routes'
import GetPoll from './app/routes/private/getpoll.routes'
import CreatePoll from './app/routes/private/createpoll.routes'

// SERVER

import store from './app/store'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store} >
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/mypolls" element={<MyPolls />} />
          <Route path="/polls/:id" element={<GetPoll />} />
          <Route path="/create" element={<CreatePoll />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
