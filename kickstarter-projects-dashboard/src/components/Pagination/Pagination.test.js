import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  
  const onPageChange = jest.fn();

  it('should render pagination buttons and information', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    
    // Verify that previous button is visible
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    
    // Verify that next button is visible
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
    
    // Verify page info is displayed correctly
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Page 1 of 5');
  });

  it('should disable previous button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    
    // Ensure that the previous button is disabled on the first page
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    
    // Ensure that the next button is enabled on the first page
    expect(screen.getByLabelText('Next page')).toBeEnabled();
  });

  it('should disable next button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />);
    
    // Ensure that the previous button is enabled on the last page
    expect(screen.getByLabelText('Previous page')).toBeEnabled();
    
    // Ensure that the next button is disabled on the last page
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('should call onPageChange with correct arguments when next button is clicked', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    
    // Simulate next button click
    fireEvent.click(screen.getByLabelText('Next page'));
    
    // Ensure onPageChange is called with the correct argument (currentPage + 1)
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange with correct arguments when previous button is clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);
    
    // Simulate previous button click
    fireEvent.click(screen.getByLabelText('Previous page'));
    
    // Ensure onPageChange is called with the correct argument (currentPage - 1)
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

});
