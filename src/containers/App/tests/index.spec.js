import React from 'react'
import { shallow } from 'enzyme'
import App from '../index'

describe('App', () => {
  it('renders without crashing', () => {
    const mockAuth = {}
    shallow(<App route={mockAuth} />)
  })
})
