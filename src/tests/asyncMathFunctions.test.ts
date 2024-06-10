// Hooked Math functions
function add(x: number, y: number): number {
  return x + y
}

function subtract(x: number, y: number): number {
  return x - y
}

function multiply(x: number, y: number): number {
  return x * y
}

function divide(x: number, y: number): number {
  if (y === 0) {
    throw new Error('Cannot divide by zero')
  }
  return x / y
}

async function hookedDivideAsync(x: number, y: number): Promise<number> {
  if (y === 0) {
    throw new Error('Cannot divide by zero')
  }
  return x / y
}

// Tests
describe('Hooked Math Functions', () => {
  let a: number
  let b: number

  beforeAll(() => {
    // console.log('Starting all tests')
  })

  afterAll(() => {
    // console.log('Finished all tests')
  })

  beforeEach(() => {
    a = 6
    b = 3
  })

  afterEach(() => {
    // Can be used for cleanup
  })

  it('should be able to add two numbers', () => {
    expect(add(a, b)).toBe(9)
  })

  it('should be able to subtract two numbers', () => {
    expect(subtract(a, b)).toBe(3)
  })

  it('should be able to multiply two numbers', () => {
    expect(multiply(a, b)).toBe(18)
  })

  it('should be able to divide two numbers', () => {
    expect(divide(a, b)).toBe(2)
  })

  it('should throw an error when dividing by zero', () => {
    expect(() => divide(a, 0)).toThrow('Cannot divide by zero')
  })

  it('should resolve when dividing two numbers asynchronously', async () => {
    await expect(hookedDivideAsync(a, b)).resolves.toBe(2)
  })

  it('should reject when dividing by zero asynchronously', async () => {
    await expect(hookedDivideAsync(a, 0)).rejects.toThrow(
      'Cannot divide by zero',
    )
  })
})
