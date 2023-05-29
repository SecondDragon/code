declare function add(previous: string | number, current: string | number): void;
interface Car {
    brand: string;
    No: number;
    price: number;
    placeOrigin: string;
    load(): void;
}
interface Plane {
    category: string;
    price: number;
    placeOrigin: string;
    airline: string;
    load(): void;
}
declare function carry(vechile: Car | Plane): void;
