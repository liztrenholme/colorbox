import Colorbox from './index';
import React from 'react';
import {describe, test, beforeEach, vi, expect, afterEach} from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// window.innerWidth = 500;
//     fireEvent(window, new Event('resize'));
// chai.use(spies);
describe('Colorbox', () => {
  // beforeEach(async () => {
  //   cleanup(); // clear testing data after each test run
  // });

  // afterEach(async () => {
  //   cleanup(); // clear testing data after each test run
  // });
  // const user = userEvent.setup();
  test('swap button is present', async () => {
    const {getByText, getByTestId} = render(<Colorbox />);
    expect(getByTestId(/input-test/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, '#010101', {skipClick: true});
    expect(getByText('Show Opposite')).toBeInTheDocument();
  });

  test('swap button changes display to show contrast color in hex mode', async () => {
    const {findByText, getByText, getByTestId} = render(<Colorbox />);
    expect(getByTestId(/input-test/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, '#010101', {skipClick: true});
    const swapBtnElement = await findByText('Show Opposite');
    // expect(swapBtnElement).toBeInTheDocument();
    fireEvent.click(swapBtnElement);
    waitFor(() => {
      expect(findByText(/Opposite: #FEFEFE/i)).toBeInTheDocument();
    });
    // expect(getByText(/Opposite: #FEFEFE/i)).toBeInTheDocument();

  });

  test('swap button changes display to show contrast color in rgb mode', async () => {
    const {getByText, findByText, getByTestId} = render(<Colorbox />);
    expect(getByTestId(/actual-input/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, 'rgb(138, 43, 226)', {skipClick: true});
    const swapBtnElement = getByText('Show Opposite');
    expect(swapBtnElement).toBeInTheDocument();
    fireEvent.click(swapBtnElement);
    waitFor(() => {
      expect(findByText(/Opposite: #75D41D/i)).toBeInTheDocument();
    });
  });

  test('swap button changes display to show contrast color in colorname mode', async () => {
    const {getByText, findByText, getByTestId} = render(<Colorbox />);
    expect(getByTestId(/input-test/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, 'blueviolet', {skipClick: true});
    const swapBtnElement = getByText('Show Opposite');
    expect(swapBtnElement).toBeInTheDocument();
    fireEvent.click(swapBtnElement);
    waitFor(() => {
      expect(findByText(/Opposite: #75D41D/i)).toBeInTheDocument();
    });
  });

  test('swap button changes display to show contrast color in colorname mode', async () => {
    const {getByText, findByText, getByTestId} = render(<Colorbox />);
    expect(getByTestId(/actual-input/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/actual-input/i);
    // await user.type(inputElement, 'blue', {skipClick: true});
    fireEvent.change(inputElement, 'blue', {skipClick: true});
    const swapBtnElement = getByText('Show Opposite');
    waitFor(() => {
      expect(findByText(/Opposite: #FFFF00/i)).toBeInTheDocument();
    });
    expect(swapBtnElement).toBeInTheDocument();
    fireEvent.click(swapBtnElement);
    waitFor(() => {
      expect(findByText(/Opposite: blue/i)).toBeInTheDocument();
    });
  });

  test('clearing out text input removes contrast color', async () => {
    const {findByText, getByTestId} = render(<Colorbox />);
    // const colNameElement = screen.getAllByText(/Color Name/i);
    // await fireEvent.click(colNameElement[0]);
    // expect(getByTestId(/input-test/i)).toBeInTheDocument();
    const inputElement = getByTestId(/actual-input/i);
    fireEvent.change(inputElement, 'h');
    inputElement.setSelectionRange(0, 2);
    const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    await inputElement.dispatchEvent(event);
    // await userEvent.keyboard('{backspace}{backspace}');
    // const rgbElement = screen.getAllByText(/RGB/i);
    // await fireEvent.click(rgbElement[0]);

    waitFor(() => {
      expect(findByText(/Opposite:/i)).not.toBeInTheDocument();
    });
  });

  test('RGB button changes mode from colorname to RGB', async () => {
    const {findByText, getByTestId} = render(<Colorbox />);
    const colNameElement = screen.getAllByText(/Color Name/i);
    fireEvent.click(colNameElement[0]);
    expect(getByTestId(/input-test/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/input-test/i);
    fireEvent.change(inputElement, 'blueviolet', {skipClick: true});
    const rgbElement = screen.getAllByText(/RGB/i);
    fireEvent.click(rgbElement[0]);
    waitFor(() => {
      expect(findByText(/rgb(138, 43, 226)/i)).toBeInTheDocument();
    });
  });

  test('RGB button changes mode from hex to RGB', async () => {
    const {getByText, findByText, getByTestId} = render(<Colorbox />);
    const hexElement = screen.getAllByText(/Hex/i);
    fireEvent.click(hexElement[0]);
    expect(getByTestId(/actual-input/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, '#8A2BE2', {skipClick: true});
    const rgbElement = screen.getAllByText(/RGB/i);
    fireEvent.click(rgbElement[0]);
    waitFor(() => {
      expect(findByText(/rgb(138, 43, 226)/i)).toBeInTheDocument();
    });
  });

  test('RGB button changes mode from hex to RGB but errors when less than 7 characters', async () => {
    const {getByText, findByText, getByTestId} = render(<Colorbox />);
    const hexElement = screen.getByTestId(/hex-btn-test/i);
    fireEvent.click(hexElement);
    expect(getByTestId(/input-test/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, '#8A2BE', {skipClick: true});
    const rgbElement = screen.getAllByText(/RGB/i);
    fireEvent.click(rgbElement[0]);
    waitFor(() => {
      expect(screen.findByText(/Hex must have 6 characters/i)).toBeInTheDocument();
    });
  });

  test('Hex button changes mode from colorname to hex', async () => {
    const {getByText, findByText, getByTestId} = render(<Colorbox />);
    const colNameElement = screen.getAllByText(/Color Name/i);
    fireEvent.click(colNameElement[0]);
    expect(getByTestId(/actual-input/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, 'blueviolet', {skipClick: true});
    const hexElement = screen.getAllByText(/Hex/i);
    fireEvent.click(hexElement[0]);
    waitFor(() => {
      expect(findByText(/#8A2BE2/i)).toBeInTheDocument();
    });
  });
  test('Colorname button changes mode from hex to colorname', async () => {
    const {findByText, getByTestId} = render(<Colorbox />);
    expect(getByTestId(/input-test/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/actual-input/i);
    // await user.type(inputElement, '#8A2BE2', {skipClick: true});
    fireEvent.change(inputElement, '#8A2BE2', {skipClick: true});
    const colNameElement = screen.getAllByText(/Color Name/i);
    fireEvent.click(colNameElement[0]);
    waitFor(() => {
      expect(findByText(/blueviolet/i)).toBeInTheDocument();
    });
    // expect(screen.getByText(/blueviolet/i)).toBeInTheDocument();
  });

  
  test('Colorname button changes mode from rgb to colorname', async () => {
    const {getByText, findByText, getByTestId, findByTestId} = render(<Colorbox />);
    expect(getByTestId(/input-test/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/actual-input/i);
    // await user.type(inputElement, 'rgb(138, 43, 226)', {skipClick: true});
    fireEvent.change(inputElement, 'rgb(138, 43, 226)', {skipClick: true});
    const colNameElement = screen.getAllByText(/Color Name/i);
    fireEvent.click(colNameElement[0]);
    waitFor(() => {
      expect(screen.findByText(/blueviolet/i)).toBeInTheDocument();
    });
    // expect(screen.getByText(/blueviolet/i)).toBeInTheDocument();
  });

  test('Hex button changes mode from rgb to hex', async () => {
    const {getByText, findByText, getByTestId} = render(<Colorbox />);
    const rgbElement = screen.getAllByText(/RGB/i);
    fireEvent.click(rgbElement[0]);
    expect(getByTestId(/actual-input/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, 'rgb(138, 43, 226)');
    const hexElement = screen.getAllByText(/Hex/i);
    fireEvent.click(hexElement[0]);
    waitFor(() => {
      expect(findByText(/#8A2BE2/i)).toBeInTheDocument();
    });
    // expect(getByText(/#8A2BE2/i)).toBeInTheDocument();

  });

  test('Error displays if no available colorname', async () => {
    const {findByText, getByTestId} = render(<Colorbox />);
    const hexNameElement = getByTestId('hex-btn-test');
    fireEvent.click(hexNameElement);
    expect(getByTestId(/actual-input/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, '#8A2BE3');
    const colNameElement = screen.getAllByText(/Color Name/i);
    fireEvent.click(colNameElement[0]);
    waitFor(() => {
      expect(findByText(/No CSS color name for this code./i)).toBeInTheDocument();
    });
    // expect(screen.getByText(/No CSS color name for this code./i)).toBeInTheDocument();
  });

  test('Error displays if no available colorname', async () => {
    const {getByText, findByText, getByTestId} = render(<Colorbox />);
    expect(getByTestId(/input-test/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/actual-input/i);
    fireEvent.change(inputElement, 'rgb(0, 150, 75)');
    const colNameElement = screen.getAllByText(/Color Name/i);
    fireEvent.click(colNameElement[0]);
    waitFor(() => {
      expect(findByText(/No CSS color name for this code./i)).toBeInTheDocument();
    });
    // expect(screen.getByText(/No CSS color name for this code./i)).toBeInTheDocument();
  });

  test('Add to List button adds color to saved colors list', async () => {
    const {getByText, findByText, findByTestId, getByTestId} = render(<Colorbox />);
    const inputElement = getByTestId(/actual-input/i);
    fireEvent.change(inputElement, '#010101', {skipClick: true});
    const addToListBtn = getByText(/Add to List/i);
    expect(addToListBtn).toBeInTheDocument();
    fireEvent.click(addToListBtn);
    fireEvent.change(inputElement, 'yellow', {skipClick: true});
    fireEvent.click(addToListBtn);
    fireEvent.change(inputElement, 'rgb(12, 120, 12)', {skipClick: true});
    fireEvent.click(addToListBtn);
    waitFor(() => {
      expect(findByTestId(/saved-colorname-test/i)).toBeInTheDocument();
    });
    waitFor(() => {
      expect(findByTestId(/saved-color-item-test/i)).toBeInTheDocument();
    });
    waitFor(() => {
      expect(findByText(/Show Opposite/i)).toBeInTheDocument();
    });
  });

  test('Selecting a color from the dropdown sets mode to colorname and displays color', async () => {
    const {getByText, findByText, getByTestId, getByRole} = render(<Colorbox />);
    expect(getByRole('option', { name: 'Choose color...' }).selected).toBe(true);
    expect(screen.getAllByRole('option').length).toBe(142);
    fireEvent.change(getByTestId('select'), { target: { value: 'chocolate' } });
    let options = screen.getAllByTestId('select-option');
    expect(options[0].selected).toBeFalsy();
    expect(options[15].selected).toBeTruthy();
    expect(options[20].selected).toBeFalsy();
    waitFor(() => {
      expect(findByText(/Opposite: #2D96E1/i)).toBeInTheDocument();
    });
  });

  test('Removing item from saved list removes color from saved colors list', async () => {
    const {getByText, findByText, getByTestId, findByTestId} = render(<Colorbox />);
    const inputElement = getByTestId(/actual-input/i);
    fireEvent.change(inputElement, '#010101', {skipClick: true});
    const addToListBtn = getByText(/Add to List/i);
    expect(addToListBtn).toBeInTheDocument();
    fireEvent.click(addToListBtn);
    waitFor (() => {
      expect(findByTestId(/saved-colorname-test/i)).toBeInTheDocument();
      // expect(getByText('Show Opposite')).toBeInTheDocument();
    });
    const savedItemElement = getByTestId(/saved-color-item-test/i);
    fireEvent.dblClick(savedItemElement);
    waitFor(() => {
      expect(findByTestId(/saved-color-item-test/i)).not.toBeInTheDocument();
    });
  });

  test('Clicking on a saved color populates display with that color', async () => {
    const {getByText, findByText, getByTestId, findByTestId} = render(<Colorbox />);
    const inputElement = getByTestId(/actual-input/i);
    fireEvent.change(inputElement, 'cadetblue', {skipClick: true});
    const addToListBtn = getByText(/Add to List/i);
    expect(addToListBtn).toBeInTheDocument();
    fireEvent.click(addToListBtn);
    waitFor (() => {
      expect(findByTestId(/saved-colorname-test/i)).toBeInTheDocument();
      // expect(getByText('Show Opposite')).toBeInTheDocument();
    });
    fireEvent.change(inputElement, '#010101', {skipClick: true});
    fireEvent.click(addToListBtn);
    const savedItemElement = screen.getAllByTestId(/saved-color-item-test/i);
    fireEvent.click(savedItemElement[1]);
    waitFor(() => {
      expect(findByText(/Opposite: #A0615F/i)).toBeInTheDocument();
    });
  });

  test('Clicking on a saved non-color populates display with no color', async () => {
    const {getByText, findByText, getByTestId, findByTestId} = render(<Colorbox />);
    const inputElement = getByTestId(/actual-input/i);
    fireEvent.change(inputElement, '', {skipClick: true});
    const addToListBtn = getByText(/Add to List/i);
    expect(addToListBtn).toBeInTheDocument();
    fireEvent.click(addToListBtn);
    waitFor (() => {
      expect(findByTestId(/saved-colorname-test/i)).toBeInTheDocument();
      // expect(getByText('Show Opposite')).toBeInTheDocument();
    });
    const savedItemElement = screen.getByTestId(/saved-color-item-test/i);
    fireEvent.click(savedItemElement);
    waitFor(() => {
      expect(findByText(/Opposite:/i)).toBeInTheDocument();
    });
  });

  test('Option for hiding instructions appears in mobile widths', async () => {
    window.innerWidth = 500;
    fireEvent(window, new Event('resize'));
    const {findByText, getByTestId} = render(<Colorbox />);
    const infoCircleElement = getByTestId(/info-circle-test/i);
    expect(infoCircleElement).toBeInTheDocument();
    fireEvent.click(infoCircleElement);
    waitFor(() => {
      expect(findByText(/Display the color associated with the hex code, rgb value, or CSS color name typed into the input, or select a color name from the dropdown./i)).toBeInTheDocument();
    });
    fireEvent.click(infoCircleElement);
    waitFor(() => {
      expect(findByText(/Display the color associated with the hex code, rgb value, or CSS color name typed into the input, or select a color name from the dropdown./i)).not.toBeInTheDocument();
    });
  });

  test('Suggested colors appear in display box when clicked', async () => {
  // window.innerWidth = 1200;
  // fireEvent(window, new Event('resize'));
    const {findByText, getByTestId} = render(<Colorbox />);
    const infoCircleElement = getByTestId(/info-circle-test/i);
    expect(infoCircleElement).toBeInTheDocument();
    fireEvent.click(infoCircleElement);
    const salmonSuggestion = getByTestId(/salmon-test/i);
    expect(salmonSuggestion).toBeInTheDocument();
    fireEvent.click(salmonSuggestion);
    // waitFor (() => {
    //   expect(findByText('Opposite: #057F8D')).toBeInTheDocument();
    // });
    expect(screen.getByText('Opposite: #057F8D')).toBeInTheDocument();
  });

  test('Clicking on colorname mode changes input to display colorname', async () => {
    // const spyConvertToColorName = vi.spyOn(Colorbox, 'convertToColorName');
    const {getByText, findByText, getByTestId, getAllByText} = render(<Colorbox />);
    const inputElement = getByTestId(/actual-input/i);
    fireEvent.change(inputElement, '#8a2be2', {skipClick: true});
    const colorNameModeBtn = getAllByText(/Color Name/i);
    expect(colorNameModeBtn[1]).toBeInTheDocument();
    fireEvent.click(colorNameModeBtn[1]);
    waitFor (() => {
      expect(findByText('blueviolet')).toBeInTheDocument();
    });
    // expect(spyConvertToColorName).toHaveBeenCalled();
    // spyConvertToColorName.mockRestore(); // Restore the original function
  });


});