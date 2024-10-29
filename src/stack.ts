export class Stack<T> {
    private elements: T[] = [];
  
    push(element: T) {
      this.elements.push(element);
    }
  
    pop(): T | undefined {
      return this.elements.pop();
    }
  
    peek(): T | undefined {
      return this.elements[this.elements.length - 1];
    }
  
    isEmpty(): boolean {
      return this.elements.length === 0;
    }
  
    getElements(): T[] {
      return this.elements;
    }
  }