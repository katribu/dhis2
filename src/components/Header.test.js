import { render } from "@testing-library/react"
import "@testing-library/jest-dom";
// import "@testing-library/jest-dom/extend-expect";
import Header from './Header.jsx'

test("Renders the header", () => {
    render(<Header />)
    expect(true).toBeTruthy()
})

test('demo', () => {
    expect(true).toBe(true)
  })