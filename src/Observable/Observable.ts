class Observable {
  static instance: Observable | null = null;
  private observers: Record<string, Function[]> = {};

  constructor() {
    if (Observable.instance != null) {
      return Observable.instance;
    }

    Observable.instance = this;
    return Observable.instance;
  }

  private unsubscribe(subject: string, action: Function) {
    if (this.observers[subject]) {
      this.observers[subject] = this.observers[subject].filter(
        (subscriber) => subscriber !== action
      );
    }

    if (this.observers[subject].length === 0) {
      delete this.observers[subject];
    }
  }

  subscribe(subject: string, action: Function): Function {
    if (!this.observers[subject]) {
      this.observers[subject] = [];
    }
    this.observers[subject] = [...this.observers[subject], action];

    return () => this.unsubscribe(subject, action);
  }

  notify(subject: string, data?: any) {
    if (this.observers[subject]) {
      this.observers[subject].forEach((observer) =>
        data ? observer(data) : observer()
      );
    }
  }
}

export default Observable;
