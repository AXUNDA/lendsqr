
const functions = require ("./functions.js")

test("adds two plus two to equal 4",()=>{
      expect(functions.add(2,2)).toBe(4)
})
test("adds two plus two to not equal 5",()=>{
      expect(functions.add(2,2)).not.toBe(5)
})
test("should be null ",()=>{
      expect(functions.isNull()).toBeNull()
})

test("should be falsy",()=>{
      expect(functions.checkValue(null)).toBeFalsy()
})
test("expect user to be brad traversy object ",()=>{
      expect(functions.createUser()).toStrictEqual({firstName:"Brad",lastName:"Traversy"})
})

test("should be under 600",()=>{
      const load1 = 800
      const load2 = 600
      expect(load1+load2).toBeLessThan(1600)
})