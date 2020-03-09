import { shallowMount } from '@vue/test-utils'
import User from '@/pages/users/_id.vue'

describe('User', () => {

  const wrapper = shallowMount(User)

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('data has 5 properties', () => {
    expect(typeof User.data).toBe('function')
    const defaultData = User.data()
    expect(defaultData.imgSrc).toBe(null)
    expect(defaultData.isImageLoaded).toBeFalsy()
    expect(defaultData.userLetters).toBe(null)
    expect(defaultData.userName).toBe(null)
    expect(defaultData.validationPassed).toBeFalsy()
  })

  it('method passValidation is defined', () => {
    expect(wrapper.vm.passValidation).toBeTruthy()
    expect(typeof wrapper.vm.passValidation).toBe('function')
  })

  it('method passValidation returns truthy for correct data', () => {
    const users = [
      'Petr Novák',
      'PetrNovák',
      'Petr  Novák',
    ]
    for (const user of users) {
      const a = wrapper.vm.passValidation(user)
      expect(wrapper.vm.passValidation(user)).toBeTruthy()
    }
  })

  it('method passValidation returns falsy for incorrect data', () => {
    const users = [
      'Petr-Novák',
      'PetrNovák123',
      '',
      null,
      undefined
    ]
    for (const user of users) {
      const a = wrapper.vm.passValidation(user)
      expect(wrapper.vm.passValidation(user)).toBeFalsy()
    }
  })

})

