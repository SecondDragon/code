import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

test.only('HelloWorld.vue', () => {
  const shallowMountWrapper = shallowMount(HelloWorld)
  const mountWrapper = mount(HelloWorld)

  // shallowMount 是浅渲染
  console.log(shallowMountWrapper.html())

  // mount 是深渲染
  console.log(mountWrapper.html())
})

test('HelloWorld.vue', async () => {
  // 挂载组件
  const wrapper = shallowMount(HelloWorld, {
    propsData: {
      msg: 'Hello World'
    }
  })

  const countText = wrapper.find('[data-testid="count-text"]')
  const button = wrapper.find('button')
  const btn2 = wrapper.find('[data-testid="btn2"]')

  expect(countText.text()).toBe('0')

  // 触发事件
  await button.trigger('click')

  // await Vue.nextTick()

  expect(wrapper.vm.count).toBe(1)

  expect(countText.text()).toBe('1')

  console.log(wrapper.emitted())

  await btn2.trigger('click')

  console.log(wrapper.emitted())

  expect(wrapper.emitted().hello).toBeTruthy()
  expect(wrapper.emitted().hello[0][0]).toBe(123)

  // console.log(wrapper.element.innerHTML)
  // console.log(wrapper.html())
  // expect(wrapper.html()).toContain('Hello World')
})
