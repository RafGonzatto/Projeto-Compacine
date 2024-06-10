function simpleAdd(x: number, y: number): number {
  return x + y
}

function simpleSubtract(x: number, y: number): number {
  return x - y
}

function simpleMultiply(x: number, y: number): number {
  return x * y
}

function simpleDivide(x: number, y: number): number {
  if (y === 0) {
    throw new Error('Cannot divide by zero')
  }
  return x / y
}

async function simpleDivideAsync(x: number, y: number): Promise<number> {
  if (y === 0) {
    throw new Error('Cannot divide by zero')
  }
  return x / y
}

// Tests
describe('Simple Math Functions', () => {
  it('should be able to add two numbers', () => {
    expect(simpleAdd(2, 3)).toBe(5)
  })

  it('should be able to subtract two numbers', () => {
    expect(simpleSubtract(5, 3)).toBe(2)
  })

  it('should be able to multiply two numbers', () => {
    expect(simpleMultiply(2, 3)).toBe(6)
  })

  it('should be able to divide two numbers', () => {
    expect(simpleDivide(6, 3)).toBe(2)
  })

  it('should throw an error when dividing by zero', () => {
    expect(() => simpleDivide(6, 0)).toThrow('Cannot divide by zero')
  })

  it('should resolve when dividing two numbers asynchronously', async () => {
    await expect(simpleDivideAsync(6, 3)).resolves.toBe(2)
  })

  it('should reject when dividing by zero asynchronously', async () => {
    await expect(simpleDivideAsync(6, 0)).rejects.toThrow(
      'Cannot divide by zero',
    )
  })
})
