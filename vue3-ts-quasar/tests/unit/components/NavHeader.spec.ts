import { shallowMount } from '@vue/test-utils';
import { NavHeader } from '@/components';
import { createTestingPinia } from '@pinia/testing';

describe('Logo', () => {
  it('should mount', () => {
    const wrapper = shallowMount(NavHeader, {
      global: { plugins: [createTestingPinia()] },
    });

    expect(wrapper).toBeTruthy();
  });
});