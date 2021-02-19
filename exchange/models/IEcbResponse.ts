
export default interface IEcbResponse {
  base: string,
  date: Date
  rates: Map<string, number>
}