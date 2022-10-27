import { renderHook } from '@testing-library/react-hooks';

import useForm from '.';

describe('useForm', () => {
  it('renders correctly', () => {
    const { result } = renderHook(() =>
      useForm(
        {
          email: {
            name: 'email',
            placeholder: '',
            label: 'E-mail',
            type: 'email',
            value: '',
            validations: [
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            ],
          },
          name: {
            name: 'name',
            placeholder: '',
            type: 'text',
            label: 'Name',
            value: '',
            validations: [
              (value: string) => {
                return value.length >= 3;
              },
            ],
          },
        },
        'https://myapi.com/post-data-url',
      ),
    );

    expect(result.current).toEqual({
      Form: expect.any(Function),
      FormFields: { Email: expect.any(Function), Name: expect.any(Function) },
      data: { error: undefined, response: undefined, status: undefined },
    });
  });
});
