// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// react-calendar v6 is ESM-only; mock it for CRA/Jest compatibility.
jest.mock('react-calendar', () => () => null);
