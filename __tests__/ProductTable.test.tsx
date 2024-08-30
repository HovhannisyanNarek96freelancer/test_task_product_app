import {render, screen, fireEvent, within} from "@testing-library/react";
import {ProductTable} from "@/components/ProductTable";

describe("ProductTable Component", () => {
    it("renders the table with initial data", () => {
        render(<ProductTable />);

        // Verify that the Price column header is rendered
        const priceHeader = screen.getByRole('columnheader', { name: 'Price' });
        expect(priceHeader).toBeInTheDocument();

        // Verify that the Description column header is rendered
        const descriptionHeader = screen.getByRole('columnheader', { name: 'Description' });
        expect(descriptionHeader).toBeInTheDocument();

        // Verify that the first product (LED Monitor) is present in the table
        expect(screen.getByText('LED Monitor', {})).toBeInTheDocument();
    });

    it("sorts the table by Product Name in ascending order by default", () => {
        render(<ProductTable />);

        // Verify that the Product Name column is sorted in ascending order by default
        const ProductNameHeader = screen.getByRole('columnheader', { name: 'Product Name 🔼' });
        expect(ProductNameHeader).toBeInTheDocument();
    });

    it("toggles the visibility of the Quality column", () => {
        render(<ProductTable />);

        // Get the checkbox for the Quality column visibility toggle
        const qualityCheckbox = screen.getByLabelText('Quality', {});

        // Ensure the checkbox is initially checked (column visible)
        expect(qualityCheckbox).toBeChecked();

        // Click the checkbox to hide the Quality column
        fireEvent.click(qualityCheckbox);
        expect(qualityCheckbox).not.toBeChecked();
        // Verify that the Quality column header is no longer in the document
        expect(screen.queryByRole('columnheader', { name: 'Quality' })).not.toBeInTheDocument();
    });

    it('ensures Product Name cannot be hidden', () => {
        render(<ProductTable />);

        // Get the checkbox for the Product Name column visibility toggle
        const productNameCheckbox = screen.getByLabelText('Product Name', {});

        // Ensure the checkbox for Product Name is disabled (cannot hide)
        expect(productNameCheckbox).toBeDisabled();

        // Ensure that the Product Name column is still visible in the document
        expect(screen.getByRole('columnheader', { name: /Product Name/ })).toBeInTheDocument();
    });

    it("sorts columns when headers are clicked", () => {
        render(<ProductTable />);

        // Get the Quality column header and its text container (div)
        const qualityHeader = screen.getByRole('columnheader', { name: 'Quality' });
        const qualityHeaderDiv = within(qualityHeader).getByText('Quality', {});

        // Ensure the Quality column header is present initially
        expect(qualityHeaderDiv).toHaveTextContent("Quality");

        // Simulate a click to sort the Quality column in descending order
        fireEvent.click(qualityHeaderDiv);
        expect(qualityHeaderDiv).toHaveTextContent("Quality 🔽");

        // Simulate another click to sort the Quality column in ascending order
        fireEvent.click(qualityHeaderDiv);
        expect(qualityHeaderDiv).toHaveTextContent("Quality 🔼");
    });
});
