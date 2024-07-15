import React from 'react'
import { Provider } from 'react-redux'
import { Reducer } from './Redux/ReduxStore'
import Home from './Components/Home/Home'

const App = () => {


  return (

    <Provider store={Reducer}  >
      <div className="fixed top-0 -z-10 w-full h-full">
        <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>
      <Home />
    </Provider>
  )
}

export default App
