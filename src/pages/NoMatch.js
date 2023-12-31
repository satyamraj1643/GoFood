import React from 'react'

const NoMatch = () => {
    return (
        <div><div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="text-center">
                <h1 className="display-1">404</h1>
                <p className="lead">Page Not Found</p>
                <p className="text-muted">The page you are looking for might be in another galaxy.</p>
            </div>
        </div></div>
    )
}

export default NoMatch