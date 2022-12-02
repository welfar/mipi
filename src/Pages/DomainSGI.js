import React from 'react'
import LayoutCompleted from '../Components/Principal/LayaoutComplete'
import { DomainSGILayout } from '../Components/DomainSGI/DomainSGILayout'

export const DomainSGI = () => {
  return (
      <LayoutCompleted view="Administración de Dominios">
        <DomainSGILayout />
      </LayoutCompleted>
  )
}