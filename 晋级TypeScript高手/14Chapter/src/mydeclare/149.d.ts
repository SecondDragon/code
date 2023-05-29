

declare namespace JQuery {
  type cssSelector = {
    css: (key: string, value: string) => cssSelector
  }
  export function $(ready: () => void): void
  export function $(selector: any): cssSelector
  export namespace $ {
    function ajax(url: string, settings?: any): void
    function get(url: string, settings?: any): void
    function post(url: string, settings?: any): void
  }
}