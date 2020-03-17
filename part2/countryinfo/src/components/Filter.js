import React from 'react'

const Filter = ({ query, handleQuery }) => (
  <div>
    Find countries: <input value={query} onChange={handleQuery} />
  </div>
)

export default Filter