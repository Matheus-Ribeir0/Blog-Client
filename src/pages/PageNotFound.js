import React from 'react'
import {Link} from 'react-router-dom'

function PageNotFound() {
  return (
    <div>
        <h1>Page not Found :/</h1>
        <h3> Got to <Link to="/"> Home Page</Link></h3>
    </div>
  )
}

export default PageNotFound