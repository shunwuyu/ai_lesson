function Log(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
  
    descriptor.value = function (...args: any[]) {
      console.log(`[Log] Calling ${propertyKey} with args:`, args);
      const result = originalMethod.apply(this, args);
      console.log(`[Log] ${propertyKey} returned:`, result);
      return result;
    };
  
    return descriptor;
  }

  
class UserService {
    @Log
    getUser(id: number) {
      return { id, name: "Alice" };
    }
  }
  