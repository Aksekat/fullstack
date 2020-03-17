import React from 'react'

const Filter = ({ query, handleQuery }) => (
  <div>
    Search by name: <input value={query} onChange={handleQuery} />
  </div>
)

export default Filter