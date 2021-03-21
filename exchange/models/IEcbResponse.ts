
export default interface IEcbResponse {
  base: string,
  date: Date
  rates: {
    [curr: string]: number
  }
}