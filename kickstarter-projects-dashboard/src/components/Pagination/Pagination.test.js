import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  
  const onPageChange = jest.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  it('should render pagination navigation and buttons', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('prev-btn')).toBeInTheDocument();
    expect(screen.getByTestId('next-btn')).toBeInTheDocument();
  });

  it('should disable previous button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    
    expect(screen.getByTestId('prev-btn')).toBeDisabled();
    expect(screen.getByTestId('next-btn')).toBeEnabled();
  });

  it('should disable next button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />);
    
    expect(screen.getByTestId('prev-btn')).toBeEnabled();
    expect(screen.getByTestId('next-btn')).toBeDisabled();
  });

  it('should show correct page buttons for first few pages', () => {
    render(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />);
    
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
    
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should show correct page buttons for middle pages', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={onPageChange} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getAllByText('...')[0]).toBeInTheDocument();
    for (let i = 3; i <= 7; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
    expect(screen.getAllByText('...')[1]).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should show correct page buttons for last few pages', () => {
    render(<Pagination currentPage={9} totalPages={10} onPageChange={onPageChange} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    for (let i = 6; i <= 10; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('should call onPageChange with correct arguments when buttons are clicked', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={onPageChange} />);
    
    fireEvent.click(screen.getByTestId('next-btn'));
    expect(onPageChange).toHaveBeenCalledWith(6);

    fireEvent.click(screen.getByTestId('prev-btn'));
    expect(onPageChange).toHaveBeenCalledWith(4);

    fireEvent.click(screen.getByText('1'));
    expect(onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('10'));
    expect(onPageChange).toHaveBeenCalledWith(10);
  });

});
