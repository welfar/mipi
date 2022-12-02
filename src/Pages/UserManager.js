import React from 'react'
import LayoutCompleted from '../Components/Principal/LayaoutComplete'
import { UserManagerLayout } from '../Components/UserManager/UserManagerLayout'

export const UserManager = () => {
  return (
      <LayoutCompleted view=" Administración de Usuarios">
        <UserManagerLayout />
      </LayoutCompleted>
  )
}
