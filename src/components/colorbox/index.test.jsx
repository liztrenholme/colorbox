/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import Colorbox from './index';
import React from 'react';
import {describe, test, beforeEach, vi, expect, afterEach} from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockInput = vi.fn();

beforeEach(() => {
  vi.mock('../Input', () => ({ 
    default: (props) => {
      mockInput(props);
      return <input data-testid="actual-input" value={props.color} onChange={props.handleColorChange} />;
    }, 
  }));
});
afterEach(() => {
  vi.resetAllMocks();
});
describe('Colorbox', () => {
  // const user = userEvent.setup();
  test('swap button is present', async () => {
    const {getByText} = render(<Colorbox />);
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, {target: {value: '#010101'}}, {skipClick: true});
    expect(getByText('Show Opposite')).toBeInTheDocument();
  });

  test('swap button changes display to show contrast color in hex mode', async () => {
    const {getByText} = render(<Colorbox />);
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, {target: {value: '#010101'}}, {skipClick: true});
    const swapBtnElement = await getByText('Show Opposite');
    await waitFor(() => {
      expect(getByText(/Opposite: #FEFEFE/i)).toBeInTheDocument();
    });
    fireEvent.click(swapBtnElement);
    await waitFor(() => {
      expect(getByText(/Opposite: #010101/i)).toBeInTheDocument();
    });
  });

  test('swap button changes display to show contrast color in colorname mode', async () => {
    const {getByText} = render(<Colorbox />);
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, {target: {value: 'blueviolet'}}, {skipClick: true});
    const swapBtnElement = getByText('Show Opposite');
    expect(swapBtnElement).toBeInTheDocument();
    await waitFor(() => {
      expect(getByText(/Opposite: #75D41D/i)).toBeInTheDocument();
    });
    fireEvent.click(swapBtnElement);
    await waitFor(() => {
      expect(getByText(/Opposite: blueviolet/i)).toBeInTheDocument();
    });
  });

  test('swap button changes display to show contrast color in colorname mode', async () => {
    const {getByText, getByTestId} = render(<Colorbox />);
    expect(getByTestId(/actual-input/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/actual-input/i);
    // await user.type(inputElement, 'blue', {skipClick: true});
    fireEvent.change(inputElement, {target: {value: 'blue'}}, {skipClick: true});
    const swapBtnElement = getByText('Show Opposite');
    await waitFor(() => {
      expect(getByText(/Opposite: #FFFF00/i)).toBeInTheDocument();
    });
    expect(swapBtnElement).toBeInTheDocument();
    fireEvent.click(swapBtnElement);
    await waitFor(() => {
      expect(getByText(/Opposite: blue/i)).toBeInTheDocument();
    });
  });

  test('RGB button changes mode from colorname to RGB', async () => {
    render(<Colorbox />);
    const colNameElement = screen.getAllByText(/Color Name/i);
    fireEvent.click(colNameElement[0]);
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, {target: {value: 'blueviolet'}}, {skipClick: true});
    const rgbElement = screen.getAllByText(/RGB/i);
    fireEvent.click(rgbElement[0]);
    await waitFor(() => {
      expect(inputElement.value).toBe('rgb(138, 43, 226)');
    });
  });

  test('RGB button changes mode from hex to RGB', async () => {
    const {getByTestId} = render(<Colorbox />);
    expect(getByTestId(/actual-input/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, {target: {value: '#8A2BE2'}}, {skipClick: true});
    const rgbElement = screen.getAllByText(/RGB/i);
    fireEvent.click(rgbElement[0]);
    await waitFor(() => {
      expect(inputElement.value).toBe('rgb(138, 43, 226)');
    });
  });

  test('RGB button changes mode from hex to RGB but errors when less than 7 characters', async () => {
    render(<Colorbox />);
    const hexElement = screen.getByTestId(/hex-btn-test/i);
    fireEvent.click(hexElement);
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, {target: {value: '#8A2BE'}}, {skipClick: true});
    const rgbElement = screen.getAllByText(/RGB/i);
    fireEvent.click(rgbElement[0]);
    await waitFor(() => {
      expect(screen.getByText(/Hex must have 6 characters/i)).toBeInTheDocument();
    });
  });

  test('Hex button changes mode from colorname to hex', async () => {
    const {getByText} = render(<Colorbox />);
    const colNameElement = screen.getAllByText(/Color Name/i);
    fireEvent.click(colNameElement[0]);
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, {target: { value: 'blueviolet'}}, {skipClick: true});
    const hexElement = screen.getAllByText(/Hex/i);
    fireEvent.click(hexElement[0]);
    const swapBtnElement = getByText('Show Opposite');
    await fireEvent.click(swapBtnElement);
    await waitFor(() => {
      expect(getByText(/#8a2be2/i)).toBeInTheDocument();
    });
  });

  test('Colorname button changes mode from hex to colorname', async () => {
    const {getByText} = render(<Colorbox />);
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, {target: {value: '#8A2BE2'}}, {skipClick: true});
    const colNameElement = screen.getAllByText(/Color Name/i);
    fireEvent.click(colNameElement[0]);
    await waitFor(() => {
      expect(getByText(/blueviolet/i)).toBeInTheDocument();
    });
  });

  
  test('Colorname button changes mode from rgb to colorname', async () => {
    render(<Colorbox />);
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, {target: {value: 'rgb(138, 43, 226)'}}, {skipClick: true});
    const colNameElement = screen.getAllByText(/Color Name/i);
    fireEvent.click(colNameElement[0]);
    await waitFor(() => {
      expect(screen.getByText(/blueviolet/i)).toBeInTheDocument();
    });
  });

  test('Hex button changes mode from rgb to hex', async () => {
    const {getByText, findByText, getByTestId} = render(<Colorbox />);
    const rgbElement = screen.getAllByText(/RGB/i);
    fireEvent.click(rgbElement[0]);
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, {target: {value: 'rgb(138, 43, 226)'}});
    const hexElement = screen.getAllByText(/Hex/i);
    fireEvent.click(hexElement[0]);
    const swapBtnElement = getByText('Show Opposite');
    await fireEvent.click(swapBtnElement);
    await waitFor(() => {
      expect(getByText(/Opposite: #8A2BE2/i)).toBeInTheDocument();
    });
  });

  test('Error displays if no available colorname', async () => {
    const {getByText, getByTestId} = render(<Colorbox />);
    const hexNameElement = getByTestId('hex-btn-test');
    fireEvent.click(hexNameElement);
    expect(getByTestId(/actual-input/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, {target: {value: '#8A2BE3'}});
    const colNameElement = screen.getAllByText(/Color Name/i);
    fireEvent.click(colNameElement[0]);
    await waitFor(() => {
      expect(getByText(/No CSS color name for this code./i)).toBeInTheDocument();
    });
  });

  test('Error displays if no available colorname', async () => {
    render(<Colorbox />);
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, {target: {value: 'rgb(0, 150, 75)'}});
    const colNameElement = await waitFor(() => screen.getByTestId('col-name-btn-test'));
    await waitFor(() => fireEvent.click(colNameElement));
    const errorMessage = await waitFor(() => screen.queryByText(/No CSS color name for this code./i));
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('Add to List button adds color to saved colors list', async () => {
    const {getByText, getAllByTestId, getByTestId} = render(<Colorbox />);
    const inputElement = getByTestId(/actual-input/i);
    fireEvent.change(inputElement, '#010101', {skipClick: true});
    const addToListBtn = getByText(/Add to List/i);
    expect(addToListBtn).toBeInTheDocument();
    fireEvent.click(addToListBtn);
    fireEvent.change(inputElement, 'yellow', {skipClick: true});
    fireEvent.click(addToListBtn);
    fireEvent.change(inputElement, 'rgb(12, 120, 12)', {skipClick: true});
    fireEvent.click(addToListBtn);
    await waitFor(() => {
      expect(getAllByTestId(/saved-colorname-test/i)[0]).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(getAllByTestId(/saved-colorname-test/i)[1]).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(getAllByTestId(/saved-colorname-test/i)[2]).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(getByText(/Show Opposite/i)).toBeInTheDocument();
    });
  });

  test('Selecting a color from the dropdown sets mode to colorname and displays color', async () => {
    const {getByText, getByTestId, getByRole} = render(<Colorbox />);
    expect(getByRole('option', { name: 'Choose color...' }).selected).toBe(true);
    expect(screen.getAllByRole('option').length).toBe(142);
    fireEvent.change(getByTestId('select'), { target: { value: 'chocolate' } });
    let options = screen.getAllByTestId('select-option');
    expect(options[0].selected).toBeFalsy();
    expect(options[15].selected).toBeTruthy();
    expect(options[20].selected).toBeFalsy();
    await waitFor(() => {
      expect(getByText(/Opposite: #2D96E1/i)).toBeInTheDocument();
    });
  });

  test('Removing item from saved list removes color from saved colors list', async () => {
    const {getByText, getByTestId} = render(<Colorbox />);
    const inputElement = getByTestId(/actual-input/i);
    fireEvent.change(inputElement, '#010101', {skipClick: true});
    const addToListBtn = getByText(/Add to List/i);
    expect(addToListBtn).toBeInTheDocument();
    fireEvent.click(addToListBtn);
    const savedItemElement = await waitFor(() => getByTestId(/saved-color-item-test/i));
    await waitFor (() => {
      expect(savedItemElement).toBeInTheDocument();
    });
    fireEvent.dblClick(savedItemElement);
    await waitFor(() => {
      expect(savedItemElement).not.toBeInTheDocument();
    });
  });

  test('Clicking on a saved color populates display with that color', async () => {
    const {getByText, getByTestId} = render(<Colorbox />);
    const inputElement = getByTestId(/actual-input/i);
    fireEvent.change(inputElement, {target: {value: 'cadetblue'}}, {skipClick: true});
    const addToListBtn = getByText(/Add to List/i);
    expect(addToListBtn).toBeInTheDocument();
    fireEvent.click(addToListBtn);
    await waitFor (() => {
      expect(getByTestId(/saved-colorname-test/i)).toBeInTheDocument();
    });
    fireEvent.change(inputElement, {target: {value: '#010101'}}, {skipClick: true});
    fireEvent.click(addToListBtn);
    const savedItemElement = screen.getAllByTestId(/saved-color-item-test/i);
    fireEvent.click(savedItemElement[0]);
    const oppositeColor = await waitFor(() => getByText(/Opposite: #A0615F/i));
    await waitFor(() => {
      expect(oppositeColor).toBeInTheDocument();
    });
  });

  test('Clicking on a saved non-color populates display with no color', async () => {
    const {getByText, getByTestId} = render(<Colorbox />);
    const inputElement = getByTestId(/actual-input/i);
    fireEvent.change(inputElement, {target: {value: ''}}, {skipClick: true});
    const addToListBtn = await screen.queryByText(/Add to List/i);
    expect(addToListBtn).not.toBeInTheDocument();
  });

  test('Option for hiding instructions appears in mobile widths', async () => {
    window.innerWidth = 500;
    fireEvent(window, new Event('resize'));
    const {getByTestId} = render(<Colorbox />);
    const infoCircleElement = getByTestId(/info-circle-test/i);
    expect(infoCircleElement).toBeInTheDocument();
    fireEvent.click(infoCircleElement);
    fireEvent.click(infoCircleElement);
    await waitFor(() => {
      expect(screen.getAllByText(/Display the color associated with the hex code, rgb value, or CSS color name typed into the input, or select a color name from the dropdown./i)[0]).toBeInTheDocument();
    });
  });

  test('Suggested colors appear in display box when clicked', async () => {
    const {getByText, getByTestId} = render(<Colorbox />);
    const infoCircleElement = getByTestId(/info-circle-test/i);
    expect(infoCircleElement).toBeInTheDocument();
    fireEvent.click(infoCircleElement);
    const salmonSuggestion = getByTestId(/salmon-test/i);
    expect(salmonSuggestion).toBeInTheDocument();
    fireEvent.click(salmonSuggestion);
    expect(getByText('Opposite: #057F8D')).toBeInTheDocument();
  });

  test('Clicking on colorname mode changes input to display colorname', async () => {
    const {getByText, getByTestId, getAllByText} = render(<Colorbox />);
    const inputElement = getByTestId(/actual-input/i);
    fireEvent.change(inputElement, {target: {value: '#8a2be2'}}, {skipClick: true});
    const colorNameModeBtn = getAllByText(/Color Name/i);
    expect(colorNameModeBtn[1]).toBeInTheDocument();
    fireEvent.click(colorNameModeBtn[1]);
    await waitFor (() => {
      expect(getByText('blueviolet')).toBeInTheDocument();
    });
  });
});