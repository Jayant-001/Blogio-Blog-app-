'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

const UserPage = () => {

    const session = useSession();

    console.log(session);

  return (
    <div>UserPage</div>
  )
}

export default UserPage