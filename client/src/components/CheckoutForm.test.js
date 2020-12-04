import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm />)
    const header = screen.getByText(/checkout form/i)
    expect(header).toBeTruthy()
    expect(header).toHaveTextContent(/checkout form/i)
});

test("form shows success message on submit with form details", () => {
    render(<CheckoutForm />)

    //form fields 
    const firstNameInput = screen.getByLabelText(/first name:/i)
    const lastNameInput = screen.getByLabelText(/last name:/i)
    const addressInput = screen.getByLabelText(/address:/i)
    const cityInput = screen.getByLabelText(/city:/i)
    const stateInput = screen.getByLabelText(/state/i)
    const zipInput = screen.getByLabelText(/zip:/i)

    //add text to form fields 
    fireEvent.change(firstNameInput, {target: {value: 'mali', name: 'firstName'}})
    fireEvent.change(lastNameInput, {target: {value: 'rivera', name: 'lastName'}})
    fireEvent.change(addressInput, {target: {value: '220 prospect st.', name: 'address'}})
    fireEvent.change(cityInput, {target: {value: 'boston', name: 'city'}})
    fireEvent.change(stateInput, {target: {value: 'ma', name: 'state'}})
    fireEvent.change(zipInput, {target: {value: '01945', name: 'zip'}})

    //checkout form values 
     // expect(firstNameInput).toHaveValue('jackie')
     expect(firstNameInput).toHaveValue('mali')
     expect(lastNameInput).toHaveValue('rivera')
     expect(addressInput).toHaveValue('220 prospect st.')
     expect(cityInput).toHaveValue('boston')
     expect(stateInput).toHaveValue('ma')
     expect(zipInput).toHaveValue('01945')

    //get access and click submit button 
    const button = screen.getByRole('button')
    fireEvent.click(button)

    //assert check that submission message is on screen
    const orderName = screen.getByDisplayValue(/mali/i)
    expect(orderName).toBeTruthy()
    const confirmationMessage = screen.getByTestId('successMessage')
    expect(confirmationMessage).toBeTruthy()

});
