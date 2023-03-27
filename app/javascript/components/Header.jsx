import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <>
      <header className="mb-2 bg-dark-blue-bg w-screen top-0 py-3 fixed">
        <div className="container mx-auto max-w-7xl px-12">
          <div className="flex flex-wrap justify-between">
            <Link to="/">
              <h1 className="font-normal">
                OpenTSS: Countering Tenant Screening
              </h1>
            </Link>
            
            <button>
              Menu
            </button>
          </div>
        </div>
      </header>
      <div className="h-10">

      </div>
    </>

  )
}
