import { fireEvent, render, screen } from '@testing-library/react';

import Modal from '@/app/ui/modal';

describe('Modal', () => {
  it('does not render the modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>,
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    fireEvent.click(screen.getByText('X'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
