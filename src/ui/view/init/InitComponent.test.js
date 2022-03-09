import { render, screen } from '@testing-library/react';
import { InitComponent } from './InitComponent';

describe('InitComponent rendered', () => {
  it('component rendered', async () => {
    function initialize() {
      return true;
    }

    render(<InitComponent model={{ initialize }} />);

    expect(screen.getByText(/Initialization/i)).toBeInTheDocument();
  });
});
