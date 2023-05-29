
declare module "JQueryModule" {
  type cssSelector = {
    css: (key: string, value: string) => cssSelector
  }
  function $(ready: () => void): void
  function $(selector: any): cssSelector
  namespace $ {
    function ajax(url: string, settings?: any): void
    function get(url: string, settings?: any): void
    function post(url: string, settings?: any): void
  }
  //export default $
  export =$
}
