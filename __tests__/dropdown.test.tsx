import { SortOrder } from '@/app/main/profile/types';
import { Dropdown } from '@/app/ui/dropdown';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const options: SortOrder[] = [SortOrder.DEFAULT, SortOrder.NEWEST, SortOrder.OLDEST];
const currentOption: SortOrder = SortOrder.DEFAULT;
const handleOption = jest.fn();

describe('Dropdown', () => {
  it('closes dropdown when clicking outside', async () => {
    render(
      <Dropdown options={options} currentOption={currentOption} handleOption={handleOption} />,
    );
    const dropdownButton = screen.getByText(currentOption);
    fireEvent.click(dropdownButton);

    expect(screen.getByRole('list')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.queryByRole('list')).toBeNull();
    });
  });

  it('calls handleOption with the correct option', () => {
    render(
      <Dropdown options={options} currentOption={currentOption} handleOption={handleOption} />,
    );

    const dropdownButton = screen.getByText(currentOption);
    fireEvent.click(dropdownButton);

    const option = screen.getByText(SortOrder.NEWEST);
    fireEvent.click(option);

    expect(handleOption).toHaveBeenCalledWith(SortOrder.NEWEST);
    expect(screen.queryByRole('list')).toBeNull();
  });
});
