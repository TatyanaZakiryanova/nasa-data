import { fireEvent, render, screen } from '@testing-library/react';

import Modal from '@/app/ui/modal';

describe('Modal', () => {
  it('does not render the modal when isOpen is false', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={false} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    expect(screen.queryByText(/modal content/i)).not.toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    fireEvent.click(screen.getByText(/X/i));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
