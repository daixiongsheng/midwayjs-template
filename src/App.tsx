import React, { useState, useEffect } from 'react'
import { useRouteMatch, withRouter, useParams } from 'react-router'
import { login } from './apis/lambda'
import routes from './routes'
import { Switch, Route } from 'react-router-dom'

function App() {
  const params = useParams()
  const router = useRouteMatch()
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    const userName = '123'
    const password = '123'
    const response = await login(userName, password)
    if (response) {
      setMessage(response.msg)
      console.log(response)
    }
  }
  useEffect(() => {
    console.log(router, params)
  }, [])

  return (
    <Switch>
      {routes.map(route => (
        <Route exact={route.exact} path={route.path} key={route.path}>
          <route.component />
        </Route>
      ))}
    </Switch>
  )
}

export default withRouter(App)
