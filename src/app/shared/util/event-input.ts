export function eventInput(element: HTMLInputElement, value: any): void{
    const event = new Event('input', {bubbles: true});
    element.value = value;
    element.dispatchEvent(event);
}

export function eventChange(element: HTMLSelectElement, value: any): void{
    const event = new Event('change', {bubbles: true});
    element.value = value;
    element.dispatchEvent(event);
}
